import AutoLoader from "./_AutoLoader.js";

export default class DBLoader extends AutoLoader{

    static db = "";
    static dbConnection = null;

    constructor(...args){
        super(...args);
    }

    static init( dbConnection ){
        this.dbConnection = dbConnection;
    }

    static async get( id ){
        const att = await this.getAll("SELECT * FROM "+this.db+" WHERE id = ? LIMIT 1", [id]);
        return att[0];
    }

    static async getAll( query, args = [] ){
        
        const res = await this.dbConnection.query(query, args);
        console.log("Response", res);
        return res.map(el => new this(el));

    }




}
