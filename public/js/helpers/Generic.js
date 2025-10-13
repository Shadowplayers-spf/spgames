
export default class Generic{

	parent = null;

	constructor( data = {}, parent = null ){

		this.parent = parent;
		this.autoload(data);

	}

	autoload( data = {} ){

		if( !data || typeof data !== "object" )
			return;

		let proto = new this.constructor(false);
		for( let i in data ){
			
			if( proto.hasOwnProperty(i) )
				this[i] = data[i];

		}

	}

}
