/*----- constants -----*/
/*----- app's state (variables) -----*/
let scores, winner, results, board, turn;

/*----- cached element references -----*/
const containers = [...document.querySelectorAll(".mainContainer div")];
initialize()


/*----- event listeners -----*/
for (var i = 1; i < containers.length-1; i++) {
        containers[i].addEventListener('click', handleClick);
    }

/*----- functions -----*/
function handleClick(event) {
    const containersIndex = containers.indexOf(event.target);

    // PLAYER 1'S TURN. IGNORES BOARD[1-6] //
    if (turn === 1 && containersIndex > 6) {
        //console.log(board[containersIndex]);    // Tells me value inside
        //console.log(containersIndex);           // Give me index of clicked box.
        
        // Iterates through how many stones are in container that was clicked //
        // And deposits 1 in each, moving counter-clockwise                   //
        for (var i = 1; i <= board[containersIndex]; i++) {
            board[containersIndex + i] += 1;    
        }
        board[containersIndex] = 0;             // Value inside container = 0
        console.log(board);

    }

    // PLAYER 2'S TURN. IGNORES BOARD[7-12]
    if (turn === -1 && containersIndex <= 6) {
        // MAKES THE MOVE STUFF GOES IN HERE //
    }



}

function initialize() {
    // [00 - 01 - 02 - 03 - 04 - 05 - 06 - 13] //
    // [00 - 07 - 08 - 09 - 10 - 11 - 12 - 13] //
    board = [0,4,4,4,4,4,4, 4,4,4,4,4,4,0];
    turn = 1;
    winner = null;

    render();
}

function render() {

}
