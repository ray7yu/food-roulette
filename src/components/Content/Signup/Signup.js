import React from 'react';
import './Signup.css'
const Signup = () => {
    const [message, setMessage] = React.useState('Loading...')
    React.useEffect(() => {
        fetch('/api/signup')
        .then(
            res => {
                if(res.ok){
                    return res.text();
                } else{
                    return 'Error!';
                }
            }
        )
        .then(res => setMessage(res))
        .catch(setMessage('Error!'))
    }, [])
    return(
        <>
            <div className="Signup">
                {message}
            </div>
        </>
    );
}
export default Signup;