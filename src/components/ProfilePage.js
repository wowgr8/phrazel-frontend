import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  let navigate = useNavigate();

  function exitProfile(event) {
    event.target.value === "game lobby"
      ? navigate("/GameLobby")
      : navigate("/GameRoom");
  }

  return (
    <>
      <h1>ProfilePage</h1>

      <label htmlFor="hamburger dropdown"></label>
      <select name="hamburger menu" id="navigation id" onChange={exitProfile}>
        <option>Hamburger Menu</option>
        <option value="game lobby">Game Lobby</option>
        <option value="game room">Game Room</option>
      </select>

      <img></img>
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
        <h4>Wins/Losses</h4>
        {wins} : {losses}
      </div>
    </>
  );
}

export default ProfilePage;
