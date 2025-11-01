import AutoLoader from "./_AutoLoader.js";


export default class Game extends AutoLoader{

	label = "";				//
	name = "";				// 
	icon = "";
	parent = null;			// 
	loader = '';			// Path under /public/games where you have index.js for your game.
							// index.js should export Game and Editor classes.
	obj = null;
	loaded = false;
	
	constructor( data = {} ){
		super(data);

		this.load(data);
	}

	exists(){
		return this.label;
	}

	async destroy(){
		
		if( this?.obj?.destroy )
			await this.obj.destroy();
		this.obj = null;

	}

	async loadGame(){

		await this.destroy();

		let code = await import(this.loader);
		this.obj = code.Game;
		console.log("Loaded game", this.obj);

	}

	async loadEditor(){

		await this.destroy();
		let code = await import(this.loader);
		this.obj = code.Editor;
		console.log("Loaded editor", this.obj);

	}

}
