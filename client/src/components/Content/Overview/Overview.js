import React, {useState} from 'react';
import './Overview.css'
import Landing from './Landing/Landing';
import Restaurants from './Restaurants/Restaurants';
import Recipes from './Recipes/Recipes';
import { CSSTransition} from 'react-transition-group';
const Overview = () => {
    const [showLanding, setShowLanding] = useState(true);
    const [showRestaurants, setShowRestaurants] = useState(false);
    const [showRecipes, setShowRecipes] = useState(false);
    const changeMode = mode => {
        setShowLanding(false)
        const newMode = mode => {
            if(mode === "RESTAURANT") {
                setShowRestaurants(true)
            } else if(mode === "RECIPE") {
                setShowRecipes(true)
            } else {
                throw SyntaxError;
            }
        }
        setTimeout(() => newMode(mode),300);
        
    };
    const returnMode = mode => {
        if(mode === "RESTAURANT") {
            setShowRestaurants(false)
        } else if(mode === "RECIPE") {
            setShowRecipes(false)
        } else {
            throw SyntaxError;
        }
        setTimeout(() => setShowLanding(true), 300);
    }
    return (
        <div className="Overview">
            <CSSTransition
            in={showLanding}
            timeout={300}
            classNames="landing-mode"
            unmountOnExit
            >
                <Landing handler={changeMode}/>
            </CSSTransition>
            <CSSTransition
            in={showRestaurants}
            timeout={300}
            classNames="mode"
            unmountOnExit
            >
                <Restaurants handler={returnMode}/>
            </CSSTransition>
            <CSSTransition
            in={showRecipes}
            timeout={300}
            classNames="mode"
            unmountOnExit>
                <Recipes handler={returnMode}/>
            </CSSTransition>
        </div>
    );
}
export default Overview;