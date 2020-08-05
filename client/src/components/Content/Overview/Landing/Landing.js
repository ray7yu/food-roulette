import React from 'react';
import './Landing.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHamburger, faCompass} from "@fortawesome/free-solid-svg-icons";
const Landing = props => 
    <div className="Landing">
        <span className="Option">Welcome!</span>
        {/* <button className="Button" onClick={() => props.handler("RESTAURANT")}>
            <div className="ButtonHeader">
                <div className="ButtonIcon">Restaurants</div><FontAwesomeIcon icon={faCompass}/>
            </div>
        </button> */}
        <button className="Button" onClick={() => props.handler("RECIPE")}>
            <div className="ButtonHeader">
                <div className="ButtonIcon">Recipes</div><FontAwesomeIcon icon={faHamburger}/>
            </div>
        </button>
    </div>
export default Landing;