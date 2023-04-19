import React, { useContext, useEffect } from 'react'
import {SocketContext} from '../utils/Socket';

function GameChat() {
  const socket = useContext(SocketContext);

  // emits message to the backend
  const sendMessage = () => {
    socket.emit('send_message', { message: "Hello"})
  }

  useEffect(() => {
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

      <input placeholder="Message..." />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default GameChat