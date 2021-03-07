/*----- constants -----*/
/*----- app's state (variables) -----*/
let winner, results, board, turn, stones;

let scores = {
    "1": 0,
    "-1": 0
}

/*----- cached element references -----*/
const containers = [...document.querySelectorAll(".mainContainer div")];
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
    

    if (winner || (turn === 1 && containersIndex > 7)) return;
    if (winner || (turn === -1 && containersIndex < 6)) return;

    newIndex = parseInt(containersIndex)+1;
    stones = board[containersIndex];
    board[containersIndex] = 0;

    while(stones) {
        
        newIndex = ((newIndex) % 14);
        if (turn === 1 && newIndex === 13) {newIndex = 0};
        if (turn === -1 && newIndex === 6) {newIndex = 7};

        board[newIndex] += 1;
        newIndex += 1;
        stones--;
    }

    winner = getWinner();
    currentScore()
    render();
    turn*=-1;

}

function initialize() {
    // [13 - 12 - 11 - 10 - 09 - 08 - 07 - 06] //
    // [13 - 00 - 01 - 02 - 03 - 04 - 05 - 06] //
    board = [0,0,0,0,0,4,0, 4,4,4,4,4,4,0];
    turn = 1;
    winner = null;

    currentScore()
    render();
}

function render() {
    board.forEach(function(containerValue, index) {
        const cell = document.getElementById(index);
        cell.innerHTML = containerValue;
        player1.innerHTML = scores[1];
        player2.innerHTML = scores[-1];  
    })
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


function getWinner() {
    let player1SideZero = 0;
    let player2SideZero = 0;

    for (let i = 0; i <= 5; i++) {
        player1SideZero += board[i];
    }
    for (let i = 7; i <= 12; i++) {
        player2SideZero += board[i];
    }

    console.log("S1 " + player1SideZero);
    console.log("S2 " + player2SideZero);
    if ((player1SideZero || player2SideZero) === 0) {
        winner = true;
    }
    return winner;
}