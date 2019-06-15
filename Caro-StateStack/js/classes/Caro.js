import GameBoard from './GameBoard.js';

class Caro {

	constructor() {
		this._board = [];
		this._player = 1;
		this._lineColor = "#ddd";
		this._section = 10;
		this._canvasSize = 500;
		this._sectionSize = this._canvasSize / this._section;
		this._gameBoard = new GameBoard();

		for(let i= 0; i< this._section; i++){
			this._board.push([]);
			for(let j =0; j< this._section; j++){
				this._board[i].push(0);				
			}			
		}
		this._x = null, this._y=null;
	}

	turn () {
		if (this._player === 1) {
			this._player = 2;
		} else {
			this._player = 1;
		}
	}

	checkWinning() {
		let count= 0;
		// check Horizon
		for(let i = 0; i< this._section; i++){
			if(this._board[i][this._y] == this._player)
				count++;
			else 
				if (count < 5)count = 0;
		}
		if(count >= 5) return this._player;
		//return this._player;
		
		// Check Vertical
		count = 0;
		for(let i = 0; i< this._section; i++){			
			if(this._board[this._x][i] == this._player)
				count++;
			else
				if(count < 5) count =0;
		}
		if(count >= 5) return this._player;
		
		// check right cross
		count = 0;
		let x = this._x, y = this._y;
		// lower right
		while (x<this._section && y<this._section){			
			if(this._board[x][y] === this._player){
				count ++;
			}else break;
			x++; y++;
		}
		// upper left
		x = this._x; y= this._y;
		count --;
		while (x>=0 && y>=0){			
			if(this._board[x][y] === this._player){
				count ++;
			}else break;
			x--; y--;
		}
		console.log(this._player + ': '+ count);
		if(count >= 5) return this._player;

		// Check left cross
		count = 0;
		// upper right
		x = this._x; y= this._y;
		while (x<this._section && y>=0){			
			if(this._board[x][y] === this._player){
				count ++;
			}else break;
			x++; y--;
		}
		// lower left
		x = this._x; y= this._y;
		count --;
		while (x>=0 && y<this._section){			
			if(this._board[x][y] === this._player){
				count ++;
			}else break;
			x--; y++;
		}
		console.log(this._player + ': '+ count);
		
		if(count >= 5) return this._player;

		return 0;
	}

	addPlayingPiece (ctx, mouse) {
		var xCordinate;
		var yCordinate;
		for (let x = 0;x < this._section;x++) {
	
			for (let y = 0;y < this._section;y++) {
				xCordinate = x * this._sectionSize;
				yCordinate = y * this._sectionSize;
	 
				if (
					mouse.x >= xCordinate && mouse.x <= xCordinate + this._sectionSize &&
					mouse.y >= yCordinate && mouse.y <= yCordinate + this._sectionSize
					) 
				{
					if(this._board[x][y] === 0){
						this.clearPlayingArea(ctx, xCordinate, yCordinate);
						this.turn(); // turn to next player
						this._x = x; this._y = y;
						
						if (this._player === 1) {		
							this._gameBoard.drawX(ctx, xCordinate, yCordinate)					
							//this.drawX(ctx, xCordinate, yCordinate);				
						} else {
							this._gameBoard.drawO(ctx, xCordinate, yCordinate);
							//this.drawO(ctx, xCordinate, yCordinate);							
						}
						this._board[x][y] = this._player;
						return true
					} else return false;
					
				}
			}
		}
	}

	clearPlayingArea (context, xCordinate, yCordinate) {
		context.fillStyle = "#fff";
		context.fillRect(
			xCordinate,
			yCordinate,
			this._sectionSize -5,
			this._sectionSize -5
		); 
	}

}

export default Caro;