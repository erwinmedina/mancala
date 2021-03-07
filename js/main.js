/*----- constants -----*/
/*----- app's state (variables) -----*/
let scores, winner, results, board, turn, stones;

/*----- cached element references -----*/
const containers = [...document.querySelectorAll(".mainContainer div")];
initialize();


/*----- event listeners -----*/
for (var i = 1; i < containers.length-1; i++) {
        containers[i].addEventListener('click', handleClick);
    }

/*----- functions -----*/
function handleClick(event) {
    const containersIndex = event.target.getAttribute('id');

    if (turn === 1 && containersIndex > 7) return;
    if (turn === -1 && containersIndex < 6) return;

    newIndex = parseInt(containersIndex)+1;
    stones = board[containersIndex];
    board[containersIndex] = 0;

    while(stones) {
        
        newIndex = ((newIndex) % 14);
        console.log(newIndex);
        if (turn === 1 && newIndex === 13) {newIndex = 0};
        if (turn === -1 && newIndex === 6) {newIndex = 7};

        board[newIndex] += 1;
        newIndex += 1;
        stones--;


    }
    console.log(board);
    render();
    turn*=-1;


}

function initialize() {
    // [13 - 12 - 11 - 10 - 09 - 08 - 07 - 06] //
    // [13 - 00 - 01 - 02 - 03 - 04 - 05 - 06] //
    board = [4,4,4,4,4,16,0, 4,4,4,4,4,14,0];
    turn = 1;
    winner = null;
    console.log(board);

    render();
}

function render() {
    // console.log(board);
    board.forEach(function(containerValue, index) {
        const cell = document.getElementById(index);
        cell.innerHTML = containerValue;
    })
}


