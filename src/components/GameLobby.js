import React, {useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import GameRoom from "./GameRoom";
import { Route } from "react-router-dom";
import {SocketContext, socket} from '../utils/Socket';

// import {SocketContext, socket} from '../utils/Socket';

function GameLobby({
  anonymousUsername,
  setAnonymousUsername,
  // socket,
  // setInRoom,
  // userName,
  // room,
  // setRoom,
}) {

  const socket = useContext(SocketContext);

  // Navigation
  let navigate = useNavigate();
  // const socket = io.connect("http://localhost:3001");

  
  const [availableRooms, setAvailableRooms] = useState([]);
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState("");

  // NEW as of 4/5
  const createRoom = () => {
    socket.emit("create_room", anonymousUsername);
    setInRoom(true);
    // navigate("/GameRoom"); // Navigate to GameRoom
  };
  console.log("anonymous username check #1:", anonymousUsername )

  // useEffect(() => { 
  //   console.log("USEFFFECT RAN")
  //   if(anonymousUsername !== ''){
  //     // console.log("anonymous username check #2:", anonymousUsername )
  //     // if (room !== "") socket.emit("join_room", { room, anonymousUsername });
  //     // setInRoom(true);
  //     // navigate("/GameRoom"); // Navigate to GameRoom
  //     joinRoom();
  //   }
  // }, [joinRoom])
  

  const joinRoom = () => {
    console.log("anonymous username check #2:", anonymousUsername )
    if (room !== "") socket.emit("join_room", { room, anonymousUsername });
    setInRoom(true);
    // navigate("/GameRoom"); // Navigate to GameRoom
  };

  const handleSetRoom = (event) => {
    event.preventDefault();
    console.log("event.target.value:", event.target.value);
    setRoom(event.target.value);
  };

  // Maybe use later for dropdown
  // const roomsToJoin = () => {
  //   return availableRooms.map((room) => {
  //     <option>{room}</option>;
  //   });
  // };

  let localStorageRoom = localStorage.getItem("room");

  useEffect(() => {
    localStorage.setItem("room", room)
  }, [room]);

  useEffect(() => {
    socket.on("available_rooms", (data) => {
      if (data === false) {
        return;
      } else {
        setAvailableRooms(data);
      }
      console.log("Data:", data);
    });
  }, []);

  useEffect(() => {
    socket.on("room_number", (room) => {
      setRoom(room) }
      );

      // If there's something in localStorageRoom, we set the room to the localStorage room upon refreshing. 
      if(localStorageRoom) {
        setRoom(localStorageRoom);
      }

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
    // <SocketContext.Provider value={socket}>
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
              {/* <div>
                Maybe use below to eventually do a dropdown instead of input above

                <select>
                  {/* Current games dropdown
                  {roomsToJoin} */}
              {/* <option>Select a game to join</option> */}
              {/* <option>
                    {availableRooms.length > 0 ? availableRooms.join("-") : " "}
                  </option>
                  <option>
                    {availableRooms.length > 1 ? availableRooms.join("-") : " "}
                  </option>
                  <option>
                    {availableRooms.length > 2 ? availableRooms.join("-") : " "}
                  </option>
                  <option>
                    {availableRooms.length > 3 ? availableRooms.join("-") : " "}
                  </option>
                  <option>
                    {availableRooms.length > 4 ? availableRooms.join("-") : " "}
                  </option>
                  <option>
                    {availableRooms.length > 5 ? availableRooms.join("-") : " "}
                  </option> */}
              {/* </select> */}

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
                  // setAnonymousUsername={}
                  room={room} 
                  // players={players} 
                  // setPlayers={setPlayers} 
                  anonymousUsername={anonymousUsername}
                />}
      </div>
    // </SocketContext.Provider>
  );
}

export default GameLobby;
