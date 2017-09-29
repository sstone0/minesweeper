'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (i = 0; i <= numberOfRows; i++) {
    var row = [];

    for (j = 0; j <= numberOfColumns; j++) {
      row.push(' ');
    };
    board.push(row);
  };
  return board;
};

console.log(generatePlayerBoard());

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (i = 0; i <= numberOfRows; i++) {
    var row = [];

    for (j = 0; j <= numberOfColumns; j++) {
      row.push(null);
    };
    board.push(row);
  };

  var numberOfBombsPlaced = 0;

  // loop can still add bomb on top of already placed bomb //
  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }

  return board;
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
console.log(printBoard(playerBoard));
console.log('Bomb Board: ');
console.log(printBoard(bombBoard));