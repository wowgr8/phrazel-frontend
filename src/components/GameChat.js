import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';

function GameChat({ room, players }) {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  // emits message to the backend
  const sendMessage = () => {
    // socket.emit('send_message', {"msg": message, "player": players, "chatRoom": room})
    socket.emit('send_message', { message, room })
    
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
        {/* <h6> Message from {messageReceived.player} : {messageReceived.msg}</h6> ---- to be used with line 12 comment */} 
        <h6> Message from playername placeholder : {messageReceived}</h6>
        
        <br></br>
        <br></br>
      </div>

      <input placeholder="Message..." onChange={(event)=> { setMessage(event.target.value)}} />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default GameChat