const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restart');
const winnerMessage = document.getElementById('winner-message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    gameBoard[cellIndex] = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        winnerMessage.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        winnerMessage.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    winnerMessage.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

function checkWin() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
