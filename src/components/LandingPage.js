import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './Login';

function LandingPage({ setUserName }) {
  let navigate = useNavigate(); 

  const [anonForm, showAnonForm] = useState(false);

  // Will assign the user a random username and send the user to the GameLobby
    // Random username - WIP
  const toggleForm = () => {
    showAnonForm(true)
    // navigate('/GameLobby'); //navigate to GameLobby
    // console.log("PlayNow - inside GAMELOBBY");
  }
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    setUserName(event.target.username.value);
    console.log(event.target.username.value);
    // console.log("PlayNow - inside GAMELOBBY");
    navigate('/GameLobby'); //navigate to GameLobby ---- add this in last.
  }

  return (
    <>
      <div>LandingPage</div>
      {anonForm 
        ?
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
        :
          <button onClick={toggleForm}>
            <p>Sign up later, PLAY NOW!!</p>
          </button>
      }

      <Login />
    </>
  )
}

export default LandingPage