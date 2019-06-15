import Caro from "./Caro.js";

var canvas = document.getElementById('myCaro');
var ctx = canvas.getContext("2d");
var caroGame;
var check =  false, isRender = false, isBoard = false;
var canvasMousePosition = null

var StartState = function() {
    this.name = 'Start State' ; // Just to identify the State
    this.update  = function (){
        //console.log('Start: update');
        if(check)
            if (caroGame.checkWinning() != 0){
                alert (`Player ${caroGame.checkWinning()} WON!`);
                check = false;
                this.onExit();
            }
            
    };

    this.render  = function (){
        //console.log('Start: render');
        if(isRender){
            check = caroGame.addPlayingPiece(ctx, canvasMousePosition);
            isRender = false;
        }            
    };

    this.onEnter = function (){
        console.log('Start: onEnter');
        // Iit Game logic, handler event
        initGameBoard();
        isBoard = true;
        canvas.addEventListener('mouseup', function (event) {     
            canvasMousePosition = getCanvasMousePosition(event);
            isRender = true;
        }.bind(this));        
    };

    this.onExit  = function (){
        console.log('Start: onExit');
        location.reload();
    };
}

// ====================== GAME UI ===================== \\

function  initGameBoard() {
    caroGame = new Caro();
}

function getCanvasMousePosition (event) {
    var rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

export default StartState;