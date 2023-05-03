import React from "react";

function AvailableRooms({ availableRooms, joinRoom, handleSetRoom }) {
  return (
    <div>
      {/* Div for join room input & button */}
      <div className="justify-center items-center">
        <input
          placeholder="Enter Room to Join..."
          style={{
            margin: "auto",
            display: "block",
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1.2 p-2.5"
          onChange={(event) => {
            handleSetRoom(event);
          }}
        />
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={joinRoom}
        >
          Join
        </button>
      </div>

      {/* Div for cards with room # AND players */}
      <div className="container" class="flex flex-wrap">
        {/* This map should make a new card for each room */}
        {availableRooms.map((roomDetails) => (
          // Div for mapping each card
          <div
            class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            key={roomDetails.roomNumber}
          >
            <div class="flex items-center justify-between mb-4">
              <div class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                <strong>Room: </strong>
                {roomDetails.roomNumber}
              </div>
            </div>

            {/* Players unordered list */}
            <div class="flow-root">
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {roomDetails.players.map((player) => {
                  return (
                    <li
                      class="py-3 sm:py-4 text-sm font-medium text-yellow-900 truncate dark:text-white"
                      key={player}
                    >
                      {player}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableRooms;
