import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';

function GameChat() {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  // emits message to the backend
  const sendMessage = () => {
    socket.emit('send_message', { message })
  }

  useEffect(() => {
    // listens for message data relayed from the backend
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])
  

  return (
    <div>
      <p>GameChat</p>

      <div>
        <h6> Message from username-placeholder:</h6>
        {messageReceived}
      </div>

      <input placeholder="Message..." onChange={(event)=> { setMessage(event.target.value)}} />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default GameChat