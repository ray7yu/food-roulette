import React from 'react';
import Users from './Users/Users';
import MainMenu from './MainMenu/MainMenu';
import './Navigation.css';
const Navigation = () => 
    <>
        <div className="Navigation">
            <MainMenu />
            <Users />
        </div>
    </>
export default Navigation;