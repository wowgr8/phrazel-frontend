import React, { useState } from "react";

// exit button - that takes user back to gamelobby
// Will need a button
// section for profile photo
// section for drop down - to select avatar
// section for games w/l ratio

function ProfilePage() {
  const [buttonState, setButtonState] = useState("button click");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  function exitProfile() {
    alert(buttonState);
  }

  return (
    <>
      <h1>ProfilePage</h1>
      <img></img>
      <label for="avatar dropdown">Choose your avatar</label>
      <select name="avatar names" id="avatar id">
        <option value="avatar1">Avatar 1</option>
        <option value="avatar2">Avatar 2</option>
        <option value="avatar3">Avatar 3</option>
      </select>
      <div>Avatar Dropdown Placeholder</div>
      <div>
        <h4>Wins/Losses</h4>
        {wins} : {losses}
      </div>
      <button onClick={exitProfile}>X</button>
    </>
  );
}

export default ProfilePage;
