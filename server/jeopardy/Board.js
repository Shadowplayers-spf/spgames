import AutoLoader from "../_AutoLoader.js";

export default class Board extends AutoLoader{
    
    name = "";
    creator = "";
    created = "";
    updated = "";
    public = 0;
    description = "";

    constructor( data ){
        super(data);

        this.load(data);
    }

    

}

