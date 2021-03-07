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
    if (turn === 1) {

        // Prevents: winner, empty container, opponents side //
        if (winner || !board[containersIndex] || containersIndex < 7) return;

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
        board[containersIndex] = 0;             // Value inside container = 0
    }


    // PLAYER 2'S TURN. IGNORES BOARD[7-12]
    else if (turn === -1) {
        // Prevents activating an empty container //
        if (winner || !board[containersIndex] || containersIndex > 6) return;

        // BOARD[CONTAINERINDEX] = STONES //
        // CONTAINERSINDEX = INDEX VALUE //

        let newIndex;
        counter = 7;
        for (var i = 1; i <= board[containersIndex]; i++) {
            newIndex = (((containersIndex - i) % 14) + 14) % 14;    
            
            if ((newIndex <= 6) && (newIndex >= 0)) {
                board[newIndex] += 1;
            }
            
            else if ((newIndex >= 7) && (newIndex < 13)) {
                board[newIndex - ((newIndex) - counter++)] += 1;
            }

            else {
                board[newIndex - counter++ + 1] += 1;
            }

        }
        board[containersIndex] = 0;             // Value inside container = 0
    }
    console.log(board);
}

function initialize() {
    // [00 - 01 - 02 - 03 - 04 - 05 - 06 - 13] //
    // [00 - 07 - 08 - 09 - 10 - 11 - 12 - 13] //
    board = [0,4,4,4,4,4,4, 4,4,4,4,4,4,0];
    turn = -1;
    winner = null;
    console.log(board);

    render();
}

function render() {

}
