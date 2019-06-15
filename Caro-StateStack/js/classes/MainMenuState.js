// var MainMenuState = function () {
//     this.name = "MainMenuState";

//     var canvas = getCanvas(),
//         dimensions = getGameDimensions();

//     this.onEnter = function(){};
//     this.onExit  = function(){};

//     this.update = function (){
//             // update values
//     };

//     this.render = function (){
//             // redraw
//     };
// };

var MainMenuState = function () {
    this.name = "MainMenuState";

    var canvas = getCanvas(),
        dimensions = getGameDimensions(),
        backgroundColor = "#000",
        textColor = "rgb(0,0,0)", // Starts with black
        colorsArray = [], // our fade values
        colorIndex = 0;

    this.onEnter = function(){
        var i = 1,l=100,values = [];
        for(;i<=l;i++){
            values.push(Math.round(Math.sin(Math.PI*i/100)*255));
        }
        colorsArray = values;

        // When the Enter key is pressed go to the next state
        window.onkeydown = function (e) {
            var keyCode = e.keyCode;
            if (keyCode === 13){
                // Go to next State
                var gameMode = getGameInstance();
                gameMode.push(new Level1State());
                /** Note that this does not remove the current state
                 *  from the list. it just adds Level1State on top of it.
                 */
            }
        };
    };

    this.onExit  = function(){
        // clear the keydown event
        window.onkeydown = null;
    };

    this.update = function (){
        // update values
        if (colorIndex == colorsArray.length){
            colorIndex = 0;
        }
        textColor = "rgb("+colorsArray[colorIndex]+","+colorsArray[colorIndex]+","+colorsArray[colorIndex]+")";
        colorIndex++;
    };

    this.render = function (){
        // redraw
        canvas.clearRect(0,0,dimensions.width,dimensions.height)
        canvas.beginPath();
        canvas.fillStyle = backgroundColor;
        canvas.fillColor = backgroundColor;
        canvas.fillRect(0,0,dimensions.width,dimensions.height);
        canvas.fillStyle = textColor;
        canvas.font = "24pt Courier";
        canvas.fillText(mainText, 120, 100);
    };
};

export default MainMenuState;