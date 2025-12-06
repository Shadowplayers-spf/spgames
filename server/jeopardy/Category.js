import AutoLoader from "../_AutoLoader.js";

export default class Category extends AutoLoader{
    
    
    name = "";
    created = "";
    updated = "";
    board = 0;
    name = "";
    description = "";       // Only used internally in the editor
    index = 0;              // Position in the board. 0-5 for page 1, and 6-11 for page 2

    
    constructor( data ){
        super(data);

        this.load(data);
    }

    

}

