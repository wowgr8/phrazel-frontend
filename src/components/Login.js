import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {SocketContext} from '../utils/Socket';
import { UserDataContext } from "../App";


function Login({userName,setUserName,userDataHandler}) {
  const socket = useContext(SocketContext);
  // Used to conditionally render sign up or login form.
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUserData} = useContext(UserDataContext)
  let token = null; // used for cookies
  token = localStorage.getItem("token");
  let navigate = useNavigate();

  const toggleForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };


  /* sign up form for new users */
  async function signUpForm(e) {
    e.preventDefault();
    try {
      /* connecting to backend routes */
      const response = await fetch("http://localhost:4000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          email: email,
        }),
      });

      console.log(`Sign up responds with status code ${response.status}`);
      const data = await response.json();
      console.log(data)

      /* login credential error handeling */
      if (response.status === 201) {
        token = data.token;
        localStorage.setItem("token", token);
        setUserData(data.user)
        window.alert(`Welcome ${userName}!`);
        socket.connect()
        socket.on("connect", () => {
          if(socket.connected) navigate('/GameLobby'); //navigate to GameLobby 
        });
    
      } else if (data.message === 'Username already exists') {
        window.alert("Username is already taken");
      } else if (data.message === 'Email already exists') {
        window.alert("Email is already taken");
      } else if (userName === "") {
        window.alert("Please enter a username");
      } else if (data.hasUsername === true) {
        window.alert("Username is already taken");
      } else if (email === "") {
        window.alert("Please enter an email");
      } else if (data.hasEmail === true) {
        window.alert("Email is already taken");
      } else if (password === "") {
        window.alert("Please enter a password");
      } else if (password.length < 6) {
        window.alert("Password must be at least 6 characters");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  }

  /* login form for existing users */
  async function loginForm(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password
        }),
      });

      console.log(`login responds with status code ${response.status}`);
      const data = await response.json();
      console.log('data from login',data);
      if (response.status === 200) {
        // setUserName(inputValue);
        token = data.token;
        localStorage.setItem("token", token);
        setUserData(data.user)
        socket.connect()
        socket.on("connect", () => {
          console.log(socket.connected,"socket connected");
          socket.connected && navigate('/GameLobby'); //navigate to GameLobby ---- add this in last.
        });
        window.alert(`Welcome ${userName}!`);
        navigate("/GameLobby");
      } else if (response.status === 401) {
        window.alert("Invalid username or password");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  }




  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {showSignUpForm ? (
        <>
          <h1>Sign Up</h1>
          <form onSubmit={(e) => signUpForm(e)}>
            <label>username: </label>
            <input name="username" onChange={(event) => {
              setUserName(event.target.value);
            }}></input>
            <label>email: </label>
            <input name="email" onChange={(event) => {
              setEmail(event.target.value);
            }}></input>
            <label>password: </label>
            <input name="password" onChange={(event) => {
              setPassword(event.target.value);
            }}></input>
            <button type="submit">Signup!</button>
          </form>
          <button onClick={toggleForm}>
            Already have an account? Sign in{" "}
          </button>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={(e) => loginForm(e)}>
            <label>username: </label>
            <input name="username" onChange={(event) => {
              setUserName(event.target.value)
            }}></input>
            <label>password: </label>
            <input name="password" onChange={(event) => {
              setPassword(event.target.value);
            }}></input>
            <button type="submit">Login!</button>
          </form>
          <p id="message"></p>
          <button onClick={toggleForm}>Dont have an account? Register </button>
        </>
      )}
    </div>
  );
}


export default Login;
