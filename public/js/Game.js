import Generic from "./helpers/Generic.js";


export default class Game extends Generic{

	label = "";
	name = "";
	parent = null;
	loader = '';	// Path to script
	id = '';
	obj = null;
	
	constructor( data = {}, parent = null ){
		super(data, parent);
	}

	async load(){

		this.obj = await import(this.loader);
		console.log("Loaded game", this.obj);

	}

}
