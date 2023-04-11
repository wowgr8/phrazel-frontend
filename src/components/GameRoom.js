import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "./ScoreBoard";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function GameRoom({ room, players, setPlayers, setAllPlayersReady }) {
  let navigate = useNavigate();

  // [allPlayersReady, setAllPlayersReady] = useState(false)
  const [gameStarted, setGameStarted] = useState(false);
  const [length, setLength] = useState(0);
  const [guessingYourWord, setGuessingYourWord] = useState(false);

  const hamburgerNav = (event) => {
    event.target.value === "option1"
      ? navigate("/ProfilePage")
      : navigate("/GameLobby");
  };

  const columnStyle = {
    display: "inline-block", // Creates column effect
    width: "30%", // creates spacing in between text
    verticalAlign: "top", // each div has the same top starting point
  };

  // Added by Mau & Brendan 4/9
  useEffect(() => {
    socket.on("players", (data) => setPlayers(data));

    socket.on("all_players_ready", () => setAllPlayersReady(true));

    socket.on("word_to_guess", (length) => {
      setGameStarted(true);
      setLength(length);
    });

    socket.on("guessing_your_word", () => {
      setGuessingYourWord(true);
      setGameStarted(true);
    });
  }, [socket]);

  const startGame = () => {
    socket.emit("start_game", room);
    setGameStarted(true);
  };

  return (
    <div>
      <div>
        <select id="navOptions" onChange={hamburgerNav}>
          <option value="">Hamburger nav placeholder</option>
          <option value="option1">Profile Page</option>
          <option value="option2">Game Lobby</option>
        </select>
      </div>

      <div>
        {/* Below edited by Mau & Brendan 4/9 */}
        <h1>You are in Room {room}</h1>
        <h2>Current players are: {players}</h2>
      </div>

      <div style={columnStyle}>
        <ScoreBoard />
      </div>

      <div style={columnStyle}>
        GameBoard placeholder
        <div>
          <h4>Guess input field/ form placeholder</h4>
          <textarea placeholder="Enter guess here"></textarea>
        </div>
      </div>

      <div style={columnStyle}>
        <h4>Chatbox placeholder</h4>
      </div>
    </div>
  );
}

export default GameRoom;
