import React, { useState, useEffect, useContext } from "react";
import GameRoom from "./GameRoom";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../utils/Socket";
import AvailableRooms from "./AvailableRooms";

function GameLobby({ userName, gamesWon, _id }) {
  const socket = useContext(SocketContext);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [inRoom, setInRoom] = useState(false);
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

                <button
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={createRoom}
                >
                  Create a room!
                </button>

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
              <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray">
                Game Lobby
              </h1>
              <div>
                {/* //////////////////////////////////// */}
                {/* Create a room section */}
                {/* //////////////////////////////////// */}

                <button
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={createRoom}
                >
                  Create a room!
                </button>

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

                <h3>The available rooms & the players within them are:</h3>
                <AvailableRooms
                  availableRooms={availableRooms}
                  joinRoom={joinRoom}
                  handleSetRoom={handleSetRoom}
                />
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
