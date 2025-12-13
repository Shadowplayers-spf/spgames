
export default class AutoLoader{

	// static cache = new Map();		// This is auto created when using the cache methods. 
	// Needs to be created by the extended object calling this
	static _checkCache(){
		if( !(this.cache instanceof Map ) )
			this.cache = new Map();
	}
	static addToCache( asset ){
		this._checkCache();
		if( !asset.id )
			throw new Error("Asset must have an id");
		if( this.cache.has(asset.id) )
			console.warn("Overwriting existing cache object", this.cache.get(asset.id), "with", asset);
		this.cache.set(asset.id, asset);
	}
	// Accepts an id or an object
	static removeFromCache( id ){
		this._checkCache();
		this.cache.delete(id ? id : id.id);
	}
	static getFromCache( id ){
		this._checkCache();
		return this.cache.get(id);
	}


	id = 0;

	constructor( ){

	}

	load( data ){

		if( !data || typeof data !== "object" )
			return;

		for( let i in data ){
			
			if( this.hasOwnProperty(i) ){

				let type = typeof this[i];
				this[i] = structuredClone(data[i]);
				if( type === "number" || type === "boolean" )
					this[i] = Number(this[i]);
				
			}

		} 

	}

}

