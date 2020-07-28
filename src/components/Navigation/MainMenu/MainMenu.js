import React from 'react';
import './MainMenu.css'
import {
    BrowserRouter as Router,
    NavLink
} from 'react-router-dom';
import Link from './Link/Link'
const MainMenu = () => 
    <>
        <div className="MainMenu">
            <span className="Title">Food Roulette</span>
            <NavLink style={{textDecoration: 'none'}} exact to='/' activeClassName='Nav-Select'><Link name="Home"/></NavLink>
            <NavLink style={{textDecoration: 'none'}} to='/about' activeClassName='Nav-Select'><Link name="About"/></NavLink>
        </div>
    </>
export default MainMenu;