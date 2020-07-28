import React from 'react';
import './About.css'
const About = () => {
    const [message, setMessage] = React.useState('Loading...')
    React.useEffect(() => {
        fetch('/api/secret')
        .then(res => res.text())
        .then(res => setMessage(res))
        .catch(setMessage('Error!'))
    }, [])
    return(
        <>
            <div className="About">
                {message}
            </div>
        </>
    );
}
export default About;