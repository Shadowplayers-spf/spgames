import User from "./User.js";

export default class Rest{

	static games = new Map();

	static dbGames = null;
	static init( dbGames ){
		this.dbGames = dbGames;
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


		// Target this by default
		let targ = this;
		// If we want to target a game, we use the game's API
		if( this.game !== "server" ){

			const cstr = Rest.games.get(this.game);
			targ = new cstr(this);

		}

		let fnName = this.task;
		// Public level privilege
		if( typeof targ['pub'+fnName] === "function" ){
			return await targ['pub'+fnName](...this.args);
		}

		// These require a user
		this.user = await User.fromToken(this.body.__token);

		// Throwing 403 tells the app to log out
		if( !this.user.exists() )
			throw 403;

		// User level privilege
		if( typeof targ['usr'+fnName] === "function" )
			return await targ['usr'+fnName](...this.args);

		// Admin level privilege
		if( !this.user.isAdmin() )
			throw new Error("Access denied");

		if( typeof targ['adm'+fnName] === "function" )
			return await targ['adm'+fnName](...this.args);


		throw new Error("Task not found");

	}

	async pubLogin(){

		if( !this.body.user || !this.body.pass ){

			throw new Error("Ingen användare eller lösen hittades");

		}
		// Can be improved on later, since we're only fetching an existing token, which is far from the safest option
		this.user = await User.fromLogin(this.body.user, this.body.pass); // fromLogin populates the token field
		return {
			user : this.user.getOut(true),
		};

	}


	// Gets active user by token
	async usrGetUser(){

		return {
			user : this.user.getOut(false),
		};

	}




}
