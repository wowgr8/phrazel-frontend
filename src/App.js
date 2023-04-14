import React, { useEffect, useState, useContext } from "react";
import "./App.css";
// import io from "socket.io-client"; // Moved to GameLobby
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import GameLobby from "./components/GameLobby";
import GameRoom from "./components/GameRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SocketContext, socket} from './utils/Socket';

// const socket = io.connect("http://localhost:3001"); // MOved to GameLobby

function App() {
  // only used in GameLobby
  // const [availableRooms, setAvailableRooms] = useState([]);  // removed as props and created in gamelobby

  // used in GameRoom and GameLobby
  // const [userName, setUserName] = useState(""); // Replaced by username usestate defined in Login.js
  const [anonymousUsername, setAnonymousUsername] = useState(""); 
  // const [inRoom, setInRoom] = useState(false); // moved to gameroom
  // const [room, setRoom] = useState(""); // moved to gameroom

  
  // list of players inside your room. - MOVED to GameRoom
  // const [players, setPlayers] = useState([]);
  
  // Below two useEffects were moved to GameLobby

  // let localStorageRoom = localStorage.getItem("room");

  // useEffect(() => {
  //   localStorage.setItem("room", room)
  // }, [room]);

  // useEffect(() => {
  //   socket.on("room_number", (room) => {
  //     setRoom(room) }
  //     );

  //     // If there's something in localStorageRoom, we set the room to the localStorage room upon refreshing. 
  //     if(localStorageRoom) {
  //       setRoom(localStorageRoom);
  //     }

  //   socket.on("available_rooms", (data) => {
  //     console.log("inside GameLobby useEffect", data);
  //     if (data === false) {
  //       console.log("inside GameLobby IF", data);
  //       return;
  //     } else {
  //       console.log("inside GameLobby ELSE", data);
  //       setAvailableRooms(data);
  //     }
  //     console.log("Data:", data);
  //   });
  // }, [socket]);

  // Callback - potentially needed here. for anonymoususername


  console.log("anon username in app.js:", anonymousUsername);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<LandingPage anonymousUsername={anonymousUsername} setAnonymousUsername={setAnonymousUsername} />} />
            <Route path="Login" exact element={<Login />} />
            <Route path="ProfilePage" exact element={<ProfilePage />} />
            <Route
              path="GameLobby"
              exact
              element={
                <GameLobby
                  // socket={socket}
                  // setInRoom={setInRoom}
                  // userName={userName}
                  anonymousUsername={anonymousUsername}
                  // availableRooms={availableRooms}
                  // setAvailableRooms={setAvailableRooms}
                  // room={room}
                  // setRoom={setRoom}
                />
              }
            />
            {/* <Route
              path="GameRoom"
              exact
              element={
                <GameRoom 
                  // socket={socket}
                  // room={room} 
                  // players={players} 
                  // setPlayers={setPlayers} 
                  // userName={userName}
                  anonymousUsername={anonymousUsername}
                />
              }
            /> */}
          </Routes>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;