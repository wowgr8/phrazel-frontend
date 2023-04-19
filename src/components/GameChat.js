import React, { useContext } from 'react'
import {SocketContext} from '../utils/Socket';

function GameChat() {
  const socket = useContext(SocketContext);

  return (
    <div>
      <p>GameChat</p>

      <div>
        {/* Message will be shown here */}
      </div>

      <input placeholder="Message..." />
      <button> Send</button>
    </div>
  )
}

export default GameChat