import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  // Used to conditionally render sign up or login form.
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [userName, setUserName] = useState(''); // define this in App.js and pass userName as props into ProfilePage,GameLobby, etc.

  let navigate = useNavigate(); 

  const toggleForm = () => {
    setShowSignUpForm(!showSignUpForm);
    console.log(showSignUpForm)
  }

  // Will take the user to profile page if they are signing up or game lobby if they signed in.  
  const submitForm = (e) => {
    e.preventDefault();

    const inputValue = e.target.username.value;
    if(showSignUpForm === true){
      setUserName(inputValue);
      navigate('/ProfilePage');
    } else {
      setUserName(inputValue);
      navigate('/GameLobby');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
      {showSignUpForm 
        ? <>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => submitForm(e)}>
              <label>username: </label>
              <input name="username"></input>
              <label>email: </label>
              <input name="email" disabled></input>
              <label>password: </label>
              <input name="password" disabled></input>
              <button type="submit">Signup!</button>
            </form>
            <button onClick={toggleForm} >Already have an account? Sign in </button>
          </> 
        : <>
            <h1>Login</h1>
            <form onSubmit={(e) => submitForm(e)}>
              <label>username: </label>
              <input name="username"></input>
              <label>password: </label>
              <input name="password" disabled></input>
              <button type="submit">Login!</button>
            </form>
            <button onClick={toggleForm} >Dont have an account? Register </button>
          </> 
      }
    </div>
  )
}

export default Login