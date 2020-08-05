import React from 'react';
import './Login.css'
import {useHistory, Link} from 'react-router-dom';
const Login = () => {
    let history = useHistory()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMsg, setErrorMsg] = React.useState('')
    const handleInputChange = (event) => {
        const {value, name} = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify({'email': email, 'password': password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status === 200) {
                history.push('/');
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.log(err);
            setErrorMsg('Error logging in please try again!');
        });
    }
    return(
        <>
            <div className="Login">
                <div className="Option">Login!</div>
                <div className="Login-Error">{errorMsg}</div>
                <form onSubmit={onSubmit} className="Login-Form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleInputChange}
                        className="Credential"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleInputChange}
                        className="Credential"
                        required
                    />
                    <input type="submit" value="Submit" className="Button"/>
                </form>
                <div className="Register-Link">Not registered? <Link to="/signup">Click Here</Link></div>
            </div>
        </>
    );
}
export default Login;