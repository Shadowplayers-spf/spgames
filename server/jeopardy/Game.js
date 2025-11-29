import AutoLoader from "../_AutoLoader.js";

// Todo: Link to DB
export default class Game extends AutoLoader{
    
    owner = 0;
    board = 0;
    data = {};
    player_token = "";      // Invite token
    created = "";
    updated = "";
    
    constructor( data ){
        super(data);

        this.load(data);
    }

    onLoaded(){
        this.data = JSON.parse(this.data);
    }

    

}
