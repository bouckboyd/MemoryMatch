import './App.css'
import Game from './Game.js'
import GameOver from './GameOver.js'
import Menu from './Menu.js'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {

  const [board, setBoard] = useState(null)

  const [finalScore, setFinalScore] = useState(null)

  // Source: Google AI Overview
// I may want to consider implementing a more sophisticated shuffling algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j] using destructuring assignment
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  function generateBoard(rows, cols) {
    let linear = []
    for (let i = 0; i < rows * cols; i++) {
        linear[i] = Math.floor(i / 2) + 1
    }
    linear = shuffleArray(linear)
    let grid = []
    let linearIndex = 0
    for (let i = 0; i < rows; i++) {
        let curRow = []
        for (let j = 0; j < cols; j++) {
            curRow[j] = linear[linearIndex]
            linearIndex++
        }
        grid[i] = curRow
    }
    console.log('App.js: GRID GENERATED')
    return grid
}

  const handleRecievedDimensions = (rowValue, colValue) => {
    console.log('App.js: handleRecievedDimensions() CALLED', rowValue)
    setBoard(generateBoard(rowValue, colValue))
  }

  return board === null ? 
    <Menu returnDimensions={handleRecievedDimensions} />
  : 
    finalScore === null ? 
      <Game numberBoard={board} returnScore={setFinalScore} />
    :
      <GameOver score={finalScore} restart={() => {setBoard(null); setFinalScore(null)} } />

}

export default App
