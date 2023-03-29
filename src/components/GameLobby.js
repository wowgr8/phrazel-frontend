import React from "react";
import { useNavigate } from "react-router-dom";

function GameLobby() {
  let navigate = useNavigate();

  const createRoom = () => {
    navigate("/GameRoom"); // Navigate to GameRoom
  };

  const joinRoom = () => {
    navigate("/GameRoom"); // Navigate to GameRoom
  };

  return (
    <div>
      <div>
        GameLobby
        {/* //////////////////////////////////// */}
        {/* Create a room section */}
        {/* //////////////////////////////////// */}
        <h1>Create the first room!</h1>
        <div>
          <p>Number of Rounds</p>
          <select>
            <option>Select number of rounds</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div>
          <p>Number of Players</p>
          <select>
            <option>Select a max number of players</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
        <div>
          <p>Image for your room</p>
          <select>
            <option>Select an image for your room</option>
            <option>:)</option>
            <option>:(</option>
            <option>:/</option>
            <option>:o</option>
          </select>
        </div>
        <br></br>
        <button onClick={createRoom}>Create</button>
        {/* //////////////////////////////////// */}
        {/* Need a hint section */}
        {/* //////////////////////////////////// */}
        <h1>Need a hint?</h1>
        <p>
          Hint numero uno:{" "}
          <em>
            This is where you can see all of the available games you can join,
            once they are created. Create the first room above ^^ to play!”
          </em>
        </p>
      </div>
      {/* //////////////////////////////////// */}
      {/* Join a room section */}
      {/* //////////////////////////////////// */}
      <div>
        <h1>Join a Room!</h1>
        <div>
          <select>
            Current games dropdown
            <option>Select a game to join</option>
            <option>14 hyper players</option>
            <option>8 rambunctious players</option>
            <option>5 measly players (running)</option>
            <option>1 sad player</option>
          </select>
        </div>
        <br></br>
        <button onClick={joinRoom}>Join</button>
      </div>
    </div>
  );
}

export default GameLobby;
