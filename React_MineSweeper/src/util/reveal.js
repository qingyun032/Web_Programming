/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, boardSize) => {
    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    if(x < 0 || x >= boardSize || y < 0 || y >= boardSize) return{ board, newNonMinesCount };

    if(board[x][y].revealed === true || board[x][y].flagged === true)
      return{ board, newNonMinesCount };
    else if(board[x][y].value !== 0){
      board[x][y].revealed = true;
      newNonMinesCount--;
      return{ board, newNonMinesCount };
    }else{
      board[x][y].revealed = true;
      newNonMinesCount--;
      newNonMinesCount = revealed(board, x+1, y, newNonMinesCount, boardSize).newNonMinesCount;
      newNonMinesCount = revealed(board, x, y+1, newNonMinesCount, boardSize).newNonMinesCount;
      newNonMinesCount = revealed(board, x-1, y, newNonMinesCount, boardSize).newNonMinesCount;
      newNonMinesCount = revealed(board, x, y-1, newNonMinesCount, boardSize).newNonMinesCount;
      newNonMinesCount = revealed(board, x+1, y+1, newNonMinesCount, boardSize).newNonMinesCount;
      newNonMinesCount = revealed(board, x+1, y-1, newNonMinesCount, boardSize).newNonMinesCount;
      newNonMinesCount = revealed(board, x-1, y+1, newNonMinesCount, boardSize).newNonMinesCount;
      newNonMinesCount = revealed(board, x-1, y-1, newNonMinesCount, boardSize).newNonMinesCount;
      return { board, newNonMinesCount };
    }
};
