import React, { useContext, useEffect, useState } from 'react'
import {SocketContext} from '../utils/Socket';
import EmojiPicker from 'emoji-picker-react';
import {ReactComponent as HappyFaceSVG} from "../svg/happy-face.svg";

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
    border: "1px solid #ADD8E6", 
    height: "400px",
    overflowY: "scroll",
    borderRadius: "15px",
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
    background: '#F0F8FF'
  };

  return (
    <div className='ml-3.5'>
      <p>GameChat in room: {room}</p>
      <EmojiPicker height={450} className="w-full"/>
      <div className='flex flex-row mb-2.5 gap-0.5'>
        <input 
          placeholder="Message..." 
          maxLength="50"
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block basis-4/5 p-2.5'
          onChange={(event)=> { setMessage(event.target.value)}} 
        
        />
        {/* <EmojiPicker /> ADD a drawer to an emoji icon that then shows EmojiPicker*/}
        <button 
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  py-2.5 text-center basis-1/5  "
          onClick={sendMessage}
        >
          Send
        </button>
        <HappyFaceSVG height="30px" width="30px" />
      </div>

      <div style={chatBoxStyle} >
        <div >
          {chatLog.map((message, index) => (
            <p 
              key={index} 
              className="text-left"
              style={{ 
                color: message.userName === userName ? '#ECBE07' : 'black', 
                padding: '10px' 
              }}  
            > 
              <strong>{message.userName}</strong>: {message.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameChat