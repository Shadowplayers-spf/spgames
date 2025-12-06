import Board from "./Board.js";

export default class Jeopardy{

    rest = null;

    constructor( rest ){
        this.rest = rest;
        
    }

    async usrGetGame(){

    }

    // Gets public boards and boards by rest user
    async usrGetBoardsAvailableToUser(){

        console.log("Fetching boards available to", this.rest.user);
        const boards = await Board.getAllAvailableToUser(this.rest.user);
        return boards.map(el => el.getOut());

    }

    async usrGetBoardFull( id ){



    }

}
