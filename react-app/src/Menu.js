import './App.css';
import './Menu.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {

    const navigate = useNavigate()

    // Declare state for the row value
    const [rowValue, setRowValue] = useState(6);
    const [colValue, setColValue] = useState(6);

    // Handle slider change event
    const handleRowChange = (event) => {
        setRowValue(event.target.value);
    };
    const handleColChange = (event) => {
        setColValue(event.target.value);
    };

    function handleClick() {

        const data = {rowValue, colValue}

        fetch('/selected-dimensions', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache'
            }, 
            body: JSON.stringify(data)
          })
          .catch(error => { console.error('ERROR App.js:', error) })

        navigate('/MemoryMatch/game')
    }

    return (
        <div className='MenuDiv' style={{ padding: '100px' }}>
            <img height='150px' width='150px' src="https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_M_red-1024.png" />
            <br/>
            <br/>
            Rows: <span>{rowValue} </span>
            <input 
                id="rowSlider"
                type="range"
                min="2"
                max="10"
                step="2"
                value={rowValue} // Bind the slider value to the state
                onChange={handleRowChange} // Update the state when the slider value changes
            /> 
            <br/>
            Columns: <span>{colValue} </span>
            <input 
                id="colSlider"
                type="range"
                min="2"
                max="10"
                step="2"
                value={colValue} // Bind the slider value to the state
                onChange={handleColChange} // Update the state when the slider value changes
            /> 
            <br/><br/>
            <button className='NextButton' onClick={handleClick}>Play</button>
        </div>
    );
}

export default Menu;