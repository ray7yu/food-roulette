import React from 'react';
import './Users.css'
import Link from '../MainMenu/Link/Link'
import {
    BrowserRouter as Router,
    NavLink
} from 'react-router-dom';
const Users = props => 
    <>
        <div className="Users">
            <NavLink style={{textDecoration: 'none'}} to='/signup'><Link name="Sign Up"/></NavLink>
            <NavLink style={{textDecoration: 'none'}} to='/login'><Link name="Login"/></NavLink>
        </div>
    </>
export default Users;