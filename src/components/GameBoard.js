import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GameBoard(props) {
    const [wordSent, setWordSent] = useState(false);

    function sendWord(){
        props.sendWord()
        setWordSent(true)
    }

    function newGame(){
        props.newGame()
        setWordSent(false)
    }

    return (
        <div className="bg-red-800">
            {!props.gameOver?
            !wordSent? 
                <div className="App">
                    Submit of a word for others to guess!
                    <br/>
                    <input 
                        placeholder='Your Word...' 
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
                        onChange={props.wordHandler} 
                    />
                        <button onClick={sendWord}>Send Word</button>    
                </div>
            :
                !props.gameStarted?
                    <div className="App">
                        <h2>Waiting for the other players....</h2>
                        {props.host&&<button onClick={props.startGame} disabled={props.dis}>Start Game</button>}
                    </div>
                :
                    !props.guessingYourWord?
                        <div>
                            <h2>The word has {props.length} letters</h2>
                            <h1>{props.guess}</h1>
                            <input 
                                placeholder='Guess the Word...' 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                onChange={props.guessWordHandler} 
                            />
                            <button onClick={props.guessWord}>Send Word</button>
                            {props.host&&<button onClick={props.startGame} disabled={props.dis}>Next Round</button>}
                        </div>
                    :
                        <div>
                            <h2>Your word is being guessed for the other players!</h2>
                            {props.host&&<button onClick={props.startGame} disabled={props.dis}>Next Round</button>}
                        </div>
        :
            <div>
            <h2>Game Over</h2>
            {!props.youWon?<h2>Player {props.winner} won this game!</h2>:<h2>You Won!!!</h2>}
            <button onClick={newGame}>New Game</button>
            </div>}
        </div>
    )

}

export default GameBoard;