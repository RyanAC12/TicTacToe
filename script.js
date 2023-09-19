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

// Initialize Players, Moves, and Game State
const PlayerX = Player('', 'X');
const PlayerO = Player('', 'O');
let currentPlayer = PlayerX;
let moveCounter = 0;
let gameState = "running";

// Game object
const game = (() => {

// Function to render board
function renderBoard() {
    const gameboardDiv = document.querySelector('.gameboard');
    gameboardDiv.innerHTML = '';
    gameBoard.board.forEach((cell, index) => {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.textContent = cell;

        squareDiv.addEventListener('click', () => {
            if (PlayerX.name == '' || PlayerO.name == '') {
                alert('Please enter player names first!');
            }
            else {
            currentPlayer.move(index);
            }
        });

        gameboardDiv.appendChild(squareDiv);
    });
}

// Function to update the board display
function updateBoard(index, symbol) {
    const squares = document.querySelectorAll('.square');
    squares[index].textContent = symbol;
    moveCounter++;
    game.checkForGameOver(symbol);
}

    

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
                winnerText.textContent = `${currentPlayer.name} wins!`;
                winnerDialog.style.display = 'flex';
                winnerDialog.showModal();
                gameState = "over";
            }
    })
    if (moveCounter > 8 && gameState !== "over") {
        console.log('It\'s a tie!');
        winnerText.textContent = 'It\'s a tie!';
        winnerDialog.style.display = 'flex';
        winnerDialog.showModal();
        gameState = "over";
    }
}

function resetGame() {
    PlayerX.name = '';
    PlayerO.name = '';
    currentPlayer = PlayerX;
    moveCounter = 0;
    gameState = "running";
    winnerText.textContent = '';
    winnerDialog.style.display = 'none';
    player1InputBtn.style.display = 'block';
    player1InputValue.style.display = 'block';
    player1NameDisplay.textContent = '';
    player1NameDisplay.style.display = 'none';
    player2InputBtn.style.display = 'block';
    player2InputValue.style.display = 'block';
    player2NameDisplay.textContent = '';
    player2NameDisplay.style.display = 'none';
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    winnerDialog.close();
    renderBoard();
}
    
return { 
    checkForGameOver, 
    updateBoard,
    renderBoard,
    resetGame
    }

})();  

// DOM Elements & Event Listeners
const winnerDialog = document.getElementById('displaywinner');
const winnerText = document.getElementById('winnertext');
const playAgainBtn = document.getElementById('playagain');
playAgainBtn.addEventListener('click', game.resetGame);

const player1InputBtn = document.getElementById('1submit');
const player1InputValue = document.getElementById('player1');
const player1NameDisplay = document.getElementById('player1name');

player1InputBtn.addEventListener('click', () => {
    if (player1InputValue.value == '') {
        alert('Please enter a name!');
    }
    else if (PlayerX.name == '') {
        PlayerX.name = player1InputValue.value;
        player1InputValue.value = '';
        // Hide input and button
        player1InputBtn.style.display = 'none';
        player1InputValue.style.display = 'none';
        // Display player name
        player1NameDisplay.textContent = PlayerX.name;
        player1NameDisplay.style.display = 'block';
    }
    else {
        alert(`Player 1 already has a name!`)
    }
});

const player2InputBtn = document.getElementById('2submit');
const player2InputValue = document.getElementById('player2');
const player2NameDisplay = document.getElementById('player2name');

player2InputBtn.addEventListener('click', () => {
    if (player2InputValue.value == '') {
        alert('Please enter a name!');
    }
    else if (PlayerO.name == '') {
        PlayerO.name = player2InputValue.value;
        player2InputValue.value = '';
        // Hide input and button
        player2InputBtn.style.display = 'none';
        player2InputValue.style.display = 'none';
        // Display player name
        player2NameDisplay.textContent = PlayerO.name;
        player2NameDisplay.style.display = 'block';
    }
    else {
        alert(`Player 2 already has a name!`)
    }
});

// Initialize gameboard
game.renderBoard();