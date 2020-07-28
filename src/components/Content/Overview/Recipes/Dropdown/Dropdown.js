import React from 'react';
import './Dropdown.css';
const Dropdown = props => {
    return(
    <>
        <div className="Dropdown">
            <button className="Dropdown-btn" onClick={() => props.changeShowDrop(props.type)}>
                {props.choiceSelected}
            </button>
            {props.showDrop && 
            <div className="Dropdown-content">
                {props.choices.map((choice) => {
                    return (props.type !=='restriction' ? 
                        <div className={choice === props.choiceSelected ? "Selected" : ""} key={choice} onClick={() => props.changeChoiceSelected(props.type, choice)}>
                            {choice}
                        </div>
                        :
                        <div key={choice} onClick={() => props.changeChoiceSelected(props.type, choice)}>
                            <label>
                                {choice}
                                <input className='Input' type='checkbox' name={choice} onChange={() => props.changeChoiceSelected(props.type, choice)} 
                                    checked={props.choiceList.includes(choice) ? true : false}/>
                            </label>
                        </div>
                        );
                    }
                )}
            </div>}
        </div>
    </>
    );
}
export default Dropdown;