import express from 'express'

const app = express()

app.get('/dimensions', (req, res) => { 
    console.log('Server: get request /dimensions')
    res.send([[2, 1, 4, 1], [4, 5, 2, 6], [5, 3, 3, 6]])     
})

app.listen(5001)