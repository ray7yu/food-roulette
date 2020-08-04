import React from 'react';
import './Signup.css'
import {useHistory} from 'react-router-dom';
const Signup = () => {
    let history = useHistory()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [duplicate, setDuplicate] = React.useState('')
    const [errorInput, setErrorInput] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const handleInputChange = (event) => {
        const {value, name} = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "duplicate") {
            setDuplicate(value)
        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if( !((password.length >= 8 || password.length <= 20) && password.match(/[a-z]/g) && password.match(/[A-Z]/g) &&
            password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g)) || password !== duplicate){
            setErrorInput(true);
            return;
        } 
        fetch('/api/register', {
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
            setErrorMsg('Error registering, please try again!');
        });
    }
    return(
        <>
            <div className="Signup">
                <div className="Option">
                    Register!
                </div>
                <div className="Login-Error">{errorMsg}</div>
                <div className="Requirement">
                    Password must be between 8-20 characters and contain at least one symbol, number, and capital letter
                </div>
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
                        className={"Credential" + (errorInput ? " Password" : "")}
                        required
                    />
                    <input
                        type="password"
                        name="duplicate"
                        placeholder="Enter password again"
                        value={duplicate}
                        onChange={handleInputChange}
                        className={"Credential" + (errorInput ? " Password" : "")}
                        required
                    />
                    <input type="submit" value="Submit" className="Button"/>
                </form>
            </div>
        </>
    );
}
export default Signup;