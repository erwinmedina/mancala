/*----- constants -----*/
/*----- app's state (variables) -----*/
let winner, results, board, turn, stones;

let scores = {
    "1": 0,
    "-1": 0
}

/*----- cached element references -----*/
const containers        = [...document.querySelectorAll(".mainContainer div")];
const boardElement      = document.querySelector(".board");
const playerTurnShadow  = document.getElementById("mainC");
const p1scoreBoard      = document.querySelector(".player1score");
const p2scoreBoard      = document.querySelector(".player2score");
const player1           = document.getElementById('player1');
const player2           = document.getElementById('player2');
const resetButton       = document.querySelector(".reset");
const message           = document.querySelector(".message");
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
    if (winner || (turn === 1 && containersIndex > 6) || board[containersIndex] === 0) return;
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
    // board = [0,1,0,0,0,1,15, 0,0,1,0,0,1,18]; // TEST BOARD 1 
    // board = [0,1,0,0,1,1,25, 0,0,1,0,0,1,21]; // TEST BOARD 1 
    // board = [0,4,4,4,4,4,0, 4,4,4,4,4,49,0]; // TEST BOARD 2
    turn = 1;
    winner = null;

    currentScore();
    render();
}

function render() {
    // Updates the board //
    board.forEach(function(containerValue, index) {
        const cell = document.getElementById(index);
        // cell.innerHTML = containerValue;
        player1.innerHTML = scores[1];
        player2.innerHTML = scores[-1];  
    })

    resetButton.style.visibility = winner ? 'visible' : 'hidden';

    playerTurnShadow.style.border = "black solid 3px";
    if (turn === 1) {
        playerTurnShadow.style.boxShadow = "0 35px 10px 0px #0d6efd";        
    }
    else {
        playerTurnShadow.style.boxShadow = "0px -35px 10px 0px #dc3545";
    }

    if (winner) {
        if (scores[1] > scores[-1]) {
            boardElement.style.opacity = "0.4";
            p2scoreBoard.style.transform = "scale(0.7)"; 
            playerTurnShadow.style.boxShadow = "0 0 0 0"; 
            p1scoreBoard.style.position = "fixed";
            p1scoreBoard.style.top = "50%";
            p1scoreBoard.style.right = "50%";
            p1scoreBoard.style.transform = "scale(1.5) translate(520px, 10px)";
            p1scoreBoard.style.zIndex = "12";
            
        }
        else if (scores[1] < scores[-1]) {
            boardElement.style.opacity = "0.4";
            p1scoreBoard.style.transform = "scale(0.7)"; 
            playerTurnShadow.style.boxShadow = "0 0 0 0";  
            p2scoreBoard.style.position = "fixed";
            p2scoreBoard.style.top = "50%";
            p2scoreBoard.style.right = "50%";
            p2scoreBoard.style.transform = "scale(1.5) translate(520px, 10px)";
            p2scoreBoard.style.zIndex = "12";      
        }
        else {
            boardElement.style.opacity = "0.4";
            playerTurnShadow.style.boxShadow = "0 0 0 0";        
        }
    }

    displayMessage();
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

function reset() {
    boardElement.style.opacity = "1";
    p2scoreBoard.style.transform = "scale(1) translate(0vw, 0%)";
    p1scoreBoard.style.transform = "scale(1) translate(0vw, 0%)";
    p1scoreBoard.style.position = "static";
    p2scoreBoard.style.position = "static";

    initialize();
}

function displayMessage() {
    if (winner) {
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
    else {
        message.innerHTML = "";
    }
}

// function replaceNumWithImage(cell) {
//     cell.outerHTML = 

// }

// function recursionFunction(func, times) {
//     func();
//     times && --times && replaceNumWithImage(func, times);
// }

// THIS SHOWS THE NUMBERS IN EACH CONTAINER UPON HOVER //
$(function () {
    $('.bcells').popover({
        placement: 'bottom',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="cCells popover-body"></div></div>',
        trigger: 'hover',
        content: function () {
            return (board[$(this).attr('id')]);
        },
    })

    $('.tcells, .shop').popover({
        placement: 'top',
        trigger: 'hover',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="cCells popover-body"></div></div>',
        content: function () {
            return (board[$(this).attr('id')]);
        }
    })
})

// HELP BUTTON //
$(function () {
    var image = '<img src="https://i.imgur.com/mIof2YM.png" width="700" height="500">'
    $('#help').popover({
        title: "Instructions",
        container: "body",
        placement: 'auto',
        trigger: 'hover',
        html: true,
        content: image,
    });
});