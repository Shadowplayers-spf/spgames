import DBLoader from "../_DBLoader.js";

export default class Collaborator extends DBLoader{
	
	static table = "jp_collaborators";
	static no_save = ["created", "updated"];

	board = 0;
	collaborator = 0;
	
	
	constructor( data ){
		super(data);

		this.load(data);
	}

	

}