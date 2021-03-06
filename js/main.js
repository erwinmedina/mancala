/*----- constants -----*/
/*----- app's state (variables) -----*/
let scores, winner, results, board, turn, stones;

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

        // Prevents activating an empty container //
        if (winner || !board[containersIndex]) return;

        // BOARD[CONTAINERINDEX] = STONES //
        // CONTAINERSINDEX = INDEX VALUE //

        let newIndex;
        for (var i = 1; i <= board[containersIndex]; i++) {
            
            newIndex = ((containersIndex+i) % 14);
            
            if ((newIndex <= 13) && (newIndex > 6)) {
                board[newIndex] += 1;
            }

            else if ((newIndex >= 0) && (newIndex < 6)) {
                    board[6 - newIndex] += 1;
            }

            else {
                board[newIndex+1] += 1;
            }

            }
        }


        // while (stones) {
        //     // move shit to the right //
        //     board[containersIndex] += 1;
        //     stones--;
        // }
        
        
        
        //console.log(board[containersIndex]);    // Tells me value inside
        //console.log(containersIndex);           // Give me index of clicked box.
        
        // Iterates through how many stones are in container that was clicked //
        // And deposits 1 in each, moving counter-clockwise                   //
        // for (var i = 1; i <= board[containersIndex]; i++) {
        //     board[containersIndex + i] += 1;    
        // }
        board[containersIndex] = 0;             // Value inside container = 0
        console.log(board);


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
