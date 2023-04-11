import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import GameLobby from "./components/GameLobby";
import GameRoom from "./components/GameRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState(""); // used in GameRoom and GameLobby
  const [inRoom, setInRoom] = useState(false); // used in GameRoom and GameLobby
  const [room, setRoom] = useState(""); //  used in GameRoom and GameLobby
  const [availableRooms, setAvailableRooms] = useState([]);
  const [players, setPlayers] = useState([]);
  // const [wordSent, setWordSent] = useState(false);

  const [allPlayersReady, setAllPlayersReady] = useState(false); // Might need to be MOVED to GameRoom.js for encapsulation purposes, passed as prop for now.
  // const [word, setWord] = useState(""); // Moved to GameRoom.js for encapsulation purposes.
  // const [gameStarted, setGameStarted] = useState(false); // Moved to GameRoom.js for encapsulation purposes.
  // const [length, setLength] = useState(0); // Moved to GameRoom.js for encapsulation purposes.
  // const [guessingYourWord, setGuessingYourWord] = useState(false); // Moved to GameRoom.js for encapsulation purposes.
  // const [youGuessed, setYouGuessed] = useState(false); // Moved to GameRoom.js for encapsulation purposes.

  // Will not be used for the Login.js/ replaced by Login.js code.
  // const connect = () => {
  //   setConnected(true)
  // }

  // useEffect(() => {
    // MOVED 4/5: Brendan moved all related to GameLobby in this useEffect (with [x])
    // [x] Move to GameLobby.js, inside a useEffect with Socket as dependency
    // socket.on("room_number", (room) => setRoom(room));

    // [x] Move to GameLobby.js, inside a useEffect with Socket as dependency
    // socket.on("available_rooms", (data) => {
    //   if (data === false) setAvailableRooms([]);
    //   else setAvailableRooms(data);
    //   console.log(data);
    // });

    // moved to GameRoom.js inside a useEffect
    // socket.on("players", (data) => setPlayers(data));

    // Move to GameRoom.js, inside a useEffect with Socket as dependency *** May need to be in it's own component down the line. A pre-gameRoom screen.
    // socket.on("all_players_ready", () => setAllPlayersReady(true));

    // Move to GameRoom.js, inside a useEffect with Socket as dependency
    // socket.on("word_to_guess", (length) => {
    //   setGameStarted(true);
    //   setLength(length);
    // });

    // Move to GameRoom.js, inside a useEffect with Socket as dependency
    // socket.on("guessing_your_word", () => {
    //   setGuessingYourWord(true);
    //   setGameStarted(true);
    // });

    // Move to GameRoom.js, inside a useEffect with Socket as dependency
    // socket.on("right", () => {
    //   setYouGuessed(true);
    // });
  // }, [socket]);

  // Move to GameRoom.js
  // const sendWord = () => {
  //   socket.emit("send_word", { word, room });
  //   setWordSent(true);
  // };

  // Move to GameRoom.js
  // const leaveRoom = () => {
  //   socket.emit("leave_room", room);
  //   setInRoom(false);
  //   setWordSent(false);
  // };

  // Move to GameRoom.js
  // const disconnectRoom = () => {
  //   socket.emit("disconnect_room", room);
  //   if (socket) socket.disconnect();
  // };

  // Move to GameRoom.js
  // const startGame = () => {
  //   socket.emit("start_game", room);
  //   setGameStarted(true);
  // };

  // Move to GameRoom.js
  // const guessWord = () => {
  //   socket.emit("guess_word", { word, room });
  // };

  // Move to GameRoom.js
  // let guess = youGuessed ? "You Guessed Right!!!" : "";
  // let dis = players.length > 2 && allPlayersReady ? false : true;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage setUserName={setUserName} />} />
          <Route path="Login" exact element={<Login />} />
          <Route path="ProfilePage" exact element={<ProfilePage />} />
          <Route
            path="GameLobby"
            exact
            element={
              <GameLobby
                setInRoom={setInRoom}
                userName={userName}
                availableRooms={availableRooms}
                setAvailableRooms={setAvailableRooms}
                // disconnectRoom={disconnectRoom}
                room={room}
                setRoom={setRoom}
              />
            }
          />
          <Route
            path="GameRoom"
            exact
            element={
              <GameRoom 
                room={room} 
                players={players} 
                setPlayers={setPlayers} 
                setAllPlayersReady={setAllPlayersReady} 
                allPlayersReady={allPlayersReady}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// --- --- ---

// if (connected) { // Handled by Login.js
//   if (inRoom) {
//     if (wordSent) {
//       if (gameStarted) {
//         if(guessingYourWord){
//           return ( // Cannot play/while waiting for other players to submit guess. GameBoard.js/ Possibly GameRoom.js
//             <div className="App">
//               <h2>Room: {room}</h2>
//               <h2>Players:{players.join('-')}</h2>
//               <h2>Your word is being guessed for the other players!</h2>
//             </div>
//           )
//         }else{
//           return ( // Inside of GameBoard.js - to be created by Cesar
//             <div className="App">
//               <h2>Room: {room}</h2>
//               <h2>Players:{players.join('-')}</h2>
//               <h2>The word has {length} letters</h2>
//               <h1>{guess}</h1>
//               <input placeholder='Guess the Word...' onChange={(event) => {
//                 setWord(event.target.value)
//               }} />
//               <button onClick={guessWord}>Send Word</button>
//             </div>
//           )
//         }

//       } else {
//         return ( // Inside of GameRoom.js - after entering a word
//           <div className="App">
//             <h2>Room: {room}</h2>
//             <h2>Players:{players.join('-')}</h2>
//             <h2>Waiting for the other players....</h2>
//             <button onClick={startGame} disabled={dis}>Start Game</button>
//             <button onClick={leaveRoom}>Leave Room</button>
//             <button onClick={disconnectRoom} >Disconnect</button>
//           </div>
//         )
//       }
//     } else {
//       return ( // Inside of GameRoom.js - When you are being asked a word
//         <div className="App">
//           <h2>Room: {room}</h2>
//           <h2>Players:{players.join('-')}</h2>
//           <input placeholder='Your Word...' onChange={(event) => {
//             setWord(event.target.value)
//           }} />
//           <button onClick={sendWord}>Send Word</button>
//           <button onClick={leaveRoom}>Leave Room</button>
//           <button onClick={disconnectRoom} >Disconnect</button>
//         </div>
//       )
//     }
//   } else {

// MOVED: On 4/5, Brendan tried to move the below logic into GameLobby, think I got it all

//     return ( // Inside of GameLobby.js - where you join or create a room
//       <div className="App">
//         <h1>Available Rooms: {availableRooms.length > 0 ? availableRooms.join('-') : 'No Rooms Available, create a New Room'}</h1>
//         <input placeholder='Room Number...' onChange={(event) => {
//           setRoom(event.target.value)
//         }} />
//         <button onClick={joinRoom}>Join Room</button>
//         <br />
//         <br />
//         <button onClick={createRoom}>Create New Room</button>
//         <button onClick={disconnectRoom} >Disconnect</button>
//       </div>
//     )
//   }
// } else {

// Handled by Login.js - Should be broken up and moved into Login.js
// return (
//       <div className="App">
//         <LandingPage />
//         <input placeholder='User Name...' onChange={(event) => {
//           setUserName(event.target.value)
//         }} />
//         <button onClick={connect} >Connect</button>
//       </div>
//     )
//   }
// }
