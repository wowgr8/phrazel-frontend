import React from 'react';
import { useNavigate } from "react-router-dom";
// add import for Login.js

function LandingPage() {
  let navigate = useNavigate(); 

  // Will assign random username and send user to GameLobby
    // Random username - WIP
  const playNow = () => {
    navigate('/GameLobby'); //navigate to GameLobby
    console.log("PlayNow - inside GAMELOBBY");
  }

  return (
    <>
      <div>LandingPage</div>
      <button onClick={playNow}>
        <p>Sign up later, PLAY NOW!!</p>
      </button>
      <h5>Login Page component placeholder</h5>
    </>
  )
}

export default LandingPage