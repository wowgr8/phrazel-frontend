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
  const [userData, setUserData] = useState({})
console.log(userData,'user data in App.js');

function userDataHandler (data) {
  setUserData(data)
}



  
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<LandingPage userName={userName} setUserName={setUserName} />} />
            <Route path="Login" exact element={<Login userName={userName} setUserName={setUserName} userDataHandler={userDataHandler}/>} />
            <Route path="ProfilePage" exact element={<ProfilePage />} />
            <Route
              path="GameLobby"
              exact
              element={
                <GameLobby
                  userName={userName}
                  gamesWon={userData.gamesWon} _id={userData._id}
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