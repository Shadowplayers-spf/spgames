import AutoLoader from "./_AutoLoader.js";

export default class User extends AutoLoader{
	
	privilege = 0;
	nick  = '';

	constructor(data){
		super(data);
		
		this.load(data);
	}

	exists(){
		return this.id > 0;
	}

	isAdmin(){
		return this.privilege >= 10;
	}

	
}
