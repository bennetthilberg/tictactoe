let gameBoard = document.querySelector('.gameBoard');
gameBoard.spaces = document.getElementsByClassName('space');
let startButton = document.querySelector('.startButton');

startButton.addEventListener('click', () => startGame())

const playerFactory = (username, isTurn, marker, playerSpaces) => {
    playerSpaces = [];
    return {username, isTurn, marker, playerSpaces};
};

let gameActive = false;
function startGame(){
    console.log('startGame run');
    resetEverything();
    player0.isTurn = true;
    gameActive = true;
}
function spaceClicked(space){
    console.log(`space ${space.id} was pressed`);
    if(gameActive){
        if(player0.isTurn && !space.taken){
            space.textContent = `${player0.marker}`;
            space.taken = true;
            player0.playerSpaces.push(space);
            player0.isTurn = !player0.isTurn;
            player1.isTurn = !player1.isTurn;
            checkGameStatus();
        }
        else if(player1.isTurn && !space.taken){
            space.textContent = `${player1.marker}`;
            space.taken = true;
            player1.playerSpaces.push(space);
            player0.isTurn = !player0.isTurn;
            player1.isTurn = !player1.isTurn;
            checkGameStatus();
        }
        
    }
    
}
function checkGameStatus(){
    // check for tie
    if (Array.from(gameBoard.spaces).every(space => space.taken === true)) {
        alert('tie!');
        gameActive = false;
        return;
    }
    checkForWins(player0);
    checkForWins(player1);
    return;
}
const winningSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function containsAll(array1, array2) {
    return array1.every(item => array2.includes(item));
  }
  
function checkForWins(player){
    let checkableSpaces = [];
    for(const space of player.playerSpaces){
        checkableSpaces.push(`${space.id}`)
    }
    for(const winningSet of winningSets){
        if (containsAll([`${winningSet[0]}`, `${winningSet[1]}`, `${winningSet[2]}`], checkableSpaces)){
            console.log(`${player.username} wins!`);
        }
        else{continue};
    }
    return;
}
function resetEverything(){
    console.log('resetEverything run')
    gameBoard.offsetHeight; // fuck da cache
    for(const space of gameBoard.spaces){
        space.textContent = '';
        space.taken = false;
    }
    player0.playerSpaces = [];
    player1.playerSpaces = [];
}

let player0 = playerFactory('john', false, 'X');
let player1 = playerFactory('bob', false, 'O');

let spaceIterator = 0;
for(const space of gameBoard.spaces){
    space.id = spaceIterator;
    space.taken = false;
    space.addEventListener('click', () => spaceClicked(space));
    spaceIterator++;
}
