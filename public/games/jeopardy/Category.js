import AutoLoader from "../../js/_AutoLoader.js";
import Board from "./Board.js";
import Question from "./Question.js";

export default class Category extends AutoLoader{
	
	
	name = "";
	created = "";
	updated = "";
	board = 0;
	name = "";
	description = "";       // Only used internally in the editor
	index = 0;              // Position in the board

	gameIndex = null;       // reference to ./index.js Game object
	
	_questions = [];

	constructor( data, gameIndex ){
		super(data);

		this.load(data);
	}

	async getQuestionByIndex(){
		return await this.getQuestions()[this.index];
	}

	async getQuestions( gameIndex, force = false ){

		if( !this._questions || force )
			this._questions = await Question.getAllByCategory(gameIndex, this);
		return this._questions;

	}
	
	static async getAllByBoard( gameIndex, board ){

		if( board instanceof Board )
			board = board.id;

		const assets = await gameIndex.restReq("GetCategoriesByBoard", board);
		return assets.map(el => new this(el, gameIndex));
		

	}

	

}

