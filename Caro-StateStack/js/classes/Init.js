import Game from './Game.js';

window.onload = function () {
    window.getGameInstance = function () {
        return Game.gameMode;
    };

    window.getCanvas = function (){
        return Game.canvas;
    };

    window.getGameDimensions = function() {
        return {
            width: Game.canvas_width,
            height: Game.canvas_height
        };
    };

    window.pauseGame = function (){
        Game.gameMode.pause();
        Game.pauseGame();
    };

    window.resumeGame = function () {
        Game.resumeGame();
        Game.gameMode.resume();
    };

    window.getCanvasElement = function (){
        return Game.canvasElement;
    };

    Game.init();
};

