let gameBoard = document.querySelector('.gameBoard');
gameBoard.spaces = document.getElementsByClassName('space');
let startButton = document.querySelector('.startButton');

startButton.addEventListener('click', () => startGame())

const playerFactory = (username, isTurn, marker, playerSpaces) => {
    playerSpaces = [];
    return {username, isTurn, marker, playerSpaces: []};
};
let player0;
let player1;

let gameActive = false;
function startGame(){
    console.log('startGame run');
    checkInvalidPrefs();
    player0 = playerFactory(document.querySelector('#p0name').value, false, document.querySelector('#p0marker').value);
    player1 = playerFactory(document.querySelector('#p1name').value, false, document.querySelector('#p1marker').value);
    resetEverything();
    player0.isTurn = true;
    gameActive = true;
    correctOpacity()
}
function spaceClicked(space){
    correctOpacity()
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
    if (Array.from(gameBoard.spaces).every(space => space.taken === true)) {
        alert('Tie! Press (Re)start to play again!');
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
    correctOpacity()
    let checkableSpaces = [];
    for(const space of player.playerSpaces){
        checkableSpaces.push(`${space.id}`)
    }
    for(const winningSet of winningSets){
        if (containsAll([`${winningSet[0]}`, `${winningSet[1]}`, `${winningSet[2]}`], checkableSpaces)){
            alert(`${player.username} wins! Press (Re)start to play again!`);
            gameActive = false;
        }
        else{continue};
    }
    return;
}
function resetEverything(){
    console.log('resetEverything run')
    correctOpacity()
    for(const space of gameBoard.spaces){
        space.textContent = '';
        space.taken = false;
    }
    player0.playerSpaces = [];
    player1.playerSpaces = [];
    player0.isTurn = true;
    player1.isTurn = false;
    gameActive = true;
}

function correctOpacity(){
    if(gameActive){
        gameBoard.style.opacity = '1';
    }
    else{
        gameBoard.style.opacity = '0.15';
    }
}

/*
let player0 = playerFactory('john', false, 'X');
let player1 = playerFactory('bob', false, 'O');
*/
function checkInvalidPrefs(){
    if(
        !document.querySelector('#p0name').value ||
        !document.querySelector('#p0name').value ||
        !document.querySelector('#p0marker').value ||
        !document.querySelector('#p1marker').value
    ){
        alert('You forgot to input something!');
        location.reload();
    }
}
let spaceIterator = 0;
for(const space of gameBoard.spaces){
    space.id = spaceIterator;
    space.taken = false;
    space.addEventListener('click', () => spaceClicked(space));
    spaceIterator++;
}
