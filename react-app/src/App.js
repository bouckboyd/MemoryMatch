import './App.css'
import React, {useState, useEffect } from 'react'

function Card({ number, faceup, handleClick }) {
  console.log('faceup: ' + faceup)
  //const f = "true"
  return (
    <>
    {
      faceup ? 
        <button className={'CardFaceup'} onClick={handleClick}>{number}</button>
      :
        <button className={'Card'} onClick={handleClick} />
    }
    </>
  )
}  

function App() {

  const [testVar, setTestVar] = useState(null)

  const [turn, setTurn] = useState(1)

  const [cardsRevealed, setCardsRevealed] = useState(0)

  const [faceup, setFaceup] = useState(null)

  function fetchDimensions() {
    fetch('/dimensions')
    .then(res => res.json())
    .then(data => { 
      setTestVar(data)
      
      // initialize every element in faceup to false
      const newValues = data.map((row, rowIndex) => (
        row.map((item, colIndex) => {return false})
      ))
      setFaceup(newValues)

    })
    .catch(error => console.log('App.js: ERROR: fetchDimensions', error))
  }

  useEffect(() => {
    fetchDimensions() 
  }, [])

  function onButtonClick(rowIndex, colIndex) {

    setFaceup(prevArray => {
      const updatedArray = prevArray.map(row => [...row])
      updatedArray[rowIndex][colIndex] = !faceup[rowIndex][colIndex]
      return updatedArray
    })

    //faceup[rowIndex][colIndex] = !faceup[rowIndex][colIndex]
    console.log('full matrix: ' + faceup)
  }

  return (
    <>  
     {faceup === null ? <p>Loading...</p> : 
      <div className='Board'>
      {console.log('rerender lol')}
        <h1>Memory Match</h1>
        <div style={{alignSelf:'center'}}>
          <img height='100px' width='100px' src="https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_M_red-1024.png"></img>
        </div>
        <br/>
        {
        faceup.map((row, rowIndex) => (
          <div style={{display:"flex"}}>
            {
            row.map((item, colIndex) => (
              <Card number={testVar[rowIndex][colIndex]} faceup={item} handleClick={() => onButtonClick(rowIndex, colIndex)}/>
            ))
            }
          </div>
        ))
        }
        <br/>
        <div className='PlayerText' >Player 1: 0</div>
        <div className='PlayerText' >Player 2: 0</div>
      </div>
     }
    </> 
    
  )
}

export default App
