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
      {showData ? 
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Player
                </th>
                <th scope="col" className="px-6 py-3">
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
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap">
                          {sortedScore.player}
                        </th>
                        <td className="px-6 py-4">
                          {sortedScore.roundsWon}
                        </td>
                      </tr>
                    </div>
                  );
                })}
            </tbody>
          </table>
        </div>
      : 
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Player
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="">
              {players.map((player) => {
                return (
                  <div key={player}>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <th scope="row" className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap">
                        {player}
                      </th>
                      <td className="px-6 py-4">
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