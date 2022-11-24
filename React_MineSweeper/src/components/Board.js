/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    // const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.
    const win = nonMineCount === 0;

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board);
        setNonMineCount(boardSize*boardSize-mineNum);
        setMineLocations(newBoard.mineLocations);
        setRemainFlagNum(mineNum);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        // setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if (!newBoard[x][y].revealed && !newBoard[x][y].flagged){
            newBoard[x][y].flagged = true;
            newFlagNum--;
        } else if (newBoard[x][y].flagged){
            newBoard[x][y].flagged = false;
            newFlagNum++;
        }
        setBoard(newBoard);
        setRemainFlagNum(newFlagNum);
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let newNonMinesCount = nonMineCount;
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        if(newBoard[x][y].value === '💣'){
            mineLocations.map((e) => newBoard[e[0]][e[1]].revealed = true);
            setBoard(newBoard);
            setTimeout(()=>{console.log("boom"); setGameOver(true);}, 500);
        }else if(newBoard[x][y].value !== 0){
            newBoard[x][y].revealed = true;
            newNonMinesCount--;
            setBoard(newBoard);
            setNonMineCount(newNonMinesCount);
        }else{
            // newBoard[x][y].revealed = true;
            const openCells = revealed(newBoard, x, y, newNonMinesCount, boardSize);
            setBoard(openCells.board);
            setNonMineCount(openCells.newNonMinesCount);
            console.log(openCells.newNonMinesCount, nonMineCount);
        }
        console.log(nonMineCount);
        // if(nonMineCount === 0){
        //     setTimeout(()=>{setWin(true);}, 500);
        // }
    };
    console.log(nonMineCount);

    const showModal = () => {
        if(win)
            return <Modal restartGame = {restartGame} backToHome = {backToHome} win = {true} />;
        else if(gameOver)
            return <Modal restartGame = {restartGame} backToHome = {backToHome} win = {false} />;
    }

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                {showModal()}
                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className='boardContainer'>
                    <Dashboard remainFlagNum = {remainFlagNum} gameOver = {gameOver || win}/>
                    {
                        board.map((subCol) => {
                            return (
                                <div id={'row'+subCol.y} style={{display:"flex"}}>
                                { subCol.map((cell) => {
                                    return (<Cell rowIdx={cell.y} colIdx={cell.x} detail={cell} updateFlag={updateFlag} revealCell={revealCell}></Cell>)
                                }) } <br />
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    );



}

export default Board