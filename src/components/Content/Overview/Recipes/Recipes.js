import React, {useState} from 'react';
import './Recipes.css';
import Dropdown from './Dropdown/Dropdown';
const Recipes = props => {
    let meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    let diets = ['Balanced','High-Protein','High-Fiber','Low-Fat','Low-Carb','Low-Sodium']
    let dishes = ['Alcohol-cocktail','Biscuits and cookies','Bread','Cereals','Condiments and Sauces','Drinks','Desserts','Egg','Main Course','Omelet','Pancake',
                'Preps','Preserve','Salad','Sandwiches','Soup','Starter']
    let cuisines = ['American','Asian','British','Caribbean','Central Europe','Chinese', 'Eastern Europe', 
    'French','Indian','Italian','Japanese','Kosher','Mediterranean','Mexican','Middle Eastern','Nordic','South American','South East Asian']
    let restrictions = ['Alcohol-free','Immune-Supportive','Celery-free','Crustacean-free','Dairy-free','Egg-free','Fish-free','FODMAP-free',
                        'Gluten-free','Keto-Friendly','Kidney-Friendly','Kosher','No-oil','No-sugar','Paleo','Peanut-free','Pescatarian',
                        'Pork-free','Red Meat-free','Sesame-free','Shellfish-free','Soy-free','Low sugar','Tree Nut-free','Vegan','Vegetarian']

    const [mealSelected, setMealSelected] = useState('')
    const [dietSelected, setDietSelected] = useState('')
    const [dishSelected, setDishSelected] = useState('')
    const [cuisineSelected, setCuisineSelected] = useState('')
    const [restrictSelected, setRestrictSelected] = useState([])
    const [showDrop, setShowDrop] = useState('')

    const changeChoiceSelected = (type, choice) => {
        switch(type) {
            case 'meal':
                setMealSelected(choice)
                break;
            case 'diet':
                setDietSelected(choice)
                break;
            case 'dish':
                setDishSelected(choice)
                break;
            case 'cuisine':
                setCuisineSelected(choice)
                break;
            case 'restriction':
                if(restrictSelected.includes(choice)){
                    const newRestrictions = restrictSelected.filter(restrict => restrict !== choice);
                    setRestrictSelected(newRestrictions)
                } else{
                    setRestrictSelected([...restrictSelected, choice])
                }
                break;
            default:
                throw ReferenceError
        };
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
            <div className='Recipes'>
                <span className='Option'>Choose your Recipe</span>
                <button className="Button" onClick={() => props.handler("RECIPE")}>Return</button>
                <Dropdown showDrop={showDrop==='meal' ? true:false} type={'meal'} choiceSelected={mealSelected==='' ? 'Meal Type':mealSelected} 
                choices={meals} changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop}/>
                <Dropdown showDrop={showDrop==='diet' ? true:false} type={'diet'} choiceSelected={dietSelected==='' ? 'Diet Type':dietSelected} 
                choices={diets} changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop}/>
                <Dropdown showDrop={showDrop==='dish' ? true:false} type={'dish'} choiceSelected={dishSelected==='' ? 'Dish Type':dishSelected} 
                choices={dishes} changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop}/>
                <Dropdown showDrop={showDrop==='cuisine' ? true:false} type={'cuisine'} choiceSelected={cuisineSelected==='' ? 'Cuisine Type':cuisineSelected} 
                choices={cuisines} changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop}/>
                <Dropdown showDrop={showDrop==='restriction' ? true:false} type={'restriction'} choiceSelected={'Health Restrictions'} choices={restrictions}
                changeChoiceSelected={changeChoiceSelected} changeShowDrop={changeShowDrop} />
            </div>
        </>
    );
}
export default Recipes;
