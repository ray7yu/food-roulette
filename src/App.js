import React from 'react';
import Content from './components/Content/Content'
import Navigation from './components/Navigation/Navigation'
import {BrowserRouter as Router} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import './App.css';
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const App = () => {
  return (
    <div className="App">
      {/* <FontAwesomeIcon icon={faHome} /> */}
      <Router>
        <Navigation />
        <Content />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
