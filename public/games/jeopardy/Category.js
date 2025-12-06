import AutoLoader from "../../js/_AutoLoader.js";

export default class Category extends AutoLoader{
    
    
    name = "";
    created = "";
    updated = "";
    board = 0;
    name = "";
    description = "";       // Only used internally in the editor
    index = 0;              // Position in the board

    
    constructor( data ){
        super(data);

        this.load(data);
    }
    

    

}

