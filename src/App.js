import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import GameLobby from "./components/GameLobby";
import GameRoom from "./components/GameRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SocketContext, socket} from './utils/Socket';

function App() {
  const [userName, setUserName] = useState(""); 

  console.log("anon username in app.js:", userName);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<LandingPage userName={userName} setUserName={setUserName} />} />
            <Route path="Login" exact element={<Login />} />
            <Route path="ProfilePage" exact element={<ProfilePage />} />
            <Route
              path="GameLobby"
              exact
              element={
                <GameLobby
                  userName={userName}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;