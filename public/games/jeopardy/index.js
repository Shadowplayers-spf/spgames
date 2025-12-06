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

    async loadEditor(){

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
        const tr = Dom.create("tr", table);
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

            let button = '<input type="button" value="Kopiera" />';
            if( isMine )
                button += '<br /><input type="button" value="Redigera" />';

            const tr = Dom.create("tr", table);
            Dom.create("td", {text : board.name}, tr);
            Dom.create("td", {text : board.public ? "Ja" : "Nej"}, tr);
            
            Dom.create("td", {html : button}, tr);
            

        }



    }

    async loadHost(){
        
    }



}

