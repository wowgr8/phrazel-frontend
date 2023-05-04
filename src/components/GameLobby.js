import React, { useState, useEffect, useContext } from "react";
import GameRoom from "./GameRoom";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../utils/Socket";

function GameLobby({ userName, gamesWon, _id, setInRoom, inRoom }) {
  const socket = useContext(SocketContext);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [host, setHost] = useState(false);
  let navigate = useNavigate();
  let token = null; // used for cookies

  if (!socket.connected) navigate("/");

  //Keeps track of current room number upon refreshing page.
  let localStorageRoom = localStorage.getItem("room");

  const createRoom = () => {
    socket.emit("create_room", userName);
    setInRoom(true);

    setHost(true);
  };

  const joinRoom = () => {
    if (room !== "") socket.emit("join_room", { room, userName });
    setInRoom(true);
  };

  const handleSetRoom = (event) => {
    event.preventDefault();
    setRoom(event.target.value);
    localStorage.setItem("room", room);
  };

  useEffect(() => {
    //Receives new room number from back end - back end is responsible for checking for duplicate room numbers.
    socket.on("room_number", (room) => {
      setRoom(room);
    });

    // If there's something in localStorageRoom, we set the room to the localStorage room upon refreshing.
    if (localStorageRoom) {
      setRoom(localStorageRoom);
    }

    socket.on("available_rooms", (rooms) => {
      setAvailableRooms(rooms);
    });
  }, [socket]);

  return (
    <div>
      {!inRoom ? (
        <>
          {availableRooms.length === 0 ? (
            <div>
              <title>Game Lobby</title>
              <h1>Game Lobby</h1>
              <div>
                {/* //////////////////////////////////// */}
                {/* Create a room section */}
                {/* //////////////////////////////////// */}
                <h2>Create a room!</h2>

                <button onClick={createRoom}>Create</button>

                <br></br>
                {/* //////////////////////////////////// */}
                {/* Need a hint section */}
                {/* //////////////////////////////////// */}
                <br></br>
                <br></br>

                <div>
                  <p>
                    <em>
                      <strong>Hint:</strong> No rooms available to join yet,
                      create the first room above ^^ to play!
                    </em>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <title>Game Lobby</title>
              <h1>Game Lobby</h1>
              <div>
                {/* //////////////////////////////////// */}
                {/* Create a room section */}
                {/* //////////////////////////////////// */}
                <h2>Create a room!</h2>

                <button onClick={createRoom}>Create</button>

                <br></br>
              </div>
              {/* //////////////////////////////////// */}
              {/* Join a room section */}
              {/* //////////////////////////////////// */}
              <br></br>
              <br></br>
              <div>
                <h1>
                  <em>OR</em>
                </h1>

                <br></br>

                <h2>Join a Room!</h2>
                <h3>The available rooms & the players within them are:</h3>
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
          )}
        </>
      ) : (
        <GameRoom
          room={room}
          setInRoom={setInRoom}
          userName={userName}
          host={host}
          gamesWon={gamesWon}
          _id={_id}
        />
      )}
    </div>
  );
}

export default GameLobby;
