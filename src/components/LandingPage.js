import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './Login';

function LandingPage({ setAnonymousUsername, anonymousUsername }) {
  let navigate = useNavigate(); 
  const [anonForm, showAnonForm] = useState(false);
  const [playNow] = useState(false);

  const toggleForm = () => {
    showAnonForm(!anonForm)
  }
  console.log("anonymous username check in LandingPage:", anonymousUsername )
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    setAnonymousUsername(event.target.username.value);
    navigate('/GameLobby'); //navigate to GameLobby ---- add this in last.
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
        : <Login />
      }
      

      {/* <div >
        <input placeholder='User Name...' onChange={userNameHandler} />
          <button onClick={connect}>Connect</button>
      </div> */}
    </>
  )
}

export default LandingPage