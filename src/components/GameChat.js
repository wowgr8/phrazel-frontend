import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';

function GameChat({ room, players, userName }) {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [chatLog, setChatLog] = useState([]);

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

  useEffect(() => {
    if (messageReceived.message !== '') {setChatLog(prevChatLog => [...prevChatLog, messageReceived])}
  }, [messageReceived]);
  
  useEffect(() => {
    console.log(chatLog)
  }, [chatLog]);

  
  return (
    <div>
      <p>GameChat in room: {room}</p>

      <div>
        <div>
          {chatLog.map((message, index) => (
            <p key={index}>{message.userName}: {message.message}</p>
          ))}
        </div>
        
        <br></br>
        <br></br>
      </div>

      <input placeholder="Message..." onChange={(event)=> { setMessage(event.target.value)}} />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default GameChat