import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../utils/Socket';

function ScoreBoard() {
  const socket = useContext(SocketContext);
  const [gameScore, setGameScore] = useState([]);

  useEffect(() => {
    socket.on("game_score", (gameScore) => {
      setGameScore(gameScore);
    })
  }, [gameScore])
  
  const sortedScores = gameScore.sort((a, b) => b.roundsWon - a.roundsWon);

  return (
    <>
      <h3>ScoreBoard Component</h3>
      <div>
        {sortedScores.map((sortedScore) => {
          return (
            <div key={sortedScore.player}>
              <h6>Player Name: {sortedScore.player} </h6>
              <h6>Score: {sortedScore.roundsWon} </h6>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ScoreBoard