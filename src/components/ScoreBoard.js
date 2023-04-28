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

  // Attempted separate columns for players & their score in scoreboard, so wouldn't have to also have list of players above in GameRoom file (not working yet, but Brendan & Cesar will work on Tues.--also commented out below)

  // const miniColumn = {
  //   display: "inline-block", // Creates column effect
  //   width: "15%", // creates spacing in between text
  //   verticalAlign: "top", // each div has the same top starting point
  // };

  return (
    <>
      <h3>ScoreBoard Component</h3>

      {showData ? (
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
          {/* Attempt to put in name & score in separate columns--see comment above for miniColumn variable for context
          
          <div>
            {gameScore
              .sort((a, b) => b.roundsWon - a.roundsWon)
              .map((sortedScore) => {
                return (
                  <>
                    <div style={miniColumn} key={sortedScore.player}>
                      <h6>Player Name: {sortedScore.player} </h6>
                    </div>
                    <div style={miniColumn}>
                      <h6>Score: {sortedScore.roundsWon} </h6>
                    </div>
                  </>
                );
              })}
          </div> */}
        </>
      ) : (
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
      )}
    </>
  );
}

export default ScoreBoard;
