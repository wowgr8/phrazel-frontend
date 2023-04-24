import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';

//Todo
  // Add bg color to message senders message 
  // Add a fixed height and vertical scroll --- Do this in tailwind
  // Max character @ 50
  // extra - add delay to prevent spamming, set 1 sec timeout.

function GameChat({ room, userName }) {
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
    if (messageReceived !== '') {
      setChatLog(prevChatLog => {
        prevChatLog.unshift(messageReceived);
        // returns a new array with the spread operator containing the updated chatLog state
        return [...prevChatLog];
      });
    }
  }, [messageReceived]);

  console.log(chatLog)
  
  return (
    <div>
      <p>GameChat in room: {room}</p>
      <input placeholder="Message..." maxLength="50" onChange={(event)=> { setMessage(event.target.value)}} />
      <button onClick={sendMessage}> Send</button>

      <div>
        <div>
          {chatLog.map((message, index) => (
            <p key={index}>{message.userName}: {message.message}</p>
          ))}
        </div>
        
        <br></br>
        <br></br>
      </div>
    </div>
  )
}

export default GameChat