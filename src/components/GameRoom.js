import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ScoreBoard from './ScoreBoard';

function GameBoard() {
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
      
      <div>
        <h1>Room Name Placeholder</h1>
      </div>

      <div>
        <ScoreBoard />
      </div>

      <div>GameBoard placeholder</div>

      <div>
        <h4>Guess input field/ form placeholder</h4>
        <textarea placeholder='Enter guess here'></textarea>
      </div>

      <h4>Chatbox placeholder</h4>
    </div>
  )
}

export default GameBoard