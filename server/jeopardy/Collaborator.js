import AutoLoader from "../_AutoLoader.js";

export default class Collaborator extends AutoLoader{
    
    
    board = 0;
    collaborator = 0;
    
    
    constructor( data ){
        super(data);

        this.load(data);
    }

    

}