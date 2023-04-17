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
    const sortedScores = gameScore.sort((a, b) => b.roundsWon - a.roundsWon);
    // list gameScore.player and gameScore.roundWon.


  return (
    <>
      <h3>ScoreBoard Component</h3>

      <div>
        {sortedScores.map((player) => {
          return (
            <div key={player.player}>
              <h6>Player Name: {player.player} </h6>
              <h6>Score: {player.roundsWon} </h6>
            </div>
          )
        })}
      </div>
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