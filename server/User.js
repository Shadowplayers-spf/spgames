





// Todo: this should tunnel through the app, not work directly with the DB






export default class User{

	id = 0;
	nick = '';
	privilege = 0;


	constructor(){

	}

	static async fromUserPass( dbConnection, name, pass ){

	}

	static async fromToken( dbConnection, token ){

	}


}


