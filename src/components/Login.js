import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  // Used to conditionally render sign up or login form.
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const [userName, setUserName] = useState('')

  let navigate = useNavigate(); 

  const toggleForm = () => {
    setShowSignUpForm(!showSignUpForm);
    console.log(showSignUpForm)
  }

  // Will take the user to profile page if they are signing up or game lobby if they signed in.
  const submitForm = (e) => {
    e.preventDefault();

    if(showSignUpForm === true){
      setUserName(e.target.value)
      console.log("Inside PROFILEPAGE");
      console.log("user input:", e.target.value);
      navigate('/ProfilePage')  // navigate to ProfilePage
    } else {
      setUserName(e.target.value)
      console.log("Inside GAMELOBBY");
      console.log("user input:", e.target.value);
      navigate('/GameLobby') // navigate to GameLobby
    }
  }

  // Will assign random username and send user to GameLobby
  const playNow = () => {
    navigate('/GameLobby'); //navigate to GameLobby
    console.log("PlayNow - inside GAMELOBBY");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
      {showSignUpForm 
        ? <>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => submitForm(e)}>
              <label>username: </label>
              <input></input>
              <label>email: </label>
              <input></input>
              <label>password: </label>
              <input></input>
              <button type="submit">Signup!</button>
            </form>
            <button onClick={toggleForm} >Already have an account? Sign in </button>
          </> 
        : <>
            <h1>Login</h1>
            <form onSubmit={(e) => submitForm(e)}>
              <label>username: </label>
              <input></input>
              <label>password: </label>
              <input disabled></input>
              <button type="submit">Login!</button>
            </form>
            <button onClick={toggleForm} >Dont have an account? Register </button>
          </> 
      }
    </div>
  )
}

export default Login