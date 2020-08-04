import React from 'react';
import './Footer.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    const openPage = pageURL => {
        window.open(pageURL, "_blank");
    }
    return(
        <div className="Footer">
            <div className="Source">
                Raymond Yu
            </div>
            <div className="Source" onClick={() => openPage("https://www.linkedin.com/in/raymond-yu-ab4955149/")}>
                <FontAwesomeIcon icon={faLinkedin} className="Further Linkedin"/>
            </div>
            <div className="Source" onClick={() => openPage("https://www.github.com/ray7yu")}>
                <FontAwesomeIcon icon={faGithub} className="Further Github"/>
            </div>
        </div>
    );
};
export default Footer;