import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import GameLobby from './components/GameLobby';
import GameRoom from './components/GameRoom';

const URL = 'http://localhost:8000/api/v1/';

function App() {

// const [message, setMessage] = useState(''); 

//   useEffect(() => {

//     (async () => {
//       const myData = await getAllData(URL)
//       setMessage(myData.data);
//     })();
      
//     return () => {
//       console.log('unmounting');
//     }

//   }, []);

  return (
    // <>
    //   <h1>{message}</h1>   
    // </>
    <>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='ProfilePage' exact element={<ProfilePage />} />
        <Route path='GameLobby' exact element={<GameLobby />} />
        <Route path='GameRoom' exact element={<GameRoom />} />
      </Routes>
    </>
  );
}

export default App;
