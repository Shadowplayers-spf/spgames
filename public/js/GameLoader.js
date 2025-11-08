import GameTemplate from "../games/GameTemplate.js";
import AutoLoader from "./_AutoLoader.js";


export default class Game extends AutoLoader{


	label = "";				//
	name = "";				// 
	icon = "";				// 
	parent = null;			// 
	loader = '';			// Path under /public/games where you have index.js for your game.
							// index.js should export Game and Editor classes.
	obj = null;				// Game object, should extend GameTemplate
	
	constructor( data = {} ){
		super(data);


		this.load(data);
	}

	exists(){
		return this.label;
	}

	async destroy(){
		
		if( this?.obj?.destructor )
			await this.obj.destructor();
		this.obj = null;

	}

	// Fetches the code we need and sets this.obj
	async fetchObj( dom, args ){

		if( this.obj !== null )
			return;
		const constructor = await import('../games/'+this.loader+"/index.js");
		this.obj = new constructor.default(dom, args);
		console.log("Fetched game obj", this.obj);

	}

	async loadGame( dom, args ){
		await this.fetchObj(dom, args);
		await this.obj.setMode(GameTemplate.Mode.Play);

	}

	async loadEditor( dom, args ){
		await this.fetchObj(dom, args);
		await this.obj.setMode(GameTemplate.Mode.Edit);
	}

	async loadHost( dom, args ){
		await this.fetchObj(dom, args);
		await this.obj.setMode(GameTemplate.Mode.Host)
	}

}
