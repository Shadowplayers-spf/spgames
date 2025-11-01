
export default class Fetch{

	static onTokenExpired = () => {}; 

	game = '';
	task = '';
	args = [];
	postdata = {};

	constructor( game, task, args = [], postdata = {} ){

		this.game = game;
		this.task = task;
		this.args = args;
		this.postdata = structuredClone(postdata);
		if( typeof this.postdata !== "object" )
			this.postdata = {};
		this.postdata.__token = localStorage.session;

	}

	async run(){

		const url = '/api/'+this.game+'/'+this.task+'/'+this.args.map(el => encodeURIComponent(el)).join('/');
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		console.log("Postdata", this.postdata);
		const res = await fetch(url, {
			headers: headers, 
			method: 'POST', 
			body: JSON.stringify(this.postdata) 
		});

		const out = await res.json();
		if( out.error ){
			if( out.error === 403 ){
				Fetch.onTokenExpired();
				return;
			}
			
			throw new Error(out.error);
		}

		return out;

	}


	static setOnTokenExpired( fn ){
		this.onTokenExpired = fn;
	}

}

