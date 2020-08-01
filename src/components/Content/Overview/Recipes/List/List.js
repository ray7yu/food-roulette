import React from 'react';
import './List.css'
const List = props => {
    const [currRecipe, setCurrRecipe] = React.useState('');
    const fakeData = [
        {
            "recipe": {
                "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_ac4e7b27f7e79efe48adf71f9cd709fa",
                "label": "Homemade Pico de Gallo",
                "image": "https://www.edamam.com/web-img/c39/c3948ba1d81006bed3ac5b6088edf44f.jpg",
                "source": "Honest Cooking",
                "url": "http://honestcooking.com/homemade-pico-de-gallo-recipe/",
                "shareAs": "http://www.edamam.com/recipe/homemade-pico-de-gallo-ac4e7b27f7e79efe48adf71f9cd709fa/chicken/23-ing/low-sugar/peanut-free/alcohol-free/tree-nut-free/vegetarian/vegan/low-fat/23-123-cal",
                "yield": 4.0,
                "dietLabels": [
                    "Low-Fat"
                ],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Vegan",
                    "Vegetarian",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Alcohol-Free",
                    "Immuno-Supportive"
                ],
                "cautions": [
                    "FODMAP"
                ],
                "ingredientLines": [
                    "1 bunch cilantro",
                    "1 white onion",
                    "1 clove garlic",
                    "1 jalapeno (if you don’t like things spicy, take this down to ½ a jalapeno)",
                    "½ pound fresh tomatoes",
                    "Salt/pepper to taste"
                ]
            }
        },
        {
            "recipe": {
                "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_419020374ef5fe3a56d2808c3564f944",
                "label": "Citrusy Radishes and Cilantro",
                "image": "https://www.edamam.com/web-img/8f1/8f18f308a9141de6fa7288f6ba86d294.jpg",
                "source": "Good Housekeeping",
                "url": "http://www.goodhousekeeping.com/food-recipes/a15134/citrusy-radishes-cilantro-recipe-wdy0513/",
                "shareAs": "http://www.edamam.com/recipe/citrusy-radishes-and-cilantro-419020374ef5fe3a56d2808c3564f944/chicken/23-ing/low-sugar/peanut-free/alcohol-free/tree-nut-free/vegetarian/vegan/low-fat/23-123-cal",
                "yield": 2.0,
                "dietLabels": [
                    "Low-Fat"
                ],
                "healthLabels": [
                    "Sugar-Conscious",
                    "Vegan",
                    "Vegetarian",
                    "Peanut-Free",
                    "Tree-Nut-Free",
                    "Alcohol-Free",
                    "Immuno-Supportive"
                ],
                "cautions": [
                    "Sulfites"
                ],
                "ingredientLines": [
                    "1 tbsp. orange juice",
                    "1 tbsp. lemon juice",
                    "¼ tsp. ground cumin",
                    "Kosher salt and pepper",
                    "6 radishes",
                    "¼ small sweet onion or white",
                    "¼ c. fresh cilantro"
                ]
            }
        }
    ];
    const selectResult = uri => {
        const recipe = fakeData.find(x => x.recipe.uri === uri)
        setCurrRecipe(recipe)
    };
    return(
        <>
            {
            (currRecipe !== "") ? 
            <div className="Dish">
                <span className='Option'>Recipe Description</span>
                <div className="Entry" onClick={() => setCurrRecipe("")}>Return To List</div>
                <img src={currRecipe.recipe.image} alt="Recipe" className="DishImage"/>
                <div>Labels {currRecipe.recipe.dietLabels}</div>
                <div>Description {currRecipe.recipe.ingredientLines.join(', ')}</div>
                <div>Links {currRecipe.recipe.url}</div>
            </div>
            :
            <div className="List">
                <span className='Option'>Search Results</span>
                {fakeData.map(entry => {
                    return(
                        <div className="Entry" key={entry.recipe.uri} onClick={() => selectResult(entry.recipe.uri)}>
                            {entry.recipe.label}
                        </div>
                    );
                })}
            </div>
            }
        </>
    );
}
export default List;