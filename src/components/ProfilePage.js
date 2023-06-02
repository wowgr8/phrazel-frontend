import React, { useState, useContext } from "react";
import {SocketContext} from '../utils/Socket';
import { base_url } from "../config";

function ProfilePage({ gamesWon, userName, _id }) {
  const socket = useContext(SocketContext);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [cycleUpdateForm, setCycleUpdateForm] = useState(true);
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  let token = null; // used for cookies
  token = localStorage.getItem("token");

  const openForm = () => {
    setShowUpdateForm(true)
  }
  const submitChanges = async (e) => {
    // Create socket.on() for backend with same string.
    if (currentPassword === "" || updatedPassword === "" || updatedPassword.length < 6) {
      window.alert("Please provide all values and updated password must have at least 6 characters");
    } else {
      e.preventDefault();
      console.log("button clicked")
      if (cycleUpdateForm) {
        try {
          const response = await fetch(`${base_url}api/v1/user/updatePassword/${_id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              oldPassword: currentPassword,
              newPassword: updatedPassword
            }),
          });

          console.log(`login responds with status code ${response.status}`);
          
          if (response.status === 200) {
            window.alert("Password successfully updated!");
          } else if (response.status === 401) {
            window.alert("Invalid current password");
          }
        } catch (error) {
          console.log("Error occurred: ", error);
        }
        
        console.log("current password: ", currentPassword);
        console.log("updated password: ", updatedPassword);
        // setShowUpdateForm(false)
      } else {
        socket.emit("update_userName", {
          updatedUserName,
          currentEmail
        })
        console.log("current Email: ", currentEmail);
        console.log("updated Username: ", updatedUserName);
        // setShowUpdateForm(false)
      }
    }
  }

  const cycleForm = () => {
    setCycleUpdateForm(!cycleUpdateForm)
  }

  return (
    <div className="lg:w-1/2 md:w-3/4 sm:w-full xl:w-1/3">
      <div className="text-xl uppercase" style={{color:"#ECBE07"}}>{userName}</div>
      <p>Total Wins: {gamesWon}</p> 

      {showUpdateForm ?
        <>
          {cycleUpdateForm ?
            <>
            <form onSubmit={(e)=>submitChanges(e)}>
              <div class="mb-6">
                <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                <input type="password" id="new-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => {setUpdatedPassword(e.target.value)}} />
              </div>
              <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => {setCurrentPassword(e.target.value)}} />
              </div>
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </form>
            <button className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={cycleForm}>
              Update Username
            </button>
            </>
          :
            <div>
              <form onSubmit={(e)=>submitChanges(e)}>
                <div class="mb-6">
                  <label for="newUsername" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Username</label>
                  <input id="newUsername" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required onChange={(e) => {setUpdatedUserName(e.target.value)}} />
                </div>
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Email</label>
                  <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => {setCurrentEmail(e.target.value)}} />
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
              </form>
              <button className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={cycleForm}>
                Update Password
              </button>
            </div>
          }
        </>
      : 
        <button 
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-10 mb-2"
          onClick={openForm}
        >
          Update Username or Password
        </button>
      }   
    </div>
  );
}

export default ProfilePage;
