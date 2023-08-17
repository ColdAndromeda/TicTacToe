let isBoolean = true;
let currentPlayer = "X"; // Initialize the current player to X

const TableValues = {
  One: [0, 0],
  Two: [0, 1],
  Three: [0, 2],
  Four: [1, 0],
  Five: [1, 1],
  Six: [1, 2],
  Seven: [2, 0],
  Eight: [2, 1],
  Nine: [2, 2],
};

let GameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const AddMove = (id) => {
  if (!isBoolean) return; // Don't allow adding moves if the game is over
  let parsedId = id;

  if (TableValues.hasOwnProperty(parsedId)) {
    let row = TableValues[parsedId][0];
    let column = TableValues[parsedId][1];

    // Check if the cell is already occupied
    if (GameBoard[row][column] !== "") {
      console.log("Cell already occupied");
      return;
    }

    GameBoard[row][column] = currentPlayer;

    // Update the visual representation of the board
    document.getElementById(id).textContent = currentPlayer;

    // Check if the current player has won
    if (WinLossLogic(currentPlayer)) {
      document.getElementById(currentPlayer + "Wins").textContent =
        currentPlayer +
        " Wins: " +
        (parseInt(
          document
            .getElementById(currentPlayer + "Wins")
            .textContent.split(":")[1]
        ) +
          1);
      isBoolean = false;
      ResetGame();

      setTimeout(GetDataCell(), 2000);
      // Disable further moves when someone wins
      return;
    }

    // Check for a draw
    if (isDraw()) {
      document.getElementById("XWins").textContent =
        "X Wins: " +
        parseInt(document.getElementById("XWins").textContent.split(":")[1]);
      document.getElementById("OWins").textContent =
        "O Wins: " +
        parseInt(document.getElementById("OWins").textContent.split(":")[1]);
      isBoolean = false; // Disable further moves when it's a draw
      return;
    }

    // Toggle the current player for the next turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    console.log("Invalid ID");
  }
};
const WinLossLogic = (player) => {
  // Check rows, columns, and diagonals for a win
  for (let i = 0; i < 3; i++) {
    if (
      GameBoard[i][0] === player &&
      GameBoard[i][1] === player &&
      GameBoard[i][2] === player
    )
      return true; // Check rows
    if (
      GameBoard[0][i] === player &&
      GameBoard[1][i] === player &&
      GameBoard[2][i] === player
    )
      return true; // Check columns
  }

  // Check diagonals
  if (
    GameBoard[0][0] === player &&
    GameBoard[1][1] === player &&
    GameBoard[2][2] === player
  )
    return true;
  if (
    GameBoard[0][2] === player &&
    GameBoard[1][1] === player &&
    GameBoard[2][0] === player
  )
    return true;

  return false;
};

const isDraw = () => {
  // Check if all cells are filled and no one has won
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (GameBoard[i][j] === "") return false;
    }
  }
  return true;
};

const GetDataCell = () => {
  let DataCell = document.querySelectorAll("td");
  DataCell.forEach((DataCell) => {
    DataCell.addEventListener("click", () => {
      let id = DataCell.id;
      console.log("id: ", id);
      AddMove(id);
    });
  });
};

const ResetGame = () => {
  // Reset the game board
  GameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // Reset the visual representation of the board
  let DataCell = document.querySelectorAll("td");
  DataCell.forEach((DataCell) => {
    DataCell.textContent = "";
  });

  // Reset the current player
  currentPlayer = "X";

  // Enable moves
  isBoolean = true;
};

setTimeout(GetDataCell(), 1000);
