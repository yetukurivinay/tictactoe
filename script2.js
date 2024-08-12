
// script.js
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
const celebration = document.getElementById('celebration');
const fireworks = document.getElementById('fireworks');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] || !isGameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        celebration.style.display = 'block';
        fireworks.style.display = 'block';
        generateFireworks(30); // Generate fireworks for 30 seconds

        cells.forEach(cell => {
            if (cell.classList.contains(currentPlayer.toLowerCase())) {
                cell.classList.add('dancing'); // Apply dancing animation
                // cell.classList.add('rotating'); // Uncomment this line for rotating effect
            }
        });

        celebration.textContent = `${currentPlayer} wins! 🎉🎉🎉`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        celebration.style.display = 'block';
        celebration.textContent = 'It\'s a draw! 🎉';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function restartGame() {
    gameState = Array(9).fill(null);
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'dancing', 'rotating');
    });
    celebration.style.display = 'none';
    fireworks.style.display = 'none';
    fireworks.innerHTML = ''; // Ensure all fireworks are removed
}

function generateFireworks(durationInSeconds) {
    const endTime = Date.now() + durationInSeconds * 1000;
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.width = `${Math.random() * 50 + 20}px`;
        firework.style.height = firework.style.width;
        firework.style.top = `${Math.random() * 100}vh`;
        firework.style.left = `${Math.random() * 100}vw`;
        fireworks.appendChild(firework);

        setTimeout(() => {
            firework.remove();
        }, 2000); // Firework stays visible for 2 seconds
    }

    const intervalId = setInterval(() => {
        if (Date.now() >= endTime) {
            clearInterval(intervalId);
            return;
        }
        createFirework();
    }, 200); // Create a firework every 200 milliseconds for a more dynamic effect
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);