import React from 'react';
import './Recipes.css';
const Recipes = props => 
    <>
        <button onClick={() => props.handler("RECIPE")}>Return</button>
        <div>
            Hi!
        </div>
    </>
export default Recipes;
