import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './Login';
import {SocketContext} from '../utils/Socket';

function LandingPage({ setUserName, userName }) {
  const socket = useContext(SocketContext);
  let navigate = useNavigate(); 
  const [anonForm, showAnonForm] = useState(false);

  const toggleForm = () => {
    showAnonForm(!anonForm)
  }
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    setUserName(event.target.username.value);
    socket.connect()
    socket.on("connect", () => {
      console.log(socket.connected,"socket connected");
      socket.connected && navigate('/GameLobby'); //navigate to GameLobby ---- add this in last.
    });
    
    setTimeout(() => {
      !socket.connected && window.alert(`Trying to re-connect again`)
    }, 1000);

  }

  return (
    <>
      <div>LandingPage</div>
      {anonForm 
        ?
          <>
            <form onSubmit={handleUsernameSubmit}>
              <label>
                Enter a username:
                <input
                  type="text"
                  defaultValue=""
                  name="username"
                />
              </label>
              <button type="submit">Play!</button>
            </form>
            <button onClick={toggleForm}>
              <p> Back to sign in</p>
            </button>
          </>
        :
          <button onClick={toggleForm}>
            <p>Sign up later, PLAY NOW!!</p>
          </button>
      }

      {anonForm 
        ? null
        : <Login setUserName={setUserName} userName={userName}/>
      }
      
    </>
  )
}

export default LandingPage