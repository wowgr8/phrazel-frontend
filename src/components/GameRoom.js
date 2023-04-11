import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "./ScoreBoard";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function GameRoom({ room, players, setPlayers, setInRoom, userName, anonymousUsername }) {
  let navigate = useNavigate();

  const [allPlayersReady, setAllPlayersReady] = useState(false)
  const [gameStarted, setGameStarted] = useState(false);
  const [length, setLength] = useState(0);
  const [guessingYourWord, setGuessingYourWord] = useState(false);
  const [youGuessed, setYouGuessed] = useState(false);
  const [word, setWord] = useState("");
  const [wordSent, setWordSent] = useState(false);

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

    socket.on("right", () => {
      setYouGuessed(true);
    });
  }, [socket]);

  const startGame = () => {
    socket.emit("start_game", room);
    setGameStarted(true);
  };

  const guessWord = () => {
    socket.emit("guess_word", { word, room });
  };

  const sendWord = () => {
    socket.emit("send_word", { word, room });
    setWordSent(true);
  };

  const leaveRoom = () => {
    socket.emit("leave_room", room);
    setInRoom(false);
    setWordSent(false);
  };

  const disconnectRoom = () => {
    socket.emit("disconnect_room", room);
    if (socket) socket.disconnect();
  };

  let guess = youGuessed ? "You Guessed Right!!!" : "";
  let dis = players.length > 2 && allPlayersReady ? false : true;

  console.log(players)
  console.log(anonymousUsername)

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
        <h2>Current players are: {players}, and anonymous players are: {userName}</h2>
        <button onClick={disconnectRoom}>Disconnect</button>
      </div>
      
      <br></br>
      <br></br>
      <br></br>

      <div style={columnStyle}>
        <ScoreBoard />
      </div>

      <div style={columnStyle}>
        GameBoard Component placeholder
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

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
