const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (i = 0; i <= numberOfRows; i++) {
    let row = [];

    for (j = 0; j <= numberOfColumns; j++) {
      row.push(' ');
    };
    board.push(row);
  };
  return board;
};


console.log(generatePlayerBoard());

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (i = 0; i <= numberOfRows; i++) {
    let row = [];

    for (j = 0; j <= numberOfColumns; j++) {
      row.push(null);
    };
    board.push(row);
  };

  let numberOfBombsPlaced = 0;

  // loop can still add bomb on top of already placed bomb //
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }

  return board;
}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
console.log(printBoard(playerBoard));
console.log('Bomb Board: ');
console.log(printBoard(bombBoard));
