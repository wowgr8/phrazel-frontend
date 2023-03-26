import React, { useState } from 'react'

function Login() {
  // Used to conditionally render sign up or login form.
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  

  return (
    <>
      <div>{showSignUpForm ? "SIGN UP" : "Login"}</div>
      <form >
        <label>username: </label>
        <input></input>
        <label>password: </label>
        <input></input>
      </form>
    </>
  )
}

export default Login