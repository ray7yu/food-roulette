import React from 'react';
import Content from './components/Content/Content'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import './App.css';
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const App = () => {
  return (
    <div className="App">
      {/* <FontAwesomeIcon icon={faHome} /> */}
      <Navigation />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
