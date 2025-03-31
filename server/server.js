import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors()) 

let finalScore
let board

app.get('/dimensions', (req, res) => { 
    console.log('Server: get request /dimensions')
    //res.send([[1, 1, 2, 2], [3, 3, 4, 4], [5, 5, 6, 6]])
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
    board = generateBoard(req.body.rows, req.body.cols)
    //console.log(finalScore)
})

function generateBoard(rows, cols) {

}

app.listen(5001)