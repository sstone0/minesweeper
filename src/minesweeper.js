// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

////////   Start of Game Class -- This will keep track of each game   ////////
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('The game is over!');
      this._board.print();
    } else if (this._board.hasSafeTiles === false) {
      console.log('You have won!');
    } else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}


////   Start of Board Class -- Makes the boards and board functionality   ////
class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get bombBoard() {
    return this._bombBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] === 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffSets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, -1],
      [0, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffSets.forEach(offset => {
      const neighborRowIndex = [rowIndex + offset[0]];
      const neighborColumnIndex = [columnIndex + offset[1]];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          return numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  // Function that checks if there are any safe tiles (tiles with no bombs) //
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // Function to print a board wit lines between columns //
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // Method to generate the player's board //
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    let i;
    let j;
    for (i = 0; i <= numberOfRows; i++) {
      let row = [];
      for (j = 0; j <= numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  // Method to generate the bomb board //
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    let i;
    let j;
    for (i = 0; i <= numberOfRows; i++) {
      let row = [];
      for (j = 0; j <= numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }
    // Will place bombs at random indexs on the bomb board and will check if there is already a bomb in said index //
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
    return board;
  }
}
