import React from 'react';

function GameBoard() {

  // div for user guesses - input field
    // with submit button
  // div for chat box
  // div for scoreboard
  // div for Hamburger nav button -  exits to profile page or game lobby
  const hamburgerNav = () => {
    console.log("Exiting to GameLobby or ProfilePage")
  }

  return (
    <div>
      <div onClick={hamburgerNav}>Hamburger button</div>
      <h1>GameBoard Placeholder</h1>

    </div>
  )
}

export default GameBoard