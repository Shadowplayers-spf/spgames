import DBLoader from "../_DBLoader.js";
import Board from "./Board.js";

export default class Category extends DBLoader{
	
	static table = "jp_categories";
	static no_save = ["created", "updated"];

	name = "";
	created = "";
	updated = "";
	board = 0;
	name = "";
	description = "";       // Only used internally in the editor
	index = 0;              // Position in the board. 0-5 for page 1, and 6-11 for page 2

	constructor( data, parent ){
		super(data);


		this.load(data);
	}
	

	static getAllByBoard( board ){

		if( !(board instanceof Board) )
			throw new Error("Board supplied to Category.getAllByBoard must be a Board object");

		const all = this.getAll("SELECT * FROM "+this.table+" WHERE board = ?", [board.id]);
		return all;

	}



	

}

