import React from 'react';
import './MainMenu.css'
import Link from './Link/Link'
const MainMenu = () => 
    <>
        <div className="MainMenu">
            <span className="Title">Food Roulette</span>
            <Link name="Home"/>
            <Link name="About"/>
        </div>
    </>
export default MainMenu;