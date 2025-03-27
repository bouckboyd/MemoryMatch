import express from 'express'

const app = express()

app.get('/dimensions', (req, res) => { 
    console.log('Server: get request /dimensions')
    res.send([[1, 1, 2, 2], [3, 3, 4, 4], [5, 5, 6, 6]])     
})

app.listen(5001)