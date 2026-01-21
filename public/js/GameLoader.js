import GameTemplate from "../games/GameTemplate.js";
import AutoLoader from "./_AutoLoader.js";


export default class Game extends AutoLoader{


	label = "";				//
	name = "";				// 
	icon = "";				// 
	css = false;			// Set to true if we should include CSS
	parent = null;			// 
	loader = '';			// Path under /public/games where you have index.js for your game.
							// index.js should export Game and Editor classes.
	obj = null;				// Game object, should extend GameTemplate
	_cssFile = null;		// link element

	constructor( data = {}, parent ){
		super(data);
		this.parent = parent;

		this.load(data);
	}

	getUser(){
		return this.parent.user;
	}

	exists(){
		return this.label;
	}

	getCssFile(){
		if( !this.css )
			return false;
		if( !this._cssFile ){
			this._cssFile = document.createElement('link');
			this._cssFile.rel = 'stylesheet';
			this._cssFile.href = '/games/'+this.loader+'/style.css';
		}
		return this._cssFile;
	}

	async destroy(){
		
		if( this?.obj?.destructor )
			await this.obj.destructor();
		this.obj = null;
		if( this._cssFile ){
			this._cssFile.remove();
			this._cssFile = null;
		}

	}

	nav( page, args = [] ){


		let hash = "#"+GameTemplate.ModeNames[this.obj.mode] + "/" + this.label + "/";
		if( page )
			hash += page;
		hash += "/" + args.join("/");
		window.location.hash = hash;

	}

	// Fetches the code we need and sets this.obj
	async fetchObj( dom, args ){

		if( this.obj !== null )
			return;
		const constructor = await import('../games/'+this.loader+"/index.js");
		this.obj = new constructor.default(dom, args, this);

	}

	async loadGame( dom, args ){
		await this.fetchObj(dom, args);
		await this.obj.setMode(GameTemplate.Mode.Play);

	}

	async loadEditor( dom, args ){
		
		await this.fetchObj(dom, args);
		this.obj.args = args;
		await this.obj.setMode(GameTemplate.Mode.Edit);

	}

	async loadHost( dom, args ){
		await this.fetchObj(dom, args);
		await this.obj.setMode(GameTemplate.Mode.Host)
	}

}
