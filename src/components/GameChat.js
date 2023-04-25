import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';

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

  const chatBoxStyle = {
    border: "1px solid black", 
    height: "200px",
    overflowY: "scroll",
  };

  return (
    <div>
      <p>GameChat in room: {room}</p>
      <input placeholder="Message..." maxLength="50" onChange={(event)=> { setMessage(event.target.value)}} />
      <button onClick={sendMessage}> Send</button>

      <div style={chatBoxStyle}>
        <div>
          {chatLog.map((message, index) => (
            <p 
              key={index} 
              style={{ 
                backgroundColor: message.userName === userName ? '#ADD8E6' : 'white', 
                padding: '10px' 
              }}  
            > 
              <strong>{message.userName}</strong>: {message.message}
            </p>
          ))}
        </div>
        
        <br></br>
        <br></br>
      </div>
    </div>
  )
}

export default GameChat