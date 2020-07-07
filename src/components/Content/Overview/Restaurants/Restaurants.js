import React from 'react';
import './Restaurants.css';
const Restaurants = props => 
    <>
        <button onClick={() => props.handler("RESTAURANT")}>Return</button>
        <div>
            Hi!
        </div>
    </>
export default Restaurants;