import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import GameLobby from "./components/GameLobby";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SocketContext, socket} from './utils/Socket';

function App() {
  //User name passed as props to login and used in Game lobby
  const [userName, setUserName] = useState(""); 






  
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<LandingPage userName={userName} setUserName={setUserName} />} />
            <Route path="Login" exact element={<Login userName={userName} setUserName={event=>setUserName(event.target.value)}/>} />
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