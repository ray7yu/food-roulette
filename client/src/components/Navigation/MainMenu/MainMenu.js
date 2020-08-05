import React from 'react';
import './MainMenu.css'
import {
    NavLink
} from 'react-router-dom';
import Link from './Link/Link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUtensils} from "@fortawesome/free-solid-svg-icons";
const MainMenu = () => 
    <>
        <div className="MainMenu">
            <FontAwesomeIcon icon={faUtensils} className="FoodIcon"/>
            <span className="Title">Food Roulette</span>
            <NavLink style={{textDecoration: 'none'}} exact to='/' activeClassName='Nav-Select'>
                <Link name="Home"/>
            </NavLink>
            <NavLink style={{textDecoration: 'none'}} to='/about' activeClassName='Nav-Select'><Link name="About"/></NavLink>
        </div>
    </>
export default MainMenu;