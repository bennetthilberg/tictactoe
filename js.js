let gameBoard = document.querySelector('.gameBoard');
gameBoard.spaces = document.getElementsByClassName('space');
let startButton = document.querySelector('.startButton');

startButton.addEventListener('click', () => startGame())

const playerFactory = (username, isTurn, marker) => {
    return {username, isTurn, marker};
};

let gameActive = false;
function startGame(){
    console.log('startGame run');
    player0.isTurn = true;
    gameActive = true;
}
function spaceClicked(space){
    console.log(`space ${space.id} was pressed`);
    if(gameActive){
        if(player0.isTurn){
            space.textContent = `${player0.marker}`;
        }
        else if(player1.isTurn){
            space.textContent = `${player1.marker}`;
        }
        player0.isTurn = !player0.isTurn;
        player1.isTurn = !player1.isTurn;
    }
    
}

let player0 = playerFactory('john', false, 'X');
let player1 = playerFactory('bob', false, 'O');

let spaceIterator = 0;
for(const space of gameBoard.spaces){
    space.id = spaceIterator;
    space.addEventListener('click', () => spaceClicked(space));
    spaceIterator++;
}
