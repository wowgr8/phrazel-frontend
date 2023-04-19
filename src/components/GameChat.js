import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';

function GameChat() {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState('');

  // emits message to the backend
  const sendMessage = () => {
    socket.emit('send_message', { message })
  }

  useEffect(() => {
    // listens for message data relayed from the backend
    socket.on('receive_message', (data) => {
      alert(data.message)
    })
  }, [socket])
  

  return (
    <div>
      <p>GameChat</p>

      <div>
        {/* Message will be shown here */}
      </div>

      <input placeholder="Message..." onChange={(event)=> { setMessage(event.target.value)}} />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default GameChat