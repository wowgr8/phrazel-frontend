import React from "react";
import { useTimer } from 'react-timer-hook';

function RoundCountDown() {

  const time = new Date();
  console.log(time)
  time.setSeconds(time.getSeconds() + 10);

  //Timer is working.. 
  // Pass timer back up to GameRoom and have it run upon selecting "start game" button....
  
  const {
    seconds,
    isRunning
  } = useTimer({ expiryTimestamp: time });

  return (
    <div>
      <div style={{fontSize: '100px'}}>
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
    </div>
  );
}

export default RoundCountDown;
