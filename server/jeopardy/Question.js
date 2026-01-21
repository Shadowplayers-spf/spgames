import DBLoader from "../_DBLoader.js";
import Category from "./Category.js";

export default class Question extends DBLoader{
	
	static table = "jp_questions";
	static no_save = ["created", "updated"];
	
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

	static getAllByCategory( board ){
	
		if( !(board instanceof Category) )
			throw new Error("Category supplied to Question.getAllByCategory must be a Category object");

		const all = this.getAll("SELECT * FROM "+this.table+" WHERE category = ?", [board.id]);
		return all;

	}

}
