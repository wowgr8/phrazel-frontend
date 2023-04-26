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
    if (messageReceived !== '') {setChatLog(prevChatLog => [...prevChatLog, messageReceived])}
  }, [messageReceived]);
  
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

      <input 
        placeholder="Message..." 
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        onChange={(event)=> { setMessage(event.target.value)}} 
      />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default GameChat