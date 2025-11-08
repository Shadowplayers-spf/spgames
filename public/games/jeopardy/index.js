import GameTemplate from "../GameTemplate.js";
import * as Dom from "../../js/_Dom.js";

export default class Game extends GameTemplate{

    

    constructor(...args){
        super(...args);
    }
    async destructor(){ 
        this.dom.innerHTML = "";
    }

    async loadGame(){

    }

    async loadEditor(){

        const dom = this.dom;
        Dom.create("h1", {text:"Editing Jeopardy"}, dom);
        console.log("Created and appended stuff to dom", dom);

    }

    async loadHost(){
        
    }



}

