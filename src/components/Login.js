import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // Used to conditionally render sign up or login form.
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [username, setUserName] = useState(""); // define this in App.js and pass userName as props into ProfilePage,GameLobby, etc.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const toggleForm = () => {
    setShowSignUpForm(!showSignUpForm);
    console.log(showSignUpForm);
  };

  /* sign up form for new users  */
  async function signUpForm(e) {
    e.preventDefault();
    try {
      /* connecting to backend routes */
      const response = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        }),
      });

      console.log(`Sign up responds with status code ${response.status}`);
      const inputValue = e.target.username.value;

      /* error handeling sign up status codes - navigating to respective page*/
      //TODO need to allow user to sign up without an email
      //TODO need to let user know if credentials are already taken - refer to backend auth controller
      if (response.status === 201) {
        setUserName(inputValue);
        window.alert(`Welcome ${username}!`);
        navigate("/GameLobby");
      } else if (username === "" || password === "" || email === "") {
        window.alert("username, email, and password are required");
        navigate("/"); //stay on same page
      }
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  }

  /* login form for existing users */
  async function loginForm(e) {
    e.preventDefault();

    try {
      /* connecting to backend routes */
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      console.log(`login responds with status code ${response.status}`);
      const inputValue = e.target.username.value;

      /* error handeling sign in status code - navigate to respective page*/
      if (response.status === 200) {
        setUserName(inputValue);
        navigate("/GameLobby");
        window.alert(`Welcome ${username}!`);

      } else {
        navigate("/"); // stay on same page
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
              setUserName(event.target.value);
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
