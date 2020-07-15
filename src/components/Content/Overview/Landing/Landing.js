import React from 'react';
import './Landing.css';
const Landing = props => 
    <div className="Landing">
        <span className="Option">Welcome!</span>
        <span className="Option">Choose option</span>
        <button className="Button" onClick={() => props.handler("RESTAURANT")}>Restaurants</button>
        <button className="Button" onClick={() => props.handler("RECIPE")}>Recipes</button>
    </div>
export default Landing;