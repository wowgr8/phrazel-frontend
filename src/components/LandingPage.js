import React, { useState, useContext, useEffect } from 'react';
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
    socket.connect()
    
    socket.emit('user_name',{userName,registeredUser:false})
    
    setUserName(event.target.username.value);
  }

  useEffect(()=>{
    socket.on("connect_error", () => {
      if(!socket.connected) window.alert(`Trying to re-connect again`)
    });
    //Here we are waiting for the backend to check if the user name we chose is available
    socket.on('existing_user_name',userName=> {
      window.alert(`The user name "${userName}" is already taken please try with other!`)
      socket.disconnect()
    })
    socket.on('user_name_accepted',()=>{
      console.log(socket.connected,"socket connected");
      navigate('/GameLobby'); //navigate to GameLobby ---- add this in last.
    })
  },[socket])
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
                  onChange={(event) => {
                    setUserName(event.target.value)
                  }}
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