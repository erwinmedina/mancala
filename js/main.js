/*----- constants -----*/
let player1RGB = "#0d6efd";
let player2RGB = "#dc3545";

/*----- app's state (variables) -----*/
let winner, board, turn, stones;

let scores = {
    "1" : 0,
    "-1": 0
}

/*----- cached element references -----*/
const containers        = [...document.querySelectorAll(".mainContainer div")];
const boardElement      = document.querySelector(".board");
const playerTurnShadow  = document.getElementById("mainC");
const p1scoreBoard      = document.querySelector(".player1score");
const p2scoreBoard      = document.querySelector(".player2score");
const p1score           = document.getElementById('p1score');
const p2score           = document.getElementById('p2score');
const resetButton       = document.querySelector(".reset");
const message           = document.querySelector(".message");
const header            = document.querySelector("header");
const p1color           = document.getElementById("p1color");
const p2color           = document.getElementById("p2color");
const sidebar           = document.querySelector(".aside");
initialize();


/*----- event listeners -----*/
for (var i = 1; i < containers.length-1; i++) {
        containers[i].addEventListener('click', handleClick);
    }
resetButton.addEventListener("click", reset);

/*----- functions -----*/
function handleClick(event) {
    const containersIndex = event.target.getAttribute('id');

    // Prevents clicking if: winner, opposite end of board, empty board //
    if (winner || (turn ===  1 && containersIndex > 6) || board[containersIndex] === 0) return;
    if (winner || (turn === -1 && containersIndex < 6) || board[containersIndex] === 0) return;

    stones = board[containersIndex];
    board[containersIndex] = 0;
    distributeStones(containersIndex, stones);
}

function initialize() {
    board   = [4,4,4,4,4,4,0, 4,4,4,4,4,4,0];
    turn    = 1;
    winner  = null;

    currentScore(); 
    render();
}

function render() {
    // Updates the board //
    board.forEach(function(containerValue, index) {
        const cell      = document.getElementById(index);
        cell.innerHTML  = containerValue;
    })
    
    p1score.innerHTML = scores[1];
    p2score.innerHTML = scores[-1];  
    p1scoreBoard.style.backgroundColor  = player1RGB;
    p2scoreBoard.style.backgroundColor  = player2RGB;
    playerTurnShadow.style.border       = "black solid 3px";
    playerTurnShadow.style.boxShadow    = (turn === 1 ? `0 35px 10px 0px ${player1RGB}` : `0px -35px 10px 0px ${player2RGB}`);
    resetButton.style.visibility        = winner ? 'visible' : 'hidden';

    if (winner) {
        styleWinner();
        displayMessage();
    }
}

function distributeStones(containersIndex, stones) {
    
    newIndex = parseInt(containersIndex) + 1;
    
    // Handles if you end on your store //
    if ((stones === 0) && (newIndex === 7 || newIndex === 14)) turn *= -1;
 
    // Handles Distribution //
    newIndex = ((newIndex) % 14);

    if (turn ===  1 && newIndex === 13) newIndex = 0;
    if (turn === -1 && newIndex === 6)  newIndex = 7;

    // Handles P1 if they end in an empty spot on their side of the board //
    if (stones-1 === 0 && board[newIndex] === 0 && newIndex <= 5 && newIndex >= 0 && turn === 1) {
        
        board[6] += board[12 - newIndex];
        board[6] += 1;
        board[12 - newIndex] = 0;
        board[newIndex] = 0;
        highlight(newIndex);
        highlight(6);
        highlight(12-newIndex);
        currentScore();
        winner = getWinner();
        render();
        return;
    }
    // Handles P2 if they end in an empty spot on their side of the board //
    if (stones-1 === 0 && board[newIndex] === 0 && newIndex <= 12 && newIndex >= 7 && turn === -1) {
        
        board[13] += board[12 - newIndex];
        board[13] += 1;
        board[12 - newIndex] = 0;
        board[newIndex] = 0;
        highlight(newIndex);
        highlight(13);
        highlight(12-newIndex);
        currentScore(); 
        winner = getWinner();
        render();
        return;
    }

    if (stones === 0) {
        turn *= -1; 
        currentScore(); 
        winner = getWinner();
        render();
        headerFlash(header);
        return;
        };

    highlight(newIndex);
    board[newIndex] += 1;
    stones--;
    render();

    return setTimeout(function() {distributeStones(newIndex, stones)}, 300);
}

function highlight(newIndex) {
    const cell = document.getElementById(newIndex);
    cell.style.borderColor      = "rgba(255,255,255, .5)"; 
    cell.style.backgroundColor  = "rgba(255,255,255, .5)";
    
    setTimeout(function() {
        cell.style.borderColor      = "rgba(0, 0, 0, 1)"; 
        cell.style.backgroundColor  = "#855e42b2";
    }, 500);
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

function currentScore() {
    scores[1]  = 0;
    scores[-1] = 0;
    
    for (let i = 0; i <= 13; i++) {
        if (i <= 6) {
            scores[1] += board[i]
        }
        else {scores[-1] += board[i]}
}
}

function reset() {
    message.innerHTML               = "";
    boardElement.style.opacity      = "1";
    p2scoreBoard.style.transform    = "scale(1)";
    p1scoreBoard.style.transform    = "scale(1)";
    sidebar.style.display           = "inline-block";

    initialize();
}

function displayMessage() {
        if (scores[1] > scores[-1]) {
            message.innerHTML = "PLAYER 1 WINS THE GAME";
        }
        else if (scores[1] < scores[-1]) {
            message.innerHTML = "PLAYER 2 WINS THE GAME";
        }
        else {
            message.innerHTML = "THE GAME IS TIED";
        }
}

// HELP BUTTON //
$(function () {
    var image = '<img src="https://i.imgur.com/mIof2YM.png" width="700" height="500">'
    $('#help').popover({
        title:      "Instructions",
        container:  "body",
        placement:  'auto',
        trigger:    'hover',
        html:       true,
        content:    image,
    });
});

function headerFlash(header) {
    header.style.color = "rgba(255,255,255, 0.2)";
    setTimeout(function() {
        header.style.color = "white";
    }, 500);
}

p1color.onchange = function() {
    player1RGB = this.value;
    render();
}
p2color.onchange = function() {
    player2RGB = this.value;
    render();
}

function styleWinner() {
    sidebar.style.display = "none";

    if (scores[1] > scores[-1]) {
        boardElement.style.opacity          = "0.4";
        p2scoreBoard.style.transform        = "scale(0.7)"; 
        playerTurnShadow.style.boxShadow    = "0 0 0 0"; 
        p1scoreBoard.style.transform        = "scale(1.5)";
        p1scoreBoard.style.zIndex           = "12";
        
    }
    else if (scores[1] < scores[-1]) {
        boardElement.style.opacity          = "0.4";
        p1scoreBoard.style.transform        = "scale(0.7)"; 
        playerTurnShadow.style.boxShadow    = "0 0 0 0";  
        p2scoreBoard.style.transform        = "scale(1.5)";
        p2scoreBoard.style.zIndex           = "12";      
    }
    else {
        boardElement.style.opacity          = "0.4";
        playerTurnShadow.style.boxShadow    = "0 0 0 0";        
    }
}

