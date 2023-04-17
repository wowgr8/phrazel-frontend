import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../utils/Socket';

function ScoreBoard() {
  const socket = useContext(SocketContext);
  const [gameScore, setGameScore] = useState([]);

  useEffect(() => {
    socket.on("game_score", (gameScore) => {
      setGameScore(gameScore);
    })
    console.log(gameScore)
  }, [gameScore])
  
  // loop through gameScore
    // sort gameScore by gameScore.roundsWon.
    // list gameScore.player and gameScore.roundWon.


  return (
    <>
      <h3>ScoreBoard Component</h3>

      {gameScore.map((player) => {

      })}
      {/* <ol>
        <li>Player username</li>
          <ul>
            <li>Score: 50</li>
            <li>Correct Guesses: 5/10</li>
          </ul>
        <li>Player username</li>
          <ul>
            <li>Score: 40</li>
            <li>Correct Guesses: 4/10</li>
          </ul>
        <li>Player username</li>
          <ul>
            <li>Score: 30</li>
            <li>Correct Guesses: 3/10</li>
          </ul>
      </ol> */}
    </>
  )
}

export default ScoreBoard