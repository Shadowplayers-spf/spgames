// Extend this from your game
export default class GameTemplate{

    static Mode = {
        None : 0,
        Play : 1,
        Edit : 2,
        Host : 3
    };

    dom = null;     // Dom element we're working in
    args = [];      // Location args

    mode = GameTemplate.Mode.None;

    // overwrite these
    async loadGame(){ console.trace("GameTemplate.loadGame"); }
    async loadEditor(){ console.trace("GameTemplate.loadEditor"); }
    async loadHost(){ console.trace("GameTemplate.loadHost"); }
    async destructor(){ }

    constructor( dom, args ){
        this.dom = dom;
        this.args = args;
    }

    async setMode( mode ){
        
        if( this.mode === mode )
            return;

        await this.destructor();
        this.mode = mode;
        if( this.mode === GameTemplate.Mode.Play )
            await this.loadGame();
        else if( this.mode === GameTemplate.Mode.Edit )
            await this.loadEditor();
        else if( this.mode === GameTemplate.Mode.Host )
            await this.loadHost();

    }
    


}