import GameTemplate from "../GameTemplate.js";
import * as Dom from "../../js/_Dom.js";
import Board from "./Board.js";

export default class Game extends GameTemplate{


	constructor(dom, args, gameLoader){
		super(dom, args, gameLoader);

	}

	async destructor(){ 
		this.dom.innerHTML = "";
	}

	async loadGame(){

	}


	async subEditorBoard( args = [] ){
		
		const dom = this.dom;
		Dom.create("h1", {text:"Todo: Edit a board"}, dom);

	}

	async subEditorControlPanel(){

		const user = this.getUser();
		const dom = this.dom;
		Dom.create("h1", {text:"Editing Jeopardy"}, dom);
		
		const boards = await Board.getAllAvailableToUser(this);    // Gets boards avialable to active user
		boards.sort((a, b) => {
			if( a.creator !== b.creator )
				return a.creator === user.id ? -1 : 1;
			return a.name.localeCompare(b.name);
		});

		const table = Dom.create("table", dom);
		let tr = Dom.create("tr", table);
		Dom.create("th", {text:"Name"}, tr);
		Dom.create("th", {text:"Offentlig"}, tr);
		Dom.create("th", {text:"Edit"}, tr);

		let isMine = true;
		for( let board of boards ){

			if( board.creator !== user.id ){
				
				const tr = Dom.create("tr", table);
				let th = Dom.create("th", {text:"Publika Spel"}, tr);
				th.colspan = 3;
				isMine = false;

			}

			

			const tr = Dom.create("tr", table);
			Dom.create("td", {text : board.name}, tr);
			Dom.create("td", {text : board.public ? "Ja" : "Nej"}, tr);
			
			let td = Dom.create("td", {}, tr);
			let button = Dom.create("input", {type:"button", value:"Kopiera"}, tr);
			button.onclick = () => {
				console.log("Todo: Copy board", board);
			};		
			td.append(button);
			if( isMine ){
				button  = Dom.create("input", {type:"button", value:"Redigera"}, tr);
				td.append(button);
				button.onclick = () => {
					this.nav("board", [board.id]);
				};
			}

		}

		tr = Dom.create("tr", table);
		Dom.create("td", {colspan:3}, tr);
		let input = Dom.create("input", {type:"text", placeholder:"Namn"}, tr);
		let button = Dom.create("input", {type:"button", value:"Nytt Bräde"}, tr);
		button.addEventListener("click", async event => {

			const req =await  this.restReq("CreateBoard", [input.value]);

			if( req.id ){
				console.log("Todo: go to edit page: ", req.id);
			}

		});


	}

	async loadEditor(){

		
		let task = this.args[0];
		let args = this.args.slice(1);

		if( task === "board" )
			return this.subEditorBoard(args);
		else
			return this.subEditorControlPanel();

	}


	async loadHost(){
		
	}



}

