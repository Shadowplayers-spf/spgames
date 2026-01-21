import AutoLoader from "../../js/_AutoLoader.js";

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
	question = "";		// The one the host reads
	answer = "";		// The expected answer
	type = Question.Type.Text;
	url = "";       // Used in media types
	
	constructor( data ){
		super(data);

		this.load(data);
	}

	onLoaded(){
	}

	static async getAllByCategory( gameIndex, category ){
	
		if( board instanceof Board )
			board = board.id;

		const assets = await gameIndex.restReq("GetQuestionsByCategory", category);
		return assets.map(el => new this(el, gameIndex));
		

	}

}

