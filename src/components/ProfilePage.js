import React, { useState, useContext } from "react";
import {SocketContext} from '../utils/Socket';

function ProfilePage() {
  const socket = useContext(SocketContext);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [cycleUpdateForm, setCycleUpdateForm] = useState(true);
  const [currentUserName, setCurrentUserName] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");

  const openForm = () => {
    setShowUpdateForm(true)
  }
  const submitChanges = () => {
    socket.emit("")
    setShowUpdateForm(false)
  }
  const cycleForm = () => {
    setCycleUpdateForm(!cycleUpdateForm)
  }

  return (
    <div>
      {/* pass in userName and gamesWon=userData.gamesWon from App.js */}
      <>NAME</>
      <p>Total Wins:</p> 

      {showUpdateForm ?
        <>
          {cycleUpdateForm ?
            <>
            <form>
              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Emmail</label>
                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
              </div>
              <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>
              <div class="mb-6">
                <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>
              <div class="flex items-start mb-6">
                
              </div>
              <button onClick={submitChanges} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </form>
            <button className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={cycleForm}>
              Update Username
            </button>
            </>
          :
            <div>
              <form>
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                  <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div class="mb-6">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                  <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div class="flex items-start mb-6">
                  
                </div>
                <button onClick={submitChanges} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
              </form>
              <button className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={cycleForm}>
                Update Password
              </button>
            </div>
          }

        </>
      : 
        <button onClick={openForm}>Change Username or Password</button>
      }   
    </div>
  );
}

export default ProfilePage;
