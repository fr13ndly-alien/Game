class StateSample extends PIXI.Container
{
	constructor()
	{
		super();

		this.cat		= null;
		this.bg			= null;
		this.targetX	= -1;
		this.targetY	= -1;

		this.interactive = true;
		APP.AddChild(this);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load()
	{
		const loader = PIXI.loader;

		loader.on("progress", this.LoadProgressHandler.bind(this));
		loader.on("error", this.LoadErrorHandler.bind(this));
		loader.on("complete", this.LoadCompleteHandler.bind(this));

		loader.add('imgBg', 'data/bg.jpg')
		loader.add('imgCat', 'data/cat.png')

		loader.load();

	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Unload()
	{
		APP.RemoveChild(this);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		if (this.targetX != -1 || this.targetY != -1)
		{
			let dx 	= this.targetX - this.cat.x;
			let dy 	= this.targetY - this.cat.y;
			let len	= Math.sqrt(dx * dx + dy * dy);
			let vectorSpeed = {x: dx / len, y: dy / len};

			this.cat.x += 10 * GameDefine.GAME_SPEED_BASE * vectorSpeed.x * deltaTime;
			this.cat.y += 10 * GameDefine.GAME_SPEED_BASE * vectorSpeed.y * deltaTime;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadProgressHandler(loader, resource)
	{
		console.log("LoadProgressHandler: " + resource.name);
		switch (resource.name)
		{
			case "imgCat":
			{
				this.cat = new PIXI.Sprite(PIXI.loader.resources.imgCat.texture);
				this.cat.anchor.set(0.5, 0.5);
				this.cat.position.set(APP.GetWidth() / 2, APP.GetHeight() / 2);
				break;
			}
			case "imgBg":
			{
				this.bg = new PIXI.Sprite(PIXI.loader.resources.imgBg.texture);
				this.bg.anchor.set(0.5, 0.5);
				this.bg.position.set(APP.GetWidth() / 2, APP.GetHeight() / 2);
				break;
			}

		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadErrorHandler(error)
	{
		console.log("LoadErrorHandler: " + error);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadCompleteHandler()
	{
		console.log("LoadCompleteHandler");

		this.addChild(this.bg);
		this.addChild(this.cat);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		if (Input.IsTouchMove(event))
		{
			this.targetX = Input.touchX + Input.touchDX;
			this.targetY = Input.touchY + Input.touchDY;
		}
		else if (Input.IsTouchUp(event))
		{
			this.targetX = -1;
			this.targetY = -1;
		}
	}
}
module.exports = new StateSample();