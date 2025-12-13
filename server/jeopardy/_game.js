import Board from "./Board.js";

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
		console.log("Fetching boards available to", user);
		const boards = await Board.getAllAvailableToUser(user);
		console.log("Boards", boards);
		return boards.map(el => el.getOut());

	}

	async usrGetBoardFull( id ){

		

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

}
