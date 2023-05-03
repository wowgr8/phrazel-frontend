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
  const [hint, setHint] = useState("");


  if (!socket.connected) setInRoom(false);
  let token = null; // used for cookies
  token = localStorage.getItem("token");

  useEffect(() => {
    //Receives players from the backend who entered a specific GameRoom
    socket.on("players", (data) => {
      setPlayers(data);
    });

    //Checks that all players are ready by either submitting their guesses or submitting a word to guess
    socket.on("all_players_ready", () => setAllPlayersReady(true));

    socket.on('hint', (hint) => {
      setHint(hint);
    });


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

  const sendWord = async () => {
    if (word === "" || word === null) {
      window.alert("Please enter a word");
    } else {
      const isValid = await checkWord(word.toLowerCase());
      console.log(`Is ${word} valid? ${isValid}`);
      if (!isValid) {
        window.alert("Please enter a valid word");
      } else {
        socket.emit("send_word", { word, room });
      }
    }
  };

  /* the function checks if words are valid english  */
  const checkWord = async (word) => {
    try {
      const response = await fetch('https://api.datamuse.com/words?sp=' + word);
      const words = await response.json();
      const isValid = words.some(w => w.word.toLowerCase() === word.toLowerCase());
      return isValid;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const leaveRoom = () => {
    socket.emit("leave_room", room);
    setInRoom(false);
  };

  const disconnectRoom = () => {
    socket.disconnect();
    setInRoom(false);
    socket.off()
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
    <div>
      <div className="bg-white border-gray-200 dark:bg-gray-800 w-1/8 flex flex-row justify-between">

        <div className="text-left px-2.5">
          <hr className="border-gray-700"></hr>

          <h2 className=" text-white">
              You have won <span style={{color:"#ECBE07"}} > {gamesWon} </span> Game{gamesWon !== 1 && "s"}!
          </h2>
        </div>

        <div className=" text-right px-2.5">
          <h2>
            <span className="text-md uppercase" style={{color:"#ECBE07"}}>{userName}</span> &nbsp; &nbsp;
            <button className="text-white  hover:text-blue-700" onClick={leaveRoom}>
              Leave Room: <span style={{color:"#ECBE07"}}>{room}</span>
            </button>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 justify-items-stretch mt-2">
        <div className="justify-self-start ml-2.5 ">
          <ScoreBoard players={players} />
        </div>

        <div className="justify-self-stretch">
          <GameBoard
            hint={hint}
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

        <div className="justify-self-end mr-2.5">
          <GameChat room={room} players={players} userName={userName} />
        </div>
      </div>

    </div>
  );
}

export default GameRoom;
