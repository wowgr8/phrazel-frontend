import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';

function GameChat({ room, players, userName }) {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  // emits message, room, and userName to the backend
  const sendMessage = () => {
    socket.emit('send_message', { message, room, userName })
  }

  useEffect(() => {
    // listens for message data relayed from the backend
    socket.on('receive_message', (data) => {
      setMessageReceived(data);
    })
  }, [socket]);
  
  return (
    <div>
      <p>GameChat in room: {room}</p>

      <div>
        <p> <h4>{messageReceived.userName}</h4> says: {messageReceived.message}</p>
        
        <br></br>
        <br></br>
      </div>

      <input placeholder="Message..." onChange={(event)=> { setMessage(event.target.value)}} />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default GameChat