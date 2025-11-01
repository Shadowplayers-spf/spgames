import AutoLoader from "./_AutoLoader.js";

export default class User extends AutoLoader{

	nick = '';
	privilege = 0;
	session_token = '';			// Only populated when the user is fetched from the fromLogin method

	constructor( data = {}){
		super(data);

		this.load(data);
	}

	getOut( withToken = false ){

		let out = {
			id : this.id,
			privilege : this.privilege,
			nick : this.nick
		};

		if( withToken )
			out.session_token = this.session_token;

		return out;

	}

	exists(){
		return this.id > 0;
	}

	isAdmin(){
		return this.privilege >= 10;
	}
	
	static async fromToken( token ){

		const res = await this.reqFromAPI('GetUser', [], token);
		delete res.session_token;
		return new User(res);

	}

	static async fromLogin( user, pass ){

		const res = await this.reqFromAPI('Login', [user, pass]);
		return new User(res);

	}


	// Makes a request from the user REST endpoint
	static async reqFromAPI( task, args = [], token = '' ){

		// Try logging in via shadowplayers app
		const req = await fetch('http://node/api', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({task, args, token})
		});

		let res = await req.json();
		if( !res.success )
			throw new Error(res.response);

		return res.response;
	
	}

}


