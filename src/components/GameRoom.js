import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../utils/Socket";
import { UserDataContext } from "../App";
import { base_url } from "../config";
import ScoreBoard from "./ScoreBoard";
import GameBoard from "./GameBoard";
import GameChat from "./GameChat";

function GameRoom({ room, setInRoom, userName, host, gamesWon, _id }) {
  const socket = useContext(SocketContext);

  const [allPlayersReady, setAllPlayersReady] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [length, setLength] = useState(0);
  const [guessingYourWord, setGuessingYourWord] = useState(false);
  const [youGuessed, setYouGuessed] = useState(false);
  const [word, setWord] = useState("");
  const [players, setPlayers] = useState(["Just you"]);
  const [gameOver, setGameOver] = useState(false);
  const [youWon, setYouWon] = useState(false);
  const [winner, setWinner] = useState("");
  const { setUserData } = useContext(UserDataContext);

  let token = null; // used for cookies
  token = localStorage.getItem("token");

  const logoffStyle = {   // Replace with HEADER/NAV component
    textAlign: "right",
    paddingRight: 30,
  };

  useEffect(() => {
    //Receives players from the backend who entered a specific GameRoom
    socket.on("players", (data) => {
      setPlayers(data);
    });

    //Checks that all players are ready by either submitting their guesses or submitting a word to guess
    socket.on("all_players_ready", () => setAllPlayersReady(true));

    //Returns the length of the word to be guessed
    socket.on("word_to_guess", (length) => {
      setLength(length);
      //Resets the states to play a new round
      setGameStarted(true);
      setGuessingYourWord(false);
      setYouGuessed(false);
    });

    //Blocks player from guessing in current round if their submitted word was selected to be guessed.
    socket.on("guessing_your_word", () => {
      setGuessingYourWord(true);
      setGameStarted(true);
    });

    //Returned when a player guesses the correct word
    socket.on("right", () => {
      setYouGuessed(true);
    });

    socket.on("all_players_guessed", () => {
      setAllPlayersReady(true);
    });

    socket.on("game_over", () => setGameOver(true));

    //This is at the end of the game

    //Returns the winner if it's not yourself
    socket.on("winner", (data) => setWinner(data));
    //Returned if you are the winner
    async function patch() {
      try {
        const response = await fetch(`${base_url}api/v1/user/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gamesWon: ++gamesWon
          })
        });

        const data = await response.json();
        if (response.status === 200) {
          console.log("resp 200");
          setUserData(data.user);
          setYouWon(true);
        }
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    }
    socket.on("you_won", patch);
    return () => socket.off("you_won", patch);
    // socket.off("you_won")
  }, [socket]);

  const startGame = () => {
    socket.emit("start_game", room);
    setGameStarted(true);
    setAllPlayersReady(false);
    setYouGuessed(false);
    setGuessingYourWord(false);
  };

  const guessWord = () => {
    socket.emit("guess_word", { word, room });
  };

  const sendWord = () => {
    socket.emit("send_word", { word, room });
  };

  const leaveRoom = () => {
    socket.emit("leave_room", room);
    setInRoom(false);
  };

  const disconnectRoom = () => {
    socket.disconnect();
    setInRoom(false);
  };

  function wordHandler(event) {
    const { value } = event.target;
    setWord(value);
  }

  function newGame() {
    setGameOver(false);
    setGameStarted(false);
    setGuessingYourWord(false);
    setAllPlayersReady(false);
    setYouWon(false);
  }

  let guess = youGuessed ? "You Guessed Right!!!" : "";

  //Disables starting a new game/new round unless all players are ready and there are at least a minimum of 3 players
  let dis = players.length > 2 && allPlayersReady ? false : true;

  return (
    <div className="bg-orange-600 ">
      {/* To be replaced with header/nav component */}
      <div className="">
        <h2><span style={{color:"#ECBE07"}}>{userName}</span> &nbsp;  Room: <span style={{color:"#ECBE07"}}>{room}</span></h2>
        <button onClick={disconnectRoom}>Logout</button>
      </div>

      <div>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>
      
      <div className="grid grid-cols-3 gap-1 justify-items-center mt-36">
        <div className="bg-red-500  w-1/2 ">
          <h2>
            You have won {gamesWon} Game{gamesWon !== 1 && "s"}!!!
          </h2>
          <ScoreBoard players={players} />
        </div>

        <div className="bg-yellow-500 w-full">
          <GameBoard
            wordHandler={wordHandler}
            sendWord={sendWord}
            startGame={startGame}
            dis={dis}
            gameStarted={gameStarted}
            length={length}
            guess={guess}
            guessWord={guessWord}
            guessWordHandler={(event) => setWord(event.target.value)}
            guessingYourWord={guessingYourWord}
            host={host}
            gameOver={gameOver}
            newGame={newGame}
            youWon={youWon}
            winner={winner}
          />
        </div>

        <div className="bg-purple-500 w-1/2">
          <GameChat room={room} players={players} userName={userName} />
        </div>
      </div>

    </div>
  );
}

export default GameRoom;
