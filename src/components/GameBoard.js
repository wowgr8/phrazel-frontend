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
        <div className="">
            {!props.gameOver?
            !wordSent? 
                <div className="App">
                    Submit a word for others to guess!
                    <br />
                    <input
                        placeholder='Your Word...'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        onChange={props.wordHandler}
                    />

                    <button 
                        onClick={sendWord}
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
                        >
                            Send Word
                    </button>
                </div>
                :
                !props.gameStarted ?
                    <div className="App">
                        <h2>Waiting for the other players....</h2>
                        {props.host && <button onClick={props.startGame} disabled={props.dis} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Start Game</button>}
                    </div>
                    :
                    !props.guessingYourWord ?
                        <div>
                                {/************  add hint prop here **********/}
                            <h1>Hints: {props.hint}</h1>
                            <h2>The word has {props.length} letters</h2>
                            <h1>{props.guess}</h1>
                            <input
                                placeholder='Guess the Word...'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                onChange={props.guessWordHandler}
                                disabled={!props.startTimer}
                            />
                            <button 
                                onClick={props.guessWord}
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                >
                                    Send Word
                            </button>
                            {props.host && <button onClick={props.startGame} disabled={props.dis} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Next Round</button>}
                        </div>
                        :
                        <div>
                            <h2>Your word is being guessed for the other players!</h2>
                            {props.host && <button onClick={props.startGame} disabled={props.dis} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >Next Round</button>}
                        </div>
            :
            <div>
            <h2>Game Over</h2>
            {!props.youWon?<h2>Player {props.winner} won this game!</h2>:<h2>You Won!!!</h2>}
            <button onClick={newGame} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">New Game</button>
            </div>}
        </div>
    )

}

export default GameBoard;