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
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState("");

  // May need to be moved to GameRoom.
  const [players, setPlayers] = useState([]); 

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage setUserName={setUserName} />} />
          <Route path="Login" exact element={<Login />} />
          <Route path="ProfilePage" exact element={<ProfilePage />} />
          <Route
            path="GameLobby"
            exact
            element={
              <GameLobby
                setInRoom={setInRoom}
                userName={userName}
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
                room={room} 
                players={players} 
                setPlayers={setPlayers} 
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;