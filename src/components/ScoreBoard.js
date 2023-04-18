import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../utils/Socket';

function ScoreBoard({ players }) {
  const socket = useContext(SocketContext);
  const [gameScore, setGameScore] = useState([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    socket.on("game_score", (gameScore) => {
      setGameScore(gameScore);
      setShowData(true);
    })
    console.log(gameScore)
    console.log(players)
  }, [gameScore])
  
  return (
    <>
      <h3>ScoreBoard Component</h3>

      {showData ? 
        <>
          <div>
            {gameScore.sort((a, b) => b.roundsWon - a.roundsWon).map((sortedScore) => {
              return (
                <div key={sortedScore.player}>
                  <h6>Player Name: {sortedScore.player} </h6>
                  <h6>Score: {sortedScore.roundsWon} </h6>
                </div>
              )
            })}
          </div>
        </> 
      : 
        <>
          <div>
            {players.map((player) => {
              return (
                <div >
                  <h6>Player Name: {player} </h6>
                  <h6>Score: 0 </h6>
                </div>
              )
            })}
          </div>
        </> 
      }
    </>
  )
}

export default ScoreBoard