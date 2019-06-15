// game state            
var winningCase = [];
var gamePane = [];
var painted = [];
var canvasID = 'myCanvas';
var turn = 0;

// prepare Game
window.onload = function() {
    let canvasID = 'myCanvas';
    for(let i=0; i<9; i++){
        let c = document.getElementById(canvasID+i);
        let ctx = c.getContext('2d');
        ctx.fillStyle = "#66ffff";
        ctx.fillRect(0, 0, 80, 80);
        ctx.stroke();
    }
    // prepair arrays
    winningCase = [ [0,1,2],
                    [3,4,5], 
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]];
    for (let i=0; i<9; i++){
        painted[i] = false;
        gamePane[i] = '';
    }                
}            

// Canvas element click button
function canvasClicked(pos){
    let c = document.getElementById(canvasID+ pos);
    let cxt = c.getContext('2d');
    if (painted[pos] === false) {
        if(turn%2 == 0 && !painted[pos]) {  // Draw X
            cxt.beginPath();
            cxt.lineWidth = '5';
            cxt.strokeStyle = "Red"
            cxt.moveTo(10,10);
            cxt.lineTo(70,70);
            cxt.moveTo(70,10);
            cxt.lineTo(10,70);
            cxt.stroke();
            cxt.closePath();

            gamePane[pos] = 'X';
            checkWinning();
            turn ++;
        }                               // Draw O
        else {                          
            cxt.beginPath();
            cxt.lineWidth = '5';
            cxt.arc(40,40,30,0,Math.PI*2,true);
            cxt.stroke();
            cxt.closePath();

            gamePane[pos] = 'O';
            checkWinning();
            turn ++;
        } 
        painted[pos] = true;
    }else alert('THIS CELL ALREADY CHOOSED!');

    if(turn == 9){
        alert ("GAME OVER!\nStart new game"); 
        playAgain();
    }    
}

function checkWinning(){
    let sign = (turn%2 == 0)?'X':'O';
    for(let i = 0; i< winningCase.length; i++){
        if( gamePane[winningCase[i][0]]=== sign &&
            gamePane[winningCase[i][1]]=== sign &&
            gamePane[winningCase[i][2]]=== sign)
        {
            alert('Player: '+ sign+ ' WIN');
        }
    }
}

function playAgain(){location.reload()};

