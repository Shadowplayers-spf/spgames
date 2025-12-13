import AutoLoader from "./_AutoLoader.js";

export default class DBLoader extends AutoLoader{

    static table = "";
    static dbConnection = null;
    static no_save = ["created", "updated"];
    
    _loaded_data = {};

    constructor(...args){
        super(...args);
    }

    static init( dbConnection ){
        this.dbConnection = dbConnection;
    }

    static async get( id ){
        const att = await this.getAll("SELECT * FROM "+this.table+" WHERE id = ? LIMIT 1", [id]);
        return att[0];
    }

    static async getAll( query, args = [] ){
        
        const res = await this.dbConnection.query(query, args);
        return res.map(el => {
            let out = new this(el);
            out._loaded_data = el;
            return out;
        });

    }

    getSaveData(){

        let out = {};
        for( let i in this ){

            if( i === "id" || i.startsWith("_") )
                continue;

            if( this.constructor.no_save.includes(i) )
                continue;

            let val = this[i];
            if( val && typeof val === "object" ){
                if( Array.isArray(val) )
                    val = val.map(el => {
                        
                        if( el.getSaveData )
                            el = el.getSaveData();
                        return JSON.stringify(el);

                    });

                if( val.getSaveData )
                    val = val.getSaveData();
                val = JSON.stringify(val);
            }

            out[i] = this[i];

        }
        return out;

    }

    async insert(){

        let data = this.getSaveData();
        let vals = []; let qs = [];
        for( let i in data ){
            vals.push(data[i]);
            qs.push("?");
        }
        let q = "INSERT INTO "+this.constructor.table+" ("+Object.keys(data).map(el => '`'+el+'`').join(",")+") VALUES ("+qs.join(",")+")";
        const res = await this.constructor.dbConnection.query(q, vals);
        this.id = res.insertId;

    }

    async save(){

        let data = this.getSaveData();

        let vals = []; let qs = [];
        for( let i in data ){
            if( data[i] === this._loaded_data[i] )
                continue;
            vals.push(data[i]);
            qs.push("`"+i+"` = ?");
        }
        if( !qs.length )
            return;

        let q = "UPDATE "+this.constructor.table+" SET "+qs.join(",")+" WHERE id = ?";
        vals.push(this.id);
        await this.constructor.dbConnection.query(q, vals);

    }

    



}
