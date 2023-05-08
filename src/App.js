import React, { useState, createContext, useEffect, useContext } from "react";
import "./App.css";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import GameLobby from "./components/GameLobby";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketContext, socket } from './utils/Socket';
import Header from "./components/Header";
export const UserDataContext = createContext()

function App() {
  const [userName, setUserName] = useState(""); 
  const [userData, setUserData] = useState({gamesWon:0})
  const [showHeader, setShowHeader] = useState(false);
  const [submitted, setSubmitted] = useState(false); 
  const [inRoom, setInRoom] = useState(false);

  const backgroundImage = {
    backgroundImage: `url(${require('./assets/img/forest-bg.jpg')})`,
    backgroundPosition: 'top',
    backgroundPosition: 'center',
    height: '100vh',
    opacity: 0.9
  };
  
  useEffect(() => {
    if (userName !== "") {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [submitted]);

  return (
    <SocketContext.Provider value={socket}>
      <UserDataContext.Provider value={{ setUserData }}>
        <div className="App" style={backgroundImage}>
          <Router>
            {showHeader &&  <Header setInRoom={setInRoom} setShowHeader={setShowHeader} userName={userName} gamesWon={userData.gamesWon} />}
            <Routes>
              <Route
                path="/"
                exact
                element={<LandingPage userName={userName} setUserName={setUserName} setSubmitted={setSubmitted} />}
              />
              <Route path="Login" exact element={<Login userName={userName} setUserName={setUserName} />} />
              <Route path="ProfilePage" exact element={<ProfilePage _id={userData._id} />} />
              <Route
                path="GameLobby"
                exact
                element={
                  <GameLobby
                    userName={userName}
                    gamesWon={userData.gamesWon}
                    _id={userData._id}
                    inRoom={inRoom}
                    setInRoom={setInRoom}
                  />
                }
              />
            </Routes>
          </Router>
        </div>
      </UserDataContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;