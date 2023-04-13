import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import GameLobby from "./components/GameLobby";
import GameRoom from "./components/GameRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function App() {
  // only used in GameLobby
  const [availableRooms, setAvailableRooms] = useState([]); 

  // used in GameRoom and GameLobby
  const [userName, setUserName] = useState(""); 
  const [anonymousUsername, setAnonymousUsername] = useState(""); 
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState("");

  // May need to be moved to GameRoom.
  const [players, setPlayers] = useState([]); 
  let localStorageRoom = localStorage.getItem("room");

  useEffect(() => {
    localStorage.setItem("room", room)
  }, [room]);

  useEffect(() => {
    socket.on("room_number", (room) => {
      setRoom(room) }
      );

      // If there's something in localStorageRoom, we set the room to the localStorage room upon refreshing. 
      if(localStorageRoom) {
        setRoom(localStorageRoom);
      }

    socket.on("available_rooms", (data) => {
      console.log("inside GameLobby useEffect", data);
      if (data === false) {
        console.log("inside GameLobby IF", data);
        return;
      } else {
        console.log("inside GameLobby ELSE", data);
        setAvailableRooms(data);
      }
      console.log("Data:", data);
    });
  }, [socket]);



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage setAnonymousUsername={setAnonymousUsername} />} />
          <Route path="Login" exact element={<Login />} />
          <Route path="ProfilePage" exact element={<ProfilePage />} />
          <Route
            path="GameLobby"
            exact
            element={
              <GameLobby
                socket={socket}
                setInRoom={setInRoom}
                userName={userName}
                anonymousUsername={anonymousUsername}
                availableRooms={availableRooms}
                setAvailableRooms={setAvailableRooms}
                room={room}
                setRoom={setRoom}
              />
            }
          />
          <Route
            path="GameRoom"
            exact
            element={
              <GameRoom 
                socket={socket}
                room={room} 
                players={players} 
                setPlayers={setPlayers} 
                userName={userName}
                anonymousUsername={anonymousUsername}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;