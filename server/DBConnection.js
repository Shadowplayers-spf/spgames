import Mariadb from 'mariadb';

export default class DBConnection{

	user = '';
	pass = '';
	db = '';
	pool = null;

	constructor( user, pass, db ){

		this.user = user;
		this.pass = pass;
		this.db = db;

	}

	async connect(){
		
		this.pool = Mariadb.createPool({
			host : "webgames-db",
			user : this.user,
			password : this.pass,
			database : this.db,
			connectionLimit : 10,
		});

	}

	async query(q, args = []){

		const conn = await this.pool.getConnection();
		console.log(q, args);
		let out;
		try{
			out = await conn.query(q, args);
		}catch(err){
			console.error(err);
			out = false;
			
		}
		conn.release();
		return out;

	}

}

