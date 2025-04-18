import React, { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';

function GameOver({ score, restart }) {

    //const navigate = useNavigate()

    //const [score, setScore] = useState(0)

    /*
    function fetchScore() {
        fetch('/final-score')
        .then(res => res.json())
        .then(data => {
            setScore([data.score1, data.score2])
            console.log('GameOver.js fetchScore data: ', data)
        })
        .catch(error => console.log('ERROR GameOver.js fetchScore:', error))
    }
    */

    useEffect(() => {
        //fetchScore()
    }, [])

    return <div style={{color:'yellow', 
                        fontSize: '48px',
                        alignItems:'center', 
                        justifyContent:'center', 
                        textAlign:'center', 
                        padding: '100px'}}>
        { score === 0 ? <div>Loading...</div> : 
            score.score1 === score.score2 ? <div>Tie</div> :
                score.score1 > score.score2 ? <div>Player 1 Wins!</div> : <div>Player 2 Wins!</div>
        }
        <br/>
        <div style={{fontSize: '32px', color:'yellow'}}>Score</div>
        <div style={{fontSize: '48px', color:'white'}}>{score.score1} - {score.score2}</div>
        <br/>
        <button className='NextButton' onClick={restart}>Play Again</button>
    </div>

}

export default GameOver