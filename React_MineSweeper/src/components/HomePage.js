/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  
  const no = () => {

  }

  const sizechange = (e) => {
    boardSizeOnChange(e.target.value);
    if(mineNum > e.target.value*e.target.value){
      setError(true);
    }else{
      setError(false);
    }
  }

  const checkmax = (e) => {
    mineNumOnChange(e.target.value);
    if(e.target.value > boardSize*boardSize){
      setError(true);
    }else{
      setError(false);
    }
  }

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className='btn' onClick={error? no: startGameOnClick}>Start Game</button>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
       <div className = 'controlContainer'>
        {(showPanel)?
          <>
            <button className = 'btn' onClick={()=>setShowPanel(!showPanel)}>Difficulty Adjustment</button>
            <div className = 'controlWrapper'>
              <div className = 'error' style={{display: error? 'inherit': 'none'}}>ERROR: Mines number and board size are invalid!</div>
              <div className = 'controlPanel'>
                <div className  =  'controlCol'>
                  <p className  =  'controlTitle'>Mines Number</p>
                  <input type = 'range' step = '1' min={1} max={40} defaultValue={mineNum} onChange={(e) => checkmax(e)}/>
                  <p className = 'controlNum' style={{color: error? '#880000': 'inherit'}}>{mineNum}</p>
                </div>
                <div className  =  'controlCol'>
                  <p className  =  'controlTitle'>Board Size(nxn)</p>
                  <input type = 'range' step = '1' min={1} max={18} defaultValue={boardSize} onChange={(e) => sizechange(e)}/>
                  <p className = 'controlNum' style={{color: error? '#880000': 'inherit'}}>{boardSize}</p>
                </div>
              </div>
            </div>
          </>
          : <button className = 'btn' onClick={()=>setShowPanel(!showPanel)}>Difficulty Adjustment</button>
        }
       </div>
    </div>
  );

}
export default HomePage;   