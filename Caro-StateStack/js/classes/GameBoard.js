var canvasSize= 500;
var section= 10;
var sectionSize= canvasSize/section;
var lineColoer= "#ddd";

var GameBoard = function() {
    

    this.drawX = function(context, xCordinate, yCordinate) {
        context.strokeStyle = "#f1be32";

        context.beginPath();

        var offset = 5;
        context.moveTo(xCordinate + offset, yCordinate + offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

        context.moveTo(xCordinate + offset, yCordinate +sectionSize - offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

        context.stroke();
    };

    this.drawO = function(context, xCordinate, yCordinate) {		
        var halfSectionSize = (0.5 * sectionSize);
        var centerX = xCordinate + halfSectionSize;
        var centerY = yCordinate + halfSectionSize;
        var radius = (sectionSize -15) / 2;
        var startAngle = 0 * Math.PI;
        var endAngle = 2 * Math.PI;

        context.lineWidth = 10;
        context.strokeStyle = "#01bBC2";
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.stroke();
    };

    this.drawBoard = function(ctx, lineWidth, strokeStyle) {
        var lineStart = 4;
        var lineLenght = canvasSize - 5;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();

        /*
        * Horizontal lines 
        */
        for (var y = 1; y <= section - 1; y++) {
            ctx.moveTo(lineStart, y * sectionSize);
            ctx.lineTo(lineLenght, y * sectionSize);
        }

        /*
        * Vertical lines 
        */
        for (var x = 1; x <= section - 1; x++) {
            ctx.moveTo(x * sectionSize, lineStart);
            ctx.lineTo(x * sectionSize, lineLenght);
        }
        ctx.stroke();
    }
}

export default GameBoard;