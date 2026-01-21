import AutoLoader from "../../js/_AutoLoader.js";
import Category from "./Category.js";
import * as Dom from "../../js/_Dom.js";

export default class Board extends AutoLoader{
	
	static CATEGORIES_PER_ROUND = 6;

	name = "";
	creator = 0;
	created = "";
	updated = "";
	public = 0;
	description = "";

	gameIndex = null;
	
	_categories = null;

	constructor( data, gameIndex ){
		super(data);
		this.gameIndex = gameIndex;
		this.load(data);
	}

	// Note: CategoryIndex uses 0 -> CATEGORIES_PER_ROUND for the first round, CATEGORIES_PER_ROUND -> 2*CATEGORIES_PER_ROUND for the second round
	// returns false if not found
	async getQuestionByIndex( categoryIndex, questionIndex ){
		const cat = await this.getCategories()[categoryIndex];
		if( !cat )
			return false;
		return await cat.getQuestionByIndex(questionIndex);

	}

	async getCategories( force = false ){

		if( !this._categories || force )
			this._categories = await Category.getAllByBoard(this.gameIndex, this);
		return this._categories;

	}


	async appendTable( round, domParent, editor = false ){

		const categories = await this.getCategories();
		// Cache all the questions
		const p = [];
		for( let cat of categories )
			p.push(cat.getQuestions());
		await Promise.all(p);

		Dom.create("h2", {text:"Runda "+(round+1)+":"}, domParent);
		let table = Dom.create("table", {class:"gameBoard"}, domParent);
		for( let row = 0; row < 6; ++row ){

			let tr = Dom.create("tr", table);
			for( let col = 0; col < Board.CATEGORIES_PER_ROUND; ++col ){

				const category = categories[col];
				if( row === 0 ){
					Dom.create("th", {
						text:category ? category.name : "Kategori "+(col+1),
						dataset : {
							categoryIdx : col,
							roundIdx : round
						}
					}, tr);
				}
				else{

					let question = category?._questions[row-1]; // In general use getQuestions, but we've recached earlier, so this is less asynchy
					let label = '';
					if( editor ){
						label = 'TODO';
						if( question )
							label = question.question;
					}

					Dom.create("td", {
						text:label,
						dataset : {
							categoryIdx : col,
							questionIdx : row-1,
							roundIdx : round
						}
					}, tr);

				}

			}
			
		}

		return table;

	}


	static async getAllAvailableToUser( gameIndex ){
		// Recache
		const assets = await gameIndex.restReq("GetBoardsAvailableToUser");
		return assets.map(el => new this(el, gameIndex));

	}

	static async getById( gameIndex, id ){
		const asset = await gameIndex.restReq("GetBoardFull", id);
		return new this(asset, gameIndex);
	}



	

}

