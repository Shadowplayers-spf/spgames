import AutoLoader from "../_AutoLoader.js";

export default class Question extends AutoLoader{
    
    static Type = {
        Text : "Text",
        Image : "Image",
        Video : "Video",
        Audio : "Audio"
    }

    category = 0;
    index = 0;
    created = "";
    updated = "";
    question = "";
    answer = "";
    type = Question.Type.Text;
    url = "";       // Used in media types
    
    constructor( data ){
        super(data);

        this.load(data);
    }

    onLoaded(){
    }

    

}
