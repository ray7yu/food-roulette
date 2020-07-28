import React, {useState} from 'react';
import './Recipes.css';
import Dropdown from './Dropdown/Dropdown';
import { CSSTransition} from 'react-transition-group';
require('dotenv').config()
const Recipes = props => {
    let meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    let diets = ['Balanced','High-Protein','High-Fiber','Low-Fat','Low-Carb','Low-Sodium']
    let restrictions = ['Alcohol-free','Immune-Supportive','Celery-free','Crustacean-free','Dairy-free','Egg-free','Fish-free','FODMAP-free',
                        'Gluten-free','Keto-Friendly','Kidney-Friendly','Kosher','No-oil','No-sugar','Paleo','Peanut-free','Pescatarian',
                        'Pork-free','Red Meat-free','Sesame-free','Shellfish-free','Soy-free','Low sugar','Tree Nut-free','Vegan','Vegetarian']
    const [q, setQ] = useState('')
    const [maxIngred, setMaxIngred] = useState(0)
    const [calories, setCalories] = useState([0, 0])
    const [cookTime, setCookTime] = useState([0, 0])
    const [mealSelected, setMealSelected] = useState('')
    const [dietSelected, setDietSelected] = useState('')
    const [restrictSelected, setRestrictSelected] = useState([])

    const [showDrop, setShowDrop] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [showOrder, setShowOrder] = useState(true)
    
    
    const changeChoiceSelected = (type, choice) => {
        switch(type) {
            case 'meal':
                setMealSelected(choice)
                break;
            case 'diet':
                setDietSelected(choice)
                break;
            case 'restriction':
                if(restrictSelected.includes(choice)){
                    const newRestrictions = restrictSelected.filter(restrict => restrict !== choice);
                    setRestrictSelected(newRestrictions)
                } else{
                    if (restrictSelected.length < 8) {
                        setRestrictSelected([...restrictSelected, choice])
                    }
                }
                break;
            default:
                throw ReferenceError
        };
    }
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
    const handleOrderSubmit = () => {
        if (q === '') {
            throw new Error("Query is required")
        }
        setShowModal(false);
        setTimeout(() => setShowOrder(false),300);
        setTimeout(() => setShowResult(true),600);
        // let url = buildURL();
      };
    const buildURL = () => {;
        let url = "https://api.edamam.com/search?"
        url += "q=" + q + "&app_id=" + process.env.APP_ID + "&app_key=" + process.env.APP_KEY;
        if (maxIngred > 0) {
            url += "&ingr=" + maxIngred.toString();
        }
        if(dietSelected !== ""){
            url += "&diet=" + dietSelected.toLowerCase();
        }
        if(restrictSelected.length !== 0) {
            restrictSelected.forEach(e => url += "&health=" + e);
        }
        
        url += "";
        // let url = "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
        return url;
    }
    const changeShowDrop = type => {
        if(type === showDrop){
            setShowDrop('')
        } else{
            setShowDrop(type)
        }
    }
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
                        <label htmlFor='Search'>Search Term:</label>
                        <input type='text' name='Search' className='Searchbar' onChange={event=>setQ(event.target.value)}/>
                    </div>
                    <div className="Search">
                        <div className='Input-Section'>
                            Max Ingredients:
                            <input type='number' name='Max-Ingred' className='Small-Search' min='1' onChange={event=>setMaxIngred(event.target.value)}/>
                        </div>
                        <div className='Input-Section'>
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
                    <div>
                        <button className='Button' onClick={() => setShowModal(!showModal)}>Place Order</button>
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
                    <div>
                        Loading
                    </div>
                    :
                    <div>
                        Hi
                    </div>
                    }
                </div>
            </CSSTransition>
        </>
    );
}
export default Recipes;
