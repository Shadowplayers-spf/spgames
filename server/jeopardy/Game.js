import DBLoader from "../_DBLoader.js";

// Todo: Link to DB
export default class Game extends DBLoader{
    
    static table = "jp_games";
	static no_save = ["created", "updated"];

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
