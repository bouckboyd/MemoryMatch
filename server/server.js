import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors()) 

let finalScore
let board = [[1, 2][1, 2]] // this initial value will be replaced

app.get('/dimensions', (req, res) => { 
    console.log('Server: get request /dimensions')
    //res.send([[1, 1, 2, 2], [3, 3, 4, 4], [5, 5, 6, 6]])
    res.send(board)
})

app.post('/final-score', (req, res) => {
    console.log('Server: post request /final-score:', req.body.score1)
    finalScore = req.body
    console.log(finalScore)
})

app.get('/final-score', (req, res) => {
    console.log('Server: GET request /final-score')
    res.json(finalScore)
})

app.post('/selected-dimensions', (req, res) => {
    console.log('Server: post request /selected-dimensions:', req.body)
    board = generateBoard(req.body.rowValue, req.body.colValue)
    //console.log(finalScore)
})

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
    console.log('Server: GRID GENERATED')
    return grid
}

app.listen(5001)