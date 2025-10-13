
export default class Fetch{

	static userToken = '';

	game = '';
	task = '';
	args = [];
	postdata = {};

	constructor( game, task, args = [], postdata = {} ){

		this.game = game;
		this.task = task;
		this.args = args;
		this.postdata = postdata;

	}

	async run(){

		const url = '/api/'+this.game+'/'+this.task+'/'+this.args.map(el => encodeURIComponent(el)).join('/');
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let data = structuredClone(this.postdata);
		data.__user_token = Fetch.userToken;

		const res = await fetch(url, {
			headers: headers, 
			method: 'POST', 
			body: JSON.stringify(this.postdata) 
		});

		return await res.json();

	}

}

