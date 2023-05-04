import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [winLoseCount, setwinLoseCount] = useState({ wins: 0, lose: 0 });

  //let wins = 0; useState
  //wins = 1; setWins
  //<div>{wins}</div> (displays value of wins) jsx

  let navigate = useNavigate();

  // function exitProfile(event) {
  //   event.target.value === "game lobby"
  //     ? navigate("/GameLobby")
  //     : navigate("/GameRoom");
  // }

  return (
    <div>
      <h1>ProfilePage</h1>

      {/* <!-- Modal toggle --> */}
      {/* <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button> */}

      {/* <!-- Main modal --> */}
      <div >
        <p>HELLO</p>
          {/* <div class="relative w-full max-w-2xl max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <!-- Modal header -->
                  <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Profile
                      </h3>
                      <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  <!-- Modal body -->
                  <div class="p-6 space-y-6">
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                      </p>
                  </div>
                  <!-- Modal footer -->
                  <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                      <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                  </div>
              </div>
          </div>                */}
      </div>


      {/* <label htmlFor="hamburger dropdown"></label>
      <select name="hamburger menu" id="navigation id" onChange={exitProfile}>
        <option>Hamburger Menu</option>
        <option value="game lobby">Game Lobby</option>
        <option value="game room">Game Room</option>
      </select> */}

      {/* <img></img>
      <div>Avatar Dropdown Placeholder</div>
      <label htmlFor="avatar dropdown">Choose your avatar</label>
      <select name="avatar names" id="avatar id">
        <option value="avatar1">Avatar 1</option>
        <option value="avatar2">Avatar 2</option>
        <option value="avatar3">Avatar 3</option>
        <option value="avatar4">Avatar 4</option>
        <option value="avatar5">Avatar 5</option>
      </select>

      <div>
        <h4>wins/lose</h4>
        {winLoseCount.wins} : {winLoseCount.lose}
      </div> */}
    </div>
  );
}

export default ProfilePage;
