import React, { useEffect } from 'react';

function RoundCountDown({ startTimer, handleTimerEnd, seconds, setSeconds, allPlayersReady}) {

  // Timer does not stop count down after everyone has guessed correctly. 

  useEffect(() => {
    let interval = null;

    if (startTimer) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      clearInterval(interval);
      handleTimerEnd()
    }
    
    return () => clearInterval(interval);
  }, [startTimer, seconds]);

  const displayTime = `${Math.floor(seconds / 60) // rounds down to the nearest integer to get the number of minutes left in the countdown
    .toString()                                     //padStart adds a 0 to the front of a single digit integer
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
                          // ^^  gets the remainder of the seconds state divided by 60 to get the number of seconds left in the countdown.

  const progress = 100 - Math.floor(((30 - seconds) / 30) * 100);

  return (
    <div className='flex justify-center'>
      <div className='w-1/3'>
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-700 dark:text-white">Timer: </span>
          <span className="text-sm font-medium text-blue-700 dark:text-white">{displayTime}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default RoundCountDown;
