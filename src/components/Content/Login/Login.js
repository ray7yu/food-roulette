import React from 'react';
import './Login.css'
import {useHistory} from 'react-router-dom';
const Login = props => {
    let history = useHistory()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
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
            alert('Error logging in please try again!');
        });
    }
    return(
        <>
            <div className="Login">
                <form onSubmit={onSubmit}>
                    <h1>Login Below!</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </>
    );
}
export default Login;