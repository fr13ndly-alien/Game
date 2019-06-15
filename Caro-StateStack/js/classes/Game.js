import {StateList, StateStack} from './setup.js';
import Caro from './Caro.js';
import StartStack from './StartState.js';
import GameBoard from './GameBoard.js';

var Game = {
    // Canvas to draw on
    canvas_width:   500,
    canvas_height:  500,
    canvasElement:  null,
    canvas :        null,
    // The game loop
    FPS: 30,
    timer:null,
    timerID: null, // interval

    gameLogic: new Caro(),
    gameBoard: new GameBoard(),
    gameMode: new StateStack(),

    update: function () {
        this.gameMode.update();
        this.gameMode.render();
    },

    startGame: function() {
        this.gameMode.push(new StartStack());
        this.timerID = setInterval(this.update.bind(this),this.timer);

    },

    pauseGame:function (){
        clearInterval(this.timerID);
    },

    resumeGame: function (){
        this.timerID = setInterval(this.update.bind(this),this.timer);
    },

    /**
     * Initialize the canvas to the page
     */
    setupCanvas: function () {
        this.canvasElement = document.getElementById('myCaro')
        this.canvasElement.width = this.canvas_width;
        this.canvasElement.height = this.canvas_height;
        this.canvas = this.canvasElement.getContext("2d");
        this.gameBoard.drawBoard(this.canvas, 10, "#ddd");
    },

    init: function () {
        this.setupCanvas();
        this.timer = 1000/this.FPS;
        this.startGame();
    },
}

export {Game};