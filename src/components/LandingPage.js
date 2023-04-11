import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './Login';

function LandingPage({ setUserName }) {
  let navigate = useNavigate(); 
  const [anonForm, showAnonForm] = useState(false);

  const toggleForm = () => {
    showAnonForm(true)
  }
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    setUserName(event.target.username.value);
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