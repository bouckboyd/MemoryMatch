import './App.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ number, faceup, handleClick }) {
  console.log('faceup: ' + faceup)
  //const f = "true"
  return (
    <>
    {
      faceup === 'true' ? 
        <button className={'CardFaceup'} onClick={handleClick}>{number}</button>
      :
        faceup === 'false' ?
          <button className={'Card'} onClick={handleClick} />
        :
          <button className={'DeadCard'} />
    }
    </>
  )
}  

function Game({ numberBoard, returnScore }) {

  //const navigate = useNavigate()

  //const [testVar, setTestVar] = useState(null)

  const [turn, setTurn] = useState(1)

  const [cardsRevealed, setCardsRevealed] = useState(0)

  const [revealedNumbers, setRevealedNumbers] = useState([0, 0])
  const [revealedIndex, setRevealedIndex] = useState([[-1, -1], [-1, -1]])

  const [faceup, setFaceup] = useState(null)

  const [matchMade, setMatchMade] = useState(false)

  const [remainingMatches, setRemainingMatches] = useState(null)

  // player scores
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  function fetchDimensions() {
    fetch('/dimensions')
    .then(res => res.json())
    .then(data => { 
      //setTestVar(data)
      setRemainingMatches(data.length * data[0].length / 2)
      
      // initialize every element in faceup to 'false'
      const newValues = data.map((row, rowIndex) => (
        row.map((item, colIndex) => {return 'false'})
      ))
      setFaceup(newValues)

    })
    .catch(error => console.log('App.js: ERROR: fetchDimensions', error))
  }

  useEffect(() => {
    //fetchDimensions() 

    setRemainingMatches(numberBoard.length * numberBoard[0].length / 2)
      
      // initialize every element in faceup to 'false'
      const newValues = numberBoard.map((row, rowIndex) => (
        row.map((item, colIndex) => {return 'false'})
      ))
      setFaceup(newValues)

  }, [])

  function onButtonClick(rowIndex, colIndex) {

    if (cardsRevealed < 2 && faceup[rowIndex][colIndex] === 'false') {
      setFaceup(prevArray => {
        const updatedArray = prevArray.map(row => [...row])
        updatedArray[rowIndex][colIndex] = 'true'
        return updatedArray
      })
      revealedNumbers[cardsRevealed] = numberBoard[rowIndex][colIndex]
      revealedIndex[cardsRevealed] = [rowIndex, colIndex]
      setCardsRevealed(cardsRevealed + 1)

      if (cardsRevealed + 1 === 2) { // +1 is to adapt for asynchronous setting of cardsRevealed
        if (revealedNumbers[0] === revealedNumbers[1]) {
          setRemainingMatches(remainingMatches - 1)
          turn === 1 ? setScore1(score1 + 1) : setScore2(score2 + 1)
          setMatchMade(true)
        } else {
          setMatchMade(false)
        }
      }

    }

    //faceup[rowIndex][colIndex] = !faceup[rowIndex][colIndex]
    //console.log('full matrix: ' + faceup)
  }

  function handleNextButton() {

    if (matchMade) {
      faceup[revealedIndex[0][0]][revealedIndex[0][1]] = 'dead'
      faceup[revealedIndex[1][0]][revealedIndex[1][1]] = 'dead'
    } else {
      turn === 1 ? setTurn(2) : setTurn(1)
      faceup[revealedIndex[0][0]][revealedIndex[0][1]] = 'false'
      faceup[revealedIndex[1][0]][revealedIndex[1][1]] = 'false'
    }

    setRevealedNumbers([0, 0])
    setRevealedIndex([[-1, -1], [-1, -1]])
    setCardsRevealed(0)

    if (remainingMatches === 0) {

      const data = {
        score1, 
        score2
      }

      returnScore(data)

      /*
      fetch('/final-score', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }, 
        body: JSON.stringify(data)
      })
      .catch(error => { console.error('ERROR App.js:', error) })
      */

      //navigate('/MemoryMatch/game-over')
    }

  }

  return (
    <>  
     {faceup === null ? <p>Loading...</p> : 
      <div className='Board'>
      {console.log('rerender lol')}
        <br/>
        <div style={{alignSelf:'center'}}>
          <img height='150px' width='150px' src="https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_M_red-1024.png"></img>
        </div>
        <br/>
        {
        faceup.map((row, rowIndex) => (
          <div style={{display:"flex"}}>
            {
            row.map((item, colIndex) => (
              <Card number={numberBoard[rowIndex][colIndex]} faceup={item} handleClick={() => onButtonClick(rowIndex, colIndex)}/>
            ))
            }
          </div>
        ))
        }
        <br/>
        <div style={{'font-size': '30px', 'color': 'white'}}>
          Player {turn}'s Turn
        </div>
        <br/>
        <div className='PlayerText' >Player 1 - {score1}</div>
        <div className='PlayerText' >Player 2 - {score2}</div>
        <br/>
        <div style={{display: 'flex'}}>
          { cardsRevealed == 2 ? <button className='NextButton' onClick={() => handleNextButton()} >Next</button> : <></> }
        </div>
      </div>
     }
    </> 
    
  )
}

export default Game
