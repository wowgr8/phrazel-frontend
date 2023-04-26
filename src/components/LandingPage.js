import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Login from './Login';
import {SocketContext} from '../utils/Socket';

function LandingPage({ setUserName, userName }) {
  const socket = useContext(SocketContext);
  let navigate = useNavigate(); 
  const [anonForm, showAnonForm] = useState(false);

  const toggleForm = () => {
    showAnonForm(!anonForm)
  }
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    setUserName(event.target.username.value);
    socket.connect()
    socket.on("connect", () => {
      console.log(socket.connected,"socket connected");
      if(socket.connected) navigate('/GameLobby'); //navigate to GameLobby ---- add this in last.
    });
    
    setTimeout(() => {
      !socket.connected && window.alert(`Trying to re-connect again`)
    }, 1000);

  }

  return (
    <div className='my-56 '>
      <div className="container flex flex-col md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 bg-color-sky-300 columns-2">
        {/* Left Item */}
        <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
          Logo placeholder
        </div>
        
        {/* Right Item */}
        <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 hover:bg-sky-100'>
          <div className='flex flex-col mb-32 space-y-12 md:w-1/2 '>
            {anonForm 
              ?
                <div className=''>
                  <form onSubmit={handleUsernameSubmit}>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>
                      Enter a username:
                      <input
                        type="text"
                        defaultValue=""
                        name="username"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      />
                    </label>
                    <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Play!</button>
                  </form>
                  <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={toggleForm}>
                    <p> Back to sign in</p>
                  </button>
                </div>
              :
                <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={toggleForm}>
                  <p>Sign up later, PLAY NOW!!</p>
                </button>
            }

            {anonForm 
              ? null
              : <Login setUserName={setUserName} userName={userName}/>
            }    
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage