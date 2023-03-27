import React from 'react';

function GameBoard() {

  // div for user guesses - input field
    // with submit button
  // div for chat box
  // div for scoreboard
  // Section for gameboard 
  // div for Hamburger nav button -  exits to profile page or game lobby
  const hamburgerNav = () => {
    console.log("Exiting to GameLobby or ProfilePage")
  }

  return (
    <div>
      <div onClick={hamburgerNav}>Hamburger button</div>
      <h1>Room Name Placeholder</h1>
      <div>SCOREBOARD placeholder</div>
      <div>GameBoard placeholder</div>
      <div>Guess input field/ form placeholder</div>
      <div>Chatbox placeholder</div>
    </div>
  )
}

export default GameBoard