import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function GameLobby({
  setInRoom,
  userName,
  availableRooms,
  setAvailableRooms,
  disconnectRoom,
  room,
  setRoom,
}) {
  // Navigation
  let navigate = useNavigate();

  // NEW as of 4/5
  const createRoom = () => {
    socket.emit("create_room", userName);
    setInRoom(true);
    navigate("/GameRoom"); // Navigate to GameRoom
  };

  // NEW as of 4/5
  useEffect(() => {
    socket.on("room_number", (room) => setRoom(room));

    socket.on("available_rooms", (data) => {
      if (data === false) {
        setAvailableRooms([]);
      } else {
        setAvailableRooms(data);
      }
      console.log("Data:", data);
    });
  }, [socket]);

  const joinRoom = () => {
    if (room !== "") socket.emit("join_room", { room, userName });
    setInRoom(true);
    navigate("/GameRoom"); // Navigate to GameRoom
  };

  // This may not be working to change the game count on loading
  const changeGameCount = () => {
    // NEW as of 4/5
    setAvailableRooms = availableRooms.length;
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

  return (
    <>
      {/* NEW as of 4/5 */}
      {availableRooms.length === 0 ? (
        <div onLoad={changeGameCount}>
          <title>Game Lobby</title>
          <h1>Game Lobby</h1>
          <hr></hr>
          <div>
            {/* //////////////////////////////////// */}
            {/* Create a room section */}
            {/* //////////////////////////////////// */}
            <h2>Create a room!</h2>

            {/* NEW as of 4/5 */}
            <input
              placeholder="Room Number..."
              onChange={(event) => {
                handleSetRoom(event);
              }}
            />

            <button onClick={createRoom}>Create</button>

            <br></br>
            <br></br>

            <button onClick={disconnectRoom}>Disconnect</button>

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
        <div onLoad={changeGameCount}>
          <title>Game Lobby</title>
          <h1>Game Lobby</h1>
          <hr></hr>
          <div>
            {/* //////////////////////////////////// */}
            {/* Create a room section */}
            {/* //////////////////////////////////// */}
            <h2>Create a room!</h2>

            {/* NEW as of 4/5 */}

            <button onClick={createRoom}>Create</button>

            <br></br>
            <br></br>

            <button onClick={disconnectRoom}>Disconnect</button>
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
  );
}

export default GameLobby;
