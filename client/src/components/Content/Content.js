import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import './Content.css'
import Overview from './Overview/Overview'
import About from './About/About'
import Signup from './Signup/Signup'
import Login from './Login/Login'
import withAuth from '../../hoc/withAuth';
const Content = () => 
    <>
        <div className="Content">
            <span className="Welcome">
                Food Roulette
            </span>
            <Switch>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/about'>
                    <About />
                </Route>
                <Route exact path='/' component={withAuth(Overview)} />
            </Switch>
        </div>
    </>
export default Content;