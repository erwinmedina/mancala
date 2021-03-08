/*----- constants -----*/
/*----- app's state (variables) -----*/
let winner, results, board, turn, stones;


let scores = {
    "1": 0,
    "-1": 0
}

/*----- cached element references -----*/
const containers = [...document.querySelectorAll(".mainContainer div")];
const borderB = document.getElementById("mainC");
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

initialize();


/*----- event listeners -----*/
for (var i = 1; i < containers.length-1; i++) {
        containers[i].addEventListener('click', handleClick);
    }

/*----- functions -----*/
function handleClick(event) {
    const containersIndex = event.target.getAttribute('id');

    // Prevents clicking if: winner, opposite end of board, empty board //
    if (winner || (turn === 1 && containersIndex > 7) || board[containersIndex] === 0) return;
    if (winner || (turn === -1 && containersIndex < 6) || board[containersIndex] === 0) return;

    distributeStones(containersIndex);
    winner = getWinner();
    currentScore();
    turn *= -1;
    render();

}

function initialize() {
    // [13 - 12 - 11 - 10 - 09 - 08 - 07 - 06] //
    // [13 - 00 - 01 - 02 - 03 - 04 - 05 - 06] //
    board = [4,4,4,4,4,4,0, 4,4,4,4,4,4,0];
    // board = [4,0,0,0,0,2,0, 1,0,3,0,0,0,0]; // TEST BOARD 1 
    // board = [0,4,4,4,4,4,0, 4,4,4,4,4,49,0]; // TEST BOARD 2
    turn = 1;
    winner = null;

    currentScore();
    render();
}

function render() {
    board.forEach(function(containerValue, index) {
        const cell = document.getElementById(index);
        cell.innerHTML = containerValue;
        player1.innerHTML = scores[1];
        player2.innerHTML = scores[-1];  
    })

    borderB.style.border = "black solid 3px";
    if (turn === 1) {
        borderB.style.boxShadow = "0 35px 10px 0px #dc3545";        
    }
    else {
        borderB.style.boxShadow = "0px -35px 10px 0px #f8f9fa";
    }
}

function currentScore() {
    
    let player1Sum = 0;
    let player2Sum = 0;
    for (let i = 0; i <= 13; i++) {
        if (i <= 6) {
            player1Sum += board[i]}
        else {
            player2Sum += board[i]}
    }
    
    scores[1] = player1Sum;
    scores[-1] = player2Sum;
}


function distributeStones(containersIndex) {
    
    newIndex = parseInt(containersIndex)+1;
    stones = board[containersIndex];
    board[containersIndex] = 0;
    
    // Handles Distribution //
    while(stones) {
        
        newIndex = ((newIndex) % 14);
        if (turn === 1 && newIndex === 13) {newIndex = 0};
        if (turn === -1 && newIndex === 6) {newIndex = 7};
        

        // Handles P1 if they end in an empty spot on their side of the board //
        if (stones-1 === 0 && board[newIndex] === 0 && newIndex <= 5 && newIndex >= 0 && turn === 1) {
            
            board[6] += board[12 - newIndex];
            board[6] += 1;
            board[12 - newIndex] = 0;
            board[newIndex] = 0;
            turn *= -1;
            return;
        }
        // Handles P2 if they end in an empty spot on their side of the board //
        if (stones-1 === 0 && board[newIndex] === 0 && newIndex <= 12 && newIndex >= 7 && turn === -1) {
            
            board[13] += board[12 - newIndex];
            board[13] += 1;
            board[12 - newIndex] = 0;
            board[newIndex] = 0;
            turn *= -1;
            return;
        }

        board[newIndex] += 1;
        newIndex += 1;
        stones--;
    }
    
    // Handles if you end on your store //
    if (newIndex === 7 || newIndex === 14) turn *= -1;
}

function getWinner() {
    let player1SideZero = 0;
    let player2SideZero = 0;

    for (let i = 0; i <= 5; i++) {
        player1SideZero += board[i];
    }
    for (let i = 7; i <= 12; i++) {
        player2SideZero += board[i];
    }
    
    if (player1SideZero === 0 || player2SideZero === 0) {
        winner = true;
    }
    return winner;
}