import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from 'react';

// import { Routes, Route } from "react-router-dom";
// import Login from './components/Login';
// import ProfilePage from './components/ProfilePage';
// import GameLobby from './components/GameLobby';
// import GameRoom from './components/GameRoom';

const socket = io.connect("http://localhost:3001")

function App() {
  const [connected, setConnected] = useState(false)
  const [userName, setUserName] = useState('')
  const [inRoom, setInRoom] = useState(false)
  const [room, setRoom] = useState('')
  const [availableRooms, setAvailableRooms] = useState([])
  const [players, setPlayers] = useState([])
  const [word, setWord] = useState('')
  const [wordSent, setWordSent] = useState(false)
  const [allPlayersReady,setAllPlayersReady] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [length, setLength] = useState(0)
  const [guessingYourWord, setGuessingYourWord] = useState(false)
  const [youGuessed, setYouGuessed] = useState(false)

  const connect = () => {
    setConnected(true)
  }

  const createRoom = () => {
    socket.emit('create_room', userName)
    setInRoom(true)
  }

  useEffect(() => {

    socket.on('room_number', room => setRoom(room))

    socket.on('available_rooms', data => {
      if(data===false)setAvailableRooms([])
      else setAvailableRooms(data)
      console.log(data);
    })

    socket.on('players', data => setPlayers(data))

    socket.on('all_players_ready', () => setAllPlayersReady(true))

    socket.on('word_to_guess', length => {
      setGameStarted(true)
      setLength(length)
    })

    socket.on('guessing_your_word',()=>{
      setGuessingYourWord(true)
      setGameStarted(true)
    })

    socket.on('right', () => {
      setYouGuessed(true)
    })
  }, [socket])

  const joinRoom = () => {
    if (room !== "") socket.emit('join_room', { room, userName })
    setInRoom(true)
  }

  const sendWord = () => {
    socket.emit('send_word', { word, room })
    setWordSent(true)
  }

  const leaveRoom = () => {
    socket.emit('leave_room', room)
    setInRoom(false)
    setWordSent(false)
  }

  const disconnectRoom = () => {
    socket.emit('disconnect_room', room)
    if (socket) socket.disconnect();
  }

  const startGame = () => {
    socket.emit('start_game', room)
    setGameStarted(true)
  }

  const guessWord = () => {
    socket.emit('guess_word', { word, room })
  }

  let guess = youGuessed ? 'You Guessed Right!!!' : ''
  let dis = players.length > 2 && allPlayersReady ? false : true

  if (connected) {
    if (inRoom) {
      if (wordSent) {
        if (gameStarted) {
          if(guessingYourWord){
            return (
              <div className="App">
                <h2>Room: {room}</h2>
                <h2>Players:{players.join('-')}</h2>
                <h2>Your word is being guessed for the other players!</h2>
              </div>
            )
          }else{
            return (
              <div className="App">
                <h2>Room: {room}</h2>
                <h2>Players:{players.join('-')}</h2>
                <h2>The word has {length} letters</h2>
                <h1>{guess}</h1>
                <input placeholder='Guess the Word...' onChange={(event) => {
                  setWord(event.target.value)
                }} />
                <button onClick={guessWord}>Send Word</button>
              </div>
            )
          }
          
        } else {
          return (
            <div className="App">
              <h2>Room: {room}</h2>
              <h2>Players:{players.join('-')}</h2>
              <h2>Waiting for the other players....</h2>
              <button onClick={startGame} disabled={dis}>Start Game</button>
              <button onClick={leaveRoom}>Leave Room</button>
              <button onClick={disconnectRoom} >Disconnect</button>
            </div>
          )
        }
      } else {
        return (
          <div className="App">
            <h2>Room: {room}</h2>
            <h2>Players:{players.join('-')}</h2>
            <input placeholder='Your Word...' onChange={(event) => {
              setWord(event.target.value)
            }} />
            <button onClick={sendWord}>Send Word</button>
            <button onClick={leaveRoom}>Leave Room</button>
            <button onClick={disconnectRoom} >Disconnect</button>
          </div>
        )
      }
    } else {
      return (
        <div className="App">
          <h1>Available Rooms: {availableRooms.length > 0 ? availableRooms.join('-') : 'No Rooms Available, create a New Room'}</h1>
          <input placeholder='Room Number...' onChange={(event) => {
            setRoom(event.target.value)
          }} />
          <button onClick={joinRoom}>Join Room</button>
          <br />
          <br />
          <button onClick={createRoom}>Create New Room</button>
          <button onClick={disconnectRoom} >Disconnect</button>
        </div>
      )
    }
  } else {
    return (
      <div className="App">
        <input placeholder='User Name...' onChange={(event) => {
          setUserName(event.target.value)
        }} />
        <button onClick={connect} >Connect</button>
      </div>
    )
  }

}

export default App;


//<Routes>
//        <Route path='/' exact element={<Login />} />
 //       <Route path='ProfilePage' exact element={<ProfilePage />} />
 //       <Route path='GameLobby' exact element={<GameLobby />} />
//<Route path='GameRoom' exact element={<GameRoom />} />
//      </Routes>