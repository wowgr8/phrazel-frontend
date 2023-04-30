import React from "react";

function AvailableRooms({ availableRooms, joinRoom, handleSetRoom }) {
  //   const joinAndSetRoom = (event) => {
  //     {
  //       handleSetRoom(event);
  //     }
  //     {
  //       joinRoom();
  //     }
  //   };

  return (
    // Beginning div
    <div>
      {/* Div for join room input & button */}
      <div className="justify-center items-center">
        {/* <button onClick={joinAndSetRoom}>Join</button> */}
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
        <button onClick={joinRoom}>Join</button>
      </div>

      {/* Div #1 for cards with room # AND players */}
      <div className="container" class="flex flex-wrap">
        {/* This map should make a new card for each room */}
        {availableRooms.map((roomDetails) => (
          // Div #2 for cards with room # AND players (includes card CSS)
          <div
            // className="container"
            class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            key={roomDetails.roomNumber}
          >
            {/* Room number unordered list */}
            {/* Div needed to hold Room # key */}
            <div class="flex items-center justify-between mb-4">
              <div class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                <strong>
                  Room:
                  {roomDetails.roomNumber}
                </strong>
              </div>
            </div>

            {/* Players unordered list */}

            {/* Div for styling player lists */}

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
                  // console.log("player:", player);
                })}
              </ul>
              {/* <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              > */}
              {/* Div needed to hold Room player key */}
              {/* <li

                  class="py-3 sm:py-4 text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  {roomDetails.players}
                  <br></br>
                </li>
              </ul> */}
            </div>
          </div>
        ))}
      </div>
      {/* Closing div */}
    </div>

    // <div
    // //   onMouseOver={(event) => {
    // //     handleSetRoom(event.availableRooms.roomNumber);
    // //   }}
    // > */}

    //   <div>
    //     <div>
    //       {availableRooms.map((roomDetails) => (
    //         <ul>
    //           <div
    //             key={roomDetails.roomNumber}
    //             className="container"
    //             class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    //           >
    //             <br></br>

    //             <li
    //               style={{
    //                 textAlign: "left",
    //               }}
    //             >
    //               <strong>Room: {roomDetails.roomNumber}</strong>
    //             </li>
    //             <ul>
    //               <li
    //                 key={roomDetails.players}
    //                 style={{
    //                   marginLeft: "15%",
    //                   textAlign: "left",
    //                 }}
    //               >
    //                 {/* <u>Players</u>: {roomDetails.players.join(", ")} */}
    //                 {roomDetails.players.join(", ")}
    //               </li>
    //             </ul>
    //           </div>
    //         </ul>
    //       ))}
    //     </div>

    //   <div className="justify-center items-center">
    //     {/* <button onClick={joinAndSetRoom}>Join</button> */}
    //     <input
    //       placeholder="Enter Room to Join..."
    //       style={{
    //         margin: "auto",
    //         display: "block",
    //       }}
    //       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1.2 p-2.5"
    //       onChange={(event) => {
    //         handleSetRoom(event);
    //       }}
    //     />
    //     <button onClick={joinRoom}>Join</button>
    //   </div>

    //   </div>
    // </div>
  );
}

export default AvailableRooms;
