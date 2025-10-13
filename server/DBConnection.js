import Mariadb from 'mariadb';

export default class DBConnection{

	user = '';
	pass = '';
	server = '';
	pool = null;

	constructor( user, pass, server ){

		this.user = user;
		this.pass = pass;
		this.server = server;

	}

	async connect(){
		
		this.pool = Mariadb.createPool({
			host : this.server,
			user : this.user,
			password : this.pass,
			connectionLimit : 10,
		});

	}

	async query(q, args = []){

		const conn = await this.pool.getConnection();
		return await conn.query(q, args);

	}

}

