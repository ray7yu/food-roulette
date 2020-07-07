import React from 'react';
import './Content.css'
import Overview from './Overview/Overview'
const Content = () => 
    <>
        <div className="Content">
            <span className="Welcome">
                Food Roulette
            </span>
            <Overview />
        </div>
    </>
export default Content;