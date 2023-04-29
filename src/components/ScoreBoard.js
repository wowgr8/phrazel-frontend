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
      {/* <h3>ScoreBoard Component</h3> */}

      {showData ? 

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Player
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {gameScore
                  .sort((a, b) => b.roundsWon - a.roundsWon)
                  .map((sortedScore) => {
                    return (
                      <div key={sortedScore.player}>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 text-xl text-gray-900 whitespace-nowrap dark:text-white">
                            {sortedScore.player}
                          </th>
                          <td class="px-6 py-4">
                            {sortedScore.roundsWon}
                          </td>
                        </tr>
                      </div>
                  );
                })}
              </tbody>

                {/* {gameScore
                  .sort((a, b) => b.roundsWon - a.roundsWon)
                  .map((sortedScore) => {
                    return (
                      <div key={sortedScore.player}>
                        <h6>Player Name: {sortedScore.player} </h6>
                        <h6>Score: {sortedScore.roundsWon} </h6>
                      </div>
                    );
                  })} */}

            </table>
          </div>

      : 
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Player
            </th>
            <th scope="col" class="px-6 py-3">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
              return (
                <div key={player}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 text-xl text-gray-900 whitespace-nowrap dark:text-white">
                      {player}
                    </th>
                    <td class="px-6 py-4">
                      0
                    </td>
                  </tr>
                </div>
            );
          })}
        </tbody>
      </table>
    </div>
      }
    </div>
  );
}

export default ScoreBoard;

{/* <div>
            {players.map((player) => {
              return (
                <div key={player}>
                  <h6>Player Name: {player} </h6>
                  <h6>Score: 0 </h6>
                </div>
              );
            })}
          </div> */}
