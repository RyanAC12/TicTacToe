// Gameboard module
const gameBoard = (() => {
let board = ["", "", "", "", "", "", "", "", ""];

return { board };

})();

// Player factory
const Player = (name, symbol) => {
    const move = (index) => {
        if (gameBoard.board[index] === '') {
        gameBoard.board[index] = symbol;
        game.updateBoard(index, symbol);
        currentPlayer = (currentPlayer === PlayerX) ? PlayerO : PlayerX;
        }
        else {
            alert("A symbol has already been placed here!");
            return;
        }
    }

    return { name, move };
};

// Initialize Players
const PlayerX = Player('Player 1', 'X');
const PlayerO = Player('Player2', 'O');
let currentPlayer = PlayerX;

// Game object
const game = (() => {
    
    const checkForGameOver = (symbol) => {
        const winningConditions = [
        // Horizontal wins
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonal wins
        [0, 4, 8], [2, 4, 6]]
        
        winningConditions.forEach(condition => {
            if (gameBoard.board[condition[0]] === symbol
                && gameBoard.board[condition[1]] === symbol
                && gameBoard.board[condition[2]] === symbol) {
                    console.log(`${currentPlayer.name} wins!`);
                }
        })
    }

// Function to render board
function renderBoard() {
    const gameboardDiv = document.querySelector('.gameboard');
    gameBoard.board.forEach((cell, index) => {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.textContent = cell;

        squareDiv.addEventListener('click', () => {
            currentPlayer.move(index);
        });

        gameboardDiv.appendChild(squareDiv);
    });
}

// Function to update the board display
function updateBoard(index, symbol) {
const squares = document.querySelectorAll('.square');
squares[index].textContent = symbol;
game.checkForGameOver(symbol);
}

    return { 
        checkForGameOver, 
        updateBoard,
        renderBoard
    }
})();

// Initialize gameboard
game.renderBoard();