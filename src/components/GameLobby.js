import React, { useState, useEffect, useContext } from "react";
import GameRoom from "./GameRoom";

import { SocketContext } from "../utils/Socket";


function GameLobby({ userName, gamesWon, _id }) {
  const socket = useContext(SocketContext);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState("");
  const [host, setHost] = useState(false);
  let token = null; // used for cookies


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

  // const seeded = [
  //   { roomNumber: 1, players: ["jim", "bob", "sam"] },
  //   {
  //     roomNumber: 2,
  //     players: ["dan", "beth", "robin"],
  //   },
  // ];

  useEffect(() => {
    //Receives new room number from back end - back end is responsible for checking for duplicate room numbers.
    socket.on("room_number", (room) => {

      setRoom(room);
    });

    // If there's something in localStorageRoom, we set the room to the localStorage room upon refreshing.
    if (localStorageRoom) {
      setRoom(localStorageRoom);
    }


    // Receives available rooms & players from back end and sets it to useState
    // rooms: [{room: 1,
    //        players: ["name1", "name2", "name3"]
    //     },
    //     {room: 2,
    //       players: ["name4", "name5", "name6"]
    //    }]
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
              <hr></hr>
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
              <hr></hr>
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

                      <li>
                        Room: {roomDetails.roomNumber}
                      </li>
                      <ul>
                        <li key={roomDetails.players}>
                          Players: {roomDetails.players.join(", ")}
                        </li>
                      </ul>
                    </div>
                  ))}
                </ul>
              </div>
              <div>
                <input
                  placeholder="Enter Room to Join..."
                  onChange={(event) => {
                    handleSetRoom(event);
                  }}
                />
                <br></br>
                <br></br>

                <button onClick={joinRoom}>Join</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <GameRoom room={room} userName={userName} host={host} gamesWon={gamesWon} _id={_id} />
      )}
    </div>
  );
}

export default GameLobby;
