import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  // Used to conditionally render sign up or login form.
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  let navigate = useNavigate(); 

  const toggleForm = () => {
    setShowSignUpForm(!showSignUpForm);
    console.log(showSignUpForm)
  }

  // Will take the user to profile page if they are signing up or game lobby if they signed in.
  const submitForm = (e) => {
    e.preventDefault();
    if(showSignUpForm === true){
      console.log("PROFILEPAGE");
      navigate('/ProfilePage')
      // navigate to ProfilePage
    } else {
      console.log("GAMELOBBY");
      navigate('/GameLobby')
    }
  }

  return (
    <> 
      {showSignUpForm 
        ? <>
            <h1>Sign Up</h1>
            <form onSubmit={submitForm}>
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
            <form onSubmit={submitForm}>
              <label>username: </label>
              <input></input>
              <label>password: </label>
              <input></input>
              <button type="submit">Login!</button>
            </form>
            <button onClick={toggleForm} >Dont have an account? Register </button>
          </> 
      }
    </>
  )
}

export default Login