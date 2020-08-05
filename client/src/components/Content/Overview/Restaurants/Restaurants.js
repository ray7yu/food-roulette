import React from 'react';
import './Restaurants.css';
const Restaurants = props => 
    <>
        <div className="Restaurants">
            <button className="Button" onClick={() => props.handler("RESTAURANT")}>Return</button>
            <div>
                
            </div>
        </div>
    </>
export default Restaurants;