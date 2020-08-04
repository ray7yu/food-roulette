import React from 'react';
import './About.css'
import image from '../../../assets/food-icon.png';
const About = () => {
    return(
        <>
            <div className="About">
                <img src={image} alt="Logo" className="About-Image"/>
                <p className="Description">
                    &nbsp;&nbsp;&nbsp;&nbsp;Bored of the same old recipes? Try the Food Roulette! Using the Recipe Search API 
                    from <a href="https://www.edamam.com" target="_blank" rel = "noopener noreferrer">Edamam.com</a>, 
                    you can specify specific aspects of the recipe you want, including health restrictions, 
                    cooking time, and diet type. Each result includes information such as a list of ingredients, dietary cautions, 
                    a link to the original recipe, etc. Try it out!
                </p>
                <p className="Citation">
                    Background image sourced from: 
                    &nbsp;<a href="https://www.unsplash.com/@goumbik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" 
                    target="_blank" rel = "noopener noreferrer">
                        Lukas Blazek
                    </a>
                </p>
            </div>
        </>
    );
}
export default About;