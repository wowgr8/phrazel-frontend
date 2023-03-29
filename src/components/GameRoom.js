import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ScoreBoard from './ScoreBoard';

function GameBoard() {

  // div for user guesses - input field
    // with submit button
  // div for chat box
  // div for Hamburger nav button -  exits to profile page or game lobby
  let navigate = useNavigate(); 

  const hamburgerNav = (event) => {
    event.target.value === 'option1' ? navigate('/ProfilePage') : navigate('/GameLobby');
  }

  return (
    <div>
      <div>
        <select id="navOptions"  onChange={hamburgerNav}>
          <option value="">Hamburger nav placeholder</option>
          <option value="option1">Profile Page</option>
          <option value="option2">Game Lobby</option>
        </select>
      </div>
      
      <h1>Room Name Placeholder</h1>
      <ScoreBoard />
      <div>GameBoard placeholder</div>
      <div>Guess input field/ form placeholder</div>
      <div>Chatbox placeholder</div>
    </div>
  )
}

export default GameBoard