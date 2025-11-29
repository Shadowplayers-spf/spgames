
export default class AutoLoader{

	id = 0;

	constructor(){
	}

	// overridable
	onLoaded(){}

	load( data ){

		if( !data || typeof data !== "object" )
			return;

		for( let i in data ){
			
			if( this.hasOwnProperty(i) ){

				let type = typeof this[i];
				this[i] = structuredClone(data[i]);
				if( type === "number" || type === "boolean" )
					this[i] = +this[i];
				else if( type === "string" )
					this[i] = String(this[i]);
				
			}

		} 

		this.onLoaded();

	}

}

