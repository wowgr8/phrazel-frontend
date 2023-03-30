import React from 'react';

function ScoreBoard() {
  return (
    <>
      <h3>ScoreBoard Component</h3>
      <ol>
        <li>Player username</li>
          <ul>
            <li>Score: 50</li>
            <li>Correct Guesses: 5/10</li>
          </ul>
        <li>Player username</li>
          <ul>
            <li>Score: 40</li>
            <li>Correct Guesses: 4/10</li>
          </ul>
        <li>Player username</li>
          <ul>
            <li>Score: 30</li>
            <li>Correct Guesses: 3/10</li>
          </ul>
      </ol>
    </>
  )
}

export default ScoreBoard