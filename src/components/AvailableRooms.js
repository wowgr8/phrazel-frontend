import React from "react";

function AvailableRooms({ availableRooms, joinRoom, handleSetRoom }) {
  return (
    <div>
      <div>
        <ul>
          {availableRooms.map((roomDetails) => (
            <div key={roomDetails.roomNumber}>
              <br></br>

              <li
                style={{
                  marginLeft: "30%",
                  marginRight: "55%",
                  textAlign: "left",
                }}
              >
                <strong>Room: {roomDetails.roomNumber}</strong>
              </li>
              <ul>
                <li
                  key={roomDetails.players}
                  style={{
                    marginLeft: "35%",
                    marginRight: "25%",
                    textAlign: "left",
                  }}
                >
                  <u>Players</u>: {roomDetails.players.join(", ")}
                </li>
              </ul>
            </div>
          ))}
        </ul>
      </div>

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

        <button onClick={joinRoom}>Join</button>
      </div>
    </div>
  );
}

export default AvailableRooms;
