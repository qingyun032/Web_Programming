import './App.css';
import React, { useState } from 'react';
import {startGame, guess, restart} from './axios.js';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const startMenu = 
    <div>
      <button onClick = {async () => {
        await startGame();
        setHasStarted(true);
      }}> start game </button>
    </div>

  const handleGuess = async () => {
    const response = await guess(number);
    if(response === "Equal") {setHasWon(true); console.log("win");}
    else{
      setStatus(response);
      setNumber('');
    }
  }

  const gameMode = 
  <>
    <p>Guess a number between 1 to 100</p>
    <input onChange={(e)=>setNumber(e.target.value)}></input>
    <button onClick={handleGuess} disabled={!number}>guess!</button>
    <p>{status}</p>
  </>

  const restartGame = async () => {
    await restart();
    setHasStarted(true);
    setHasWon(false);
    setStatus('');
    setNumber('');
  }

  const winningMode = 
  <>
    <p>you won! the number was {number}.</p>
    <button onClick={restartGame}>restart</button>
  </>

  const game = 
  <div>
    {hasWon? winningMode: gameMode}
  </div>

  return (
    <div className="App">
      {hasStarted? game: startMenu}
    </div>
  );
}

export default App;
