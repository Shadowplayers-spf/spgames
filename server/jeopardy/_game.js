import Board from "./Board.js";
import Category from "./Category.js";
import Question from "./Question.js";

export default class Jeopardy{

	rest = null;

	constructor( rest ){
		this.rest = rest;
		
	}

	getUser(){
		return this.rest.user;
	}

	async usrGetGame(){
		
	}

	// Gets public boards and boards by rest user
	async usrGetBoardsAvailableToUser(){

		const user = this.getUser();
		const boards = await Board.getAllAvailableToUser(user);
		return boards.map(el => el.getOut());

	}

	async usrGetBoardFull( id, getRaw = false ){

		const user = this.getUser();
		const board = await Board.get(id);
		if( !board )
			throw new Error("Board not found "+parseInt(id));
		if( user.id !== board.creator ){
			console.log(user, board);
			throw new Error("That board ain't one of ours! "+parseInt(user.id)+" "+parseInt(board.creator));
		}
		if( getRaw )
			return board;

		return board.getOut();

	}


	async usrCreateBoard( name ){
		if( !name )
			throw new Error("Missing name");
		name = String(name).trim().substring(0,100);
		if( !name )
			throw new Error("Invalid name");

		const board = new Board();
		board.name = name;
		board.creator = this.rest.user.id;
		await board.insert();

		return {
			id : Number(board.id)
		};

	}

	async usrGetCategoriesByBoard( boardId ){

		// Makes sure board exists and is owned by user
		const board = await this.usrGetBoardFull(boardId, true);
		
		const categories = await Category.getAllByBoard(board);

		return categories.map(el => el.getOut());

	}

	async usrGetQuestionsByCategory( categoryId ){

		const category = await Category.getById(categoryId);
		if( !category )
			throw new Error("Category not found "+parseInt(categoryId));
		await this.usrGetBoardFull(category.board, true); // Check permissions

		return await Question.getAllByCategory(category);

	}

}
