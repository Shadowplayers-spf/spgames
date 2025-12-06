import AutoLoader from "../../js/_AutoLoader.js";

export default class Board extends AutoLoader{
    

    name = "";
    creator = 0;
    created = "";
    updated = "";
    public = 0;
    description = "";

    gameIndex = null;

    constructor( data, gameIndex ){
        super(data);
        this.gameIndex = gameIndex;
        this.load(data);
    }

    static async getAllAvailableToUser( gameIndex ){
        // Recache
        const assets = await gameIndex.restReq("GetBoardsAvailableToUser");
        for( let asset of assets )
            this.addToCache(asset);
        return assets;

    }

    

}

