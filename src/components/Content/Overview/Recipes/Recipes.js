import React, {useState} from 'react';
import axios from 'axios';
import './Recipes.css';
import Dropdown from './Dropdown/Dropdown';
import List from './List/List';
import { CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
require('dotenv').config()
const Recipes = props => {
    let meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    let diets = ['Balanced','High-Protein','Low-Fat','Low-Carb'];
    let restrictions = ['Alcohol-free','Peanut-free','Sugar-conscious','Tree-Nut-free','Vegan','Vegetarian'];
    const [q, setQ] = useState('.');
    const [maxIngred, setMaxIngred] = useState(0);
    const [calories, setCalories] = useState([0, 0]);
    const [cookTime, setCookTime] = useState([0, 0]);
    const [mealSelected, setMealSelected] = useState('');
    const [dietSelected, setDietSelected] = useState('');
    const [restrictSelected, setRestrictSelected] = useState([]);
    const [showDrop, setShowDrop] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showOrder, setShowOrder] = useState(true);
    const [inputError, setInputError] = useState(false);
    const [URL, setURL] = useState('');
    
    const changeChoiceSelected = (type, choice) => {
        switch(type) {
            case 'meal':
                if (choice === mealSelected) {
                    setMealSelected('');
                } else {
                    setMealSelected(choice);
                }
                break;
            case 'diet':
                if (choice === dietSelected) {
                    setDietSelected('');
                } else {
                    setDietSelected(choice);
                }
                break;
            case 'restriction':
                if(restrictSelected.includes(choice)){
                    const newRestrictions = restrictSelected.filter(restrict => restrict !== choice);
                    setRestrictSelected(newRestrictions);
                } else{
                    setRestrictSelected([...restrictSelected, choice]);
                }
                break;
            default:
                throw ReferenceError;
        };
    };
    const changeShowDrop = type => {
        if(type === showDrop){
            setShowDrop('');
        } else{
            setShowDrop(type);
        }
    };
    const orderReducer = (state, action) => {
        switch (action.type) {
          case 'ORDER_FETCH_INIT':
            return {
              ...state,
              isLoading: true,
              isError: false,
            };
          case 'ORDER_FETCH_SUCCESS':
            return {
              ...state,
              isLoading: false,
              isError: false,
              data: action.payload,
            };
          case 'ORDER_FETCH_FAILURE':
            return {
              ...state,
              isLoading: false,
              isError: true,
            };
          default:
            throw new Error();
        }
    };
    const [order, dispatchOrder] = React.useReducer(
        orderReducer,
        { data: [], isLoading: false, isError: false }
    );
    const handleFetchRecipes = React.useCallback(async () => {
        dispatchOrder({type:"ORDER_FETCH_INIT"});
        try {
            const result = await axios.get(URL);
            dispatchOrder({
                type: "ORDER_FETCH_SUCCESS",
                payload: result.data.hits
            })
        } catch {
            dispatchOrder({type: 'ORDER_FETCH_FAILURE'})
        }
    }, [URL])
    const handleOrderSubmit = () => {
        if (q === '') {
            throw new Error("Query is required");
        }
        setShowModal(false);
        setTimeout(() => setShowOrder(false),300);
        setTimeout(() => setShowResult(true),600);
        let url = buildURL();
        // setURL(url)
    };
    const returnSearch = () => {
        setTimeout(() => setShowResult(false),0);
        setTimeout(() => setShowOrder(true),300);
    };
    const buildURL = () => {
        let url = "https://api.edamam.com/search?";
        url += "q=" + q + "&app_id=" + process.env.REACT_APP_ID + "&app_key=" + process.env.REACT_APP_KEY;
        if (maxIngred > 0) {
            url += "&ingr=" + maxIngred.toString();
        }
        if(dietSelected !== ""){
            url += "&diet=" + dietSelected.toLowerCase();
        }
        if(restrictSelected.length !== 0) {
            restrictSelected.forEach(e => url += "&health=" + e.toLowerCase());
        }
        if(calories[0] > 0 || calories[1] > 0) {
            url += "&calories=";
            if(calories[0] > 0 && calories[1] > 0){
                url += calories[0].toString() + "-" + calories[1].toString();
            } else if(calories[0] > 0){
                url += calories[0].toString() + "+";
            } else {
                url += calories[1].toString()
            }
        }
        if(cookTime[0] > 0 || cookTime[1] > 0) {
            url += "&time=";
            if(cookTime[0] > 0 && cookTime[1] > 0){
                url += cookTime[0].toString() + "-" + cookTime[1].toString();
            } else if(cookTime[0] > 0){
                url += cookTime[0].toString() + "+";
            } else {
                url += cookTime[1].toString()
            }
        }
        return url;
    };
    const checkValidOrder = () => {
        if(q === "" || q === "."){
            setInputError(true);
        } else{
            setShowModal(true);
        }
    };
    const checkInput = event => {
        setQ(event.target.value);
    };
    React.useEffect(() => {
        handleFetchRecipes();
    }, [handleFetchRecipes]);
    React.useEffect(() => {
        if(q === ""){
            setInputError(true);
        } else {
            setInputError(false);
        }  
    }, [q]);
    return (
        <>
            <CSSTransition
            in={showOrder}
            timeout={300}
            classNames="landing-mode"
            unmountOnExit>
                <div className='Recipes'>
                    <span className='Option'>Choose your Recipe</span>
                    <button className="Button" onClick={() => props.handler("RECIPE")}>Return</button>
                    <div className="Search">
                        <label htmlFor='Search'>Search Term (REQUIRED):</label>
                        <input type='text' name='Search' className={inputError ? 'Searchbar Invalid': 'Searchbar'} onChange={event=>checkInput(event)}/>
                    </div>
                    <div className="Search">
                        <div className='Input-Section'>
                            Max Ingredients:
                            <input type='number' name='Max-Ingred' className='Small-Search' min='1' onChange={event=>setMaxIngred(event.target.value)}/>
                        </div>
                        <div className='Input-Section-Right'>
                            Calories: <strong>Min</strong>
                            <input type='number' name='Calories-min' className='Small-Search' min='0' onChange={event=>setCalories([event.target.value, calories[1]])}/>
                            <strong>Max</strong>
                            <input type='number' name='Calories-max' className='Small-Search' min='0' onChange={event=>setCalories([calories[0], event.target.value])}/>
                        </div>
                    </div>
                    <div className="Search">
                        <div className='Input-Full'>
                            Prep + Cook Time (minutes): 
                            <div className='Input-Header'>
                                <strong>Min</strong>
                                <input type='number' name='Time-min' className='Small-Search' min='0' onChange={event=>setCookTime([event.target.value, cookTime[1]])}/>
                                <strong>Max</strong>
                                <input type='number' name='Time-max' className='Small-Search' min='1' onChange={event=>setCookTime([cookTime[0], event.target.value])}/>
                            </div>
                        </div>
                    </div>
                    <Dropdown showDrop={showDrop==='meal' ? true:false} type={'meal'} choiceSelected={mealSelected==='' ? 'Meal Type':mealSelected} 
                    choices={meals} changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop}/>
                    <Dropdown showDrop={showDrop==='diet' ? true:false} type={'diet'} choiceSelected={dietSelected==='' ? 'Diet Type':dietSelected} 
                    choices={diets} changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop}/>
                    <Dropdown showDrop={showDrop==='restriction' ? true:false} type={'restriction'} choiceSelected={'Health Restrictions'} choices={restrictions}
                    choiceList={restrictSelected} changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop} />
                    <button className='Button' onClick={checkValidOrder}>
                        <div className="ButtonHeader">
                            <div className="ButtonIcon">Place Order</div><FontAwesomeIcon icon={faSearch}/>
                        </div>
                    </button>
                    <CSSTransition
                    in={showModal}
                    timeout={450}
                    classNames="modal"
                    unmountOnExit>
                        <div className='Modal'>
                            <div className='Modal-Title'>Confirm?</div>
                            <button className='Yes' onClick={handleOrderSubmit}>Yes</button>
                            <button className='No' onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </CSSTransition>
                    <CSSTransition
                    in={showModal}
                    timeout={450}
                    classNames="backdrop"
                    unmountOnExit>
                        <div className='Backdrop' onClick={() => setShowModal(false)}/>
                    </CSSTransition>
                </div>
            </CSSTransition>
            <CSSTransition
            in={showResult}
            timeout={300}
            classNames="mode"
            unmountOnExit>
                <div>
                    {order.isError && 'Error loading recipe'}
                    {order.isLoading ? 
                    <div>Loading</div>
                    :
                    <List hits={order.data} returnSearch={returnSearch}/>
                    }
                </div>
            </CSSTransition>
        </>
    );
}
export default Recipes;
