import User from "./User";

export default class Rest{

	static games = new Map();

	static dbGames = null;
	static dbUsers = null;
	static init( dbGames, dbUsers ){
		this.dbGames = dbGames;
		this.dbUsers = dbUsers;
	}
	static addGame( label, gConstructor ){
		if( label === "server" )
			throw new Error("Game cannot be labeled server");
		this.games.set(label, gConstructor);
	}


	game = 'server';			// server targets this rest API
	task = '';
	user = null;
	args = [];
	body = {};
	
	

	constructor( req, db ){

		// Parse the path
		const path = req.path.split('/').filter(x => x !== '');
		this.game = path[1]; // Note: 0 is just "api"
		this.task = path[2];
		this.args = path.slice(3);
		// Get JSON from post
		this.body = req.body;
		
	}

	async run(){

		if( this.game !== "server" && !Rest.games.has(this.game) )
			throw new Error("Game not found");
		
		let out = {};

		// Target this by default
		let targ = this;
		// If we want to target a game, we use the game's API
		if( this.game !== "server" ){

			const cstr = Rest.games.get(this.game);
			targ = new cstr(this);

		}

		console.log(this.task);
		let fnName = this.task;
		// Public level privilege
		if( typeof targ['pub'+fnName] === "function" ){
			out = await targ['pub'+fnName](...this.args);
		}
		// User level privilege
		else if( typeof targ['usr'+fnName] === "function" ){
			out = await targ['usr'+fnName](...this.args);
		}
		// Admin level privilege
		else if( typeof targ['adm'+fnName] === "function" ){
			out = await targ['adm'+fnName](...this.args);
		}
		else
			throw new Error("Task not found");


		return out;

	}

	async pubLogin(){

		if( !this.body.user || !this.body.pass ){
			
			throw new Error("Ingen användare eller lösen hittades");

		}

		this.user = await User.fromUserPass( Rest.dbUsers, this.body.user, this.body.pass );
		// Return a session token
		

	}




	

}
