require('pixi.js');

global.GameDefine	= require('../GameDefine');
global.GameConfig	= require('../Config');
global.Input		= require('./Input');
global.StateManager	= require('./StateManager');
global.APP			= require('./Application');
global.StateSample	= require('../game/StateSample');

function GameLoop(deltaTime)
{
	deltaTime = deltaTime / (60 * APP.ticker.speed);
	APP.Update(deltaTime);
	APP.Render();
}

window.main = function()
{
	APP.Init(GameLoop);
	StateManager.PushState(StateSample);
}