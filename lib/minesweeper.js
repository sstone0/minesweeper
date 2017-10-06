'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////   Start of Game Class -- This will keep track of each game   ////////
var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[(rowIndex, columnIndex)] === 'B') {
        console.log('The game is over!');
        this._board.print();
      } else if (this._numberOfTiles !== this._numberOfBombs) {
        console.log('You have won!');
      } else {
        console.log('Current Board: ');
        this._board.print();
      }
    }
  }]);

  return Game;
}();

;

////////   Start of Board Class -- Makes the boards and board functionality   ////////

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] === 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      };
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffSets = [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1], [0, -1], [0, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffSets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          };
        };
      });
      return numberOfBombs;
    }

    // Checks if there are any safe tiles (tiles with no bombs) //

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }

    // Function to print a board wit lines between columns //

  }, {
    key: 'print',
    value: function print() {
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    // Method to generate the player's board //

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      var i = void 0;
      var j = void 0;
      for (i = 0; i <= numberOfRows; i++) {
        var row = [];
        for (j = 0; j <= numberOfColumns; j++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }

    // Method to generate the bomb board //

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      var i = void 0;
      var j = void 0;
      for (i = 0; i <= numberOfRows; i++) {
        var row = [];
        for (j = 0; j <= numberOfColumns; j++) {
          row.push(null);
        };
        board.push(row);
      }
      // Will place bombs at random indexs on the bomb board and will check if there is already a bomb in said index //
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        };
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      };
      return board;
    }
  }]);

  return Board;
}();

;

var playerBoard = Board.generatePlayerBoard(3, 4);
var bombBoard = Board.generateBombBoard(3, 4, 5);

/*
console.log(playerBoard);
console.log(bombBoard);

console.log('Player Board: ');
print(playerBoard);
console.log('Bomb Board: ');
print(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
print(playerBoard);
*/

/*
Sets the game board sizes and how many bombs are placed.
Allows player to set the move they want to play (setting the flipped tile)
*/
var g = new Game(3, 3, 3);
g.playMove(0, 0);