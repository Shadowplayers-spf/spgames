import Fetch from "../../js/Fetch.js";


// Extend this from your game
export default class GameTemplate{

    static Mode = {
        None : 0,
        Play : 1,
        Edit : 2,
        Host : 3
    };
    static ModeNames = {
        [GameTemplate.Mode.Play] : "play",
        [GameTemplate.Mode.Edit] : "edit",
        [GameTemplate.Mode.Host] : "host"
    };

    dom = null;     // Dom element we're working in
    args = [];      // Location args
    gameLoader = null;

    mode = GameTemplate.Mode.None;

    // overwrite these
    async loadGame(){ console.trace("GameTemplate.loadGame"); }
    async loadEditor(){ console.trace("GameTemplate.loadEditor"); }
    async loadHost(){ console.trace("GameTemplate.loadHost"); }
    async destructor(){ }

    constructor( dom, args, gameLoader ){
        
        this.dom = dom;
        this.args = args;
        this.gameLoader = gameLoader;

    }

    nav( page, args = [] ){
        
        this.gameLoader.nav(page, args);

    }
    
    getUser(){
        return this.gameLoader.getUser();
    }

    async restReq( task, args ){

        const req = new Fetch(this.gameLoader.label, task, args);
        return await req.run();

    }

    async setMode( mode ){

        await this.destructor();
        this.dom.replaceChildren();

        this.mode = mode;
        if( this.mode === GameTemplate.Mode.Play )
            await this.loadGame();
        else if( this.mode === GameTemplate.Mode.Edit )
            await this.loadEditor();
        else if( this.mode === GameTemplate.Mode.Host )
            await this.loadHost();

    }
    


}