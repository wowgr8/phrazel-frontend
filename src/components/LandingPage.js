import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './Login';
import { SocketContext } from '../utils/Socket';
import Logo from '../assets/img/phrazel-logo.jpg'

function LandingPage({ setUserName, userName, setSubmitted }) {
  const socket = useContext(SocketContext);
  let navigate = useNavigate();
  const [anonForm, showAnonForm] = useState(false);

  const toggleForm = () => {
    showAnonForm(!anonForm)
  }
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    socket.connect()

    socket.emit('user_name', { userName, registeredUser: false })

    setUserName(event.target.username.value);
  }

  useEffect(() => {
    socket.on("connect_error", () => {
      if (!socket.connected) window.alert(`Trying to re-connect again`)
    });
    //Here we are waiting for the backend to check if the user name we chose is available
    socket.on('existing_user_name', userName => {
      window.alert(`The user name "${userName}" is already taken please try with other!`)
      socket.disconnect()
    })
    socket.on('user_name_accepted',()=>{
      setSubmitted(true);
      navigate('/GameLobby'); //navigate to GameLobby ---- add this in last.
    })
  }, [socket])
  return (
    <div className="py-32">
      <div className="container flex flex-col md:flex-row items-center px-6 mx-auto space-y-0 md:space-y-0 bg-color-sky-300 columns-2 gap-x-36">
        {/* Left Item */}
        <div className="flex flex-col space-y-12 md:w-1/2 mb-2">
          <img src={Logo} className="h-82 w-82 md:h-96 md:w-96 rounded-lg" style={{ height: '540px', width: '540px'}}/>
        </div>

        {/* Right Item */}
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 hover:bg-sky-100 flex flex-col justify-center">
          <div className="flex flex-col mb-32 space-y-12 items-center">
            {anonForm ? (
              <div className="pt-10 mt-10">
                <form onSubmit={handleUsernameSubmit}>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Enter a username:
                    <input
                      type="text"
                      defaultValue=""
                      name="username"
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </label>
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Play!
                  </button>
                </form>
                <button
                  type="button"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={toggleForm}
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2" onClick={toggleForm}>
                Sign up later, PLAY NOW!!!
              </button>
            )}

            {anonForm ? null : <Login setUserName={setUserName} userName={userName} setSubmitted={setSubmitted} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage