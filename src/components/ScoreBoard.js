import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../utils/Socket";

function ScoreBoard({ players }) {
  const socket = useContext(SocketContext);
  const [gameScore, setGameScore] = useState([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    socket.on("game_score", (gameScore) => {
      setGameScore(gameScore);
      setShowData(true);
    });
  }, [gameScore]);

  return (
    <div className="border border-blue-200 h-96 overflow-y-scroll rounded-lg shadow-md bg-blue-50 mr-2.5 hover:shadow-xl hover:shadow-cyan-500/50">
      <h3>ScoreBoard Component</h3>

      {showData ? 
        <>
          <div>
            {gameScore
              .sort((a, b) => b.roundsWon - a.roundsWon)
              .map((sortedScore) => {
                return (
                  <div key={sortedScore.player}>
                    <h6>Player Name: {sortedScore.player} </h6>
                    <h6>Score: {sortedScore.roundsWon} </h6>
                  </div>
                );
              })}
          </div>
        </>
      : 
        <>
          <div>
            {players.map((player) => {
              return (
                <div key={player}>
                  <h6>Player Name: {player} </h6>
                  <h6>Score: 0 </h6>
                </div>
              );
            })}
          </div>
        </>
      }
    </div>
  );
}

export default ScoreBoard;
