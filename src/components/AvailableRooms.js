import React from "react";

function AvailableRooms({ availableRooms, joinRoom }) {
  return (
    <div>
      {/* Div for cards with room # AND players */}
      <div className="container" class="flex flex-wrap justify-center">
        {/* This map should make a new card for each room */}
        {availableRooms.map((roomDetails) => (
          // Div for mapping each card, includes card styling
          <div
            onClick={() => joinRoom(roomDetails.roomNumber)}
            class="w-1/5 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-1 hover:shadow-xl hover:shadow-cyan-500/50"
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
