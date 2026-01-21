import DBLoader from "../_DBLoader.js";

export default class Board extends DBLoader{
	
	static table = "jp_boards";
	static no_save = ["created", "updated"];

	name = "";
	creator = 0;
	created = "";
	updated = "";
	public = 0;
	description = "";

	constructor( data ){
		super(data);

		this.load(data);
	}

	getOut(){
		return {
			id : this.id,
			name : this.name,
			creator : this.creator,
			created : this.created,
			updated : this.updated,
			public : this.public,
			description : this.description
		};
	}

	static async getAllAvailableToUser( user ){
		
		const id = user.id;
		let query = "SELECT * FROM "+this.table+" WHERE public = 1 OR creator = ?";
		return await this.getAll(query, [id]);

	}

}

