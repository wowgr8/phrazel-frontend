import React from "react";

function AvailableRooms({ availableRooms, joinRoom, handleSetRoom }) {
  return (
    <div>
      {/* Div for join room input & button */}
      <div className="justify-center items-center">
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Room to Join from Below..."
          style={{
            margin: "auto",
            width: "250px",
            padding: "12px 20px",
            display: "block",
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1.2 p-2.5"
          onChange={(event) => {
            handleSetRoom(event);
          }}
        />
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-4 mb-6"
          onClick={joinRoom}
        >
          Join a Room!
        </button>
      </div>

      {/* Div for cards with room # AND players */}
      <div className="container" class="flex flex-wrap justify-center">
        {/* This map should make a new card for each room */}
        {availableRooms.map((roomDetails) => (
          // Div for mapping each card, includes card styling
          <div
            class="w-1/5 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-1  overflow-auto"
            style={{ height: "240px" }}
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
              <ul class="divide-y divide-gray-200 dark:divide-gray-700">
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
