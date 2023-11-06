// criação de constante - o document.getelementbyid pega as informações do Id do html do nome no parenteses
const board = document.getElementById("board");
const result = document.getElementById("result");
const resetButton = document.getElementById("reset");

// criação de variáveis o let foi usado para declarar variável apenas dentro do bloco
let currentPlayer = "X";
let moves = 0;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Função para verificar o vencedor
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (moves === 9) {
        return "draw";
    }

    return null;
}

// Função para atualizar o tabuleiro
function updateBoard() {
    for (let i = 0; i < 9; i++) {
        const casa = document.createElement("div");
        casa.classList.add("casa");
        casa.dataset.index = i;
        casa.textContent = gameBoard[i];
        board.appendChild(casa);

        casa.addEventListener("click", () => {
            if (!casa.textContent && !result.textContent) {
                casa.textContent = currentPlayer;
                gameBoard[i] = currentPlayer;
                moves++;
                const winner = checkWinner();

                if (winner) {
                    if (winner === "draw") {
                        result.textContent = "Empate!";
                    } else {
                        result.textContent = `O jogador ${winner} venceu!`;
                    }
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    }
}

updateBoard();

resetButton.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    moves = 0;
    result.textContent = "";
    board.innerHTML = "";
    updateBoard();
});