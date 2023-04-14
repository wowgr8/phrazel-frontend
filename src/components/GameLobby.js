import React, {useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import GameRoom from "./GameRoom";
import { Route } from "react-router-dom";
import {SocketContext, socket} from '../utils/Socket';

// import {SocketContext, socket} from '../utils/Socket';

function GameLobby({
  userName,
  setUserName,
  // socket,
  // setInRoom,
  // userName,
  // room,
  // setRoom,
}) {

  const socket = useContext(SocketContext);
  socket.connect()

  
  // Navigation
  let navigate = useNavigate();
  // const socket = io.connect("http://localhost:3001");

  
  const [availableRooms, setAvailableRooms] = useState([]);
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState("");
  const [host, setHost] = useState(false);

  // NEW as of 4/5
  const createRoom = () => {
    socket.emit("create_room", userName);
    setInRoom(true);
    setHost(true)
    // navigate("/GameRoom"); // Navigate to GameRoom
  };
  console.log("anonymous username check #1:", userName )
  

  const joinRoom = () => {
    console.log("anonymous username check #2:", userName )
    if (room !== "") socket.emit("join_room", { room, userName });
    setInRoom(true);
    // navigate("/GameRoom"); // Navigate to GameRoom
  };

  const handleSetRoom = (event) => {
    event.preventDefault();
    console.log("event.target.value:", event.target.value);
    setRoom(event.target.value);
  };

  useEffect(() => {
    socket.on("room_number", (room) => {
      setRoom(room) }
      );

      // If there's something in localStorageRoom, we set the room to the localStorage room upon refreshing. 
      // if(localStorageRoom) {
      //   setRoom(localStorageRoom);
      // }

    socket.on("available_rooms", (data) => {
      if (data === false) {
        return;
      } else {
        setAvailableRooms(data);
      }
      console.log("Data:", data);
    });
  }, [socket]);



  return (
      <div >
        {!inRoom ? 
        <>
        {/* NEW as of 4/5 */}
        {availableRooms.length === 0 ? (
          <div >
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
                    <strong>Hint:</strong> No rooms available to join yet, create
                    the first room above ^^ to play!
                  </em>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div >
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
              <h3>The available rooms are:</h3>
              <p>{availableRooms.join(" - ")}</p>
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
        : 
                <GameRoom 
                  // socket={socket}
                  // setUserName={}
                  room={room} 
                  // players={players} 
                  // setPlayers={setPlayers} 
                  userName={userName}
                  host={host}
                />}
      </div>
  );
}

export default GameLobby;
