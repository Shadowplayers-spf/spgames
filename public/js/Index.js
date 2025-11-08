import Fetch from "./Fetch.js";
import GameLoader from "./GameLoader.js";
import * as Dom from './_Dom.js'
import User from "./User.js";

export default class Index{

	static Page = {
		Default : "",		// 
		Host : "host",		// (str)game
		Edit : "edit",		// (str)game, (str)assetType || ""
		Play : "play"		// (str)game, (str)token
	};

	computerId = "";				// Used when playing to identify this device
	registeredGames = [];			// Game objects of games that can be played

	activeGame = new GameLoader();		// Active game playerd
	user = new User();				// Only needed for the editor.

	page = "";
	args = [];

	modalWrapper = document.getElementById("modal");
	modalBase = document.querySelector("#modal > div.body");

	_loginIni = false;				// Prevents the init code from logging in from running multiple times

	constructor(){}

	async begin(){

		if( !this.computerId )
			this.computerId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

		this.registeredGames = [
			new GameLoader({label:"jeopardy", name:"Jeopardy", loader:"jeopardy"})
		];

		this.modalWrapper.addEventListener("click", () => {
			this.hideModal();
		});
		this.modalBase.addEventListener("click", event => {event.stopImmediatePropagation();});
		document.getElementById('login').addEventListener("click", this.showLogin.bind(this));
		document.getElementById('logout').addEventListener("click", this.logOut.bind(this));

		Fetch.setOnTokenExpired(this.onTokenExpired.bind(this));

		// Auto login if we have a token
		let f = new Fetch('server', 'GetUser', [], {});
		try{
			let att = await f.run();
			this.user = new User(att.user);
			this.drawLogin();
		}catch(err){}

		window.onhashchange = this.onHashChange.bind(this);
		this.onHashChange();

	}

	async setGameByLabel( label ){

		let game = this.registeredGames.find(g => g.label === label);
		if( !game )
			throw new Error("Game not found");

		this.activeGame = game;
		
	}

	onTokenExpired(){

		if( this.user.exists() )
			this.logOut();
		throw new Error("Din session har gått ut");		

	}

	// Modal
	setModal( element ){

		this.modalBase.replaceChildren(element);
		this.modalWrapper.classList.remove("hidden");

	}

	hideModal(){
		this.modalWrapper.classList.add("hidden");
	}


	showLogin(){

		let form = Dom.create("form");
		let username = Dom.create("input", {type:"text", name:"username", placeholder:"Användarnamn", autocomplete:"username"}, form);
		Dom.br(form);
		let password = Dom.create("input", {type:"password", name:"password", placeholder:"Lösenord", autocomplete:"current-password"}, form);
		Dom.br(form);
		Dom.create("input", {type:"submit", value:"Logga In"}, form);
		this.setModal(form);
		form.addEventListener("submit", async event => {
			event.preventDefault();
			
			const f = new Fetch('server', 'Login', [], {
				user : username.value,
				pass : password.value
			});
			const res = await f.run();
			if( res.user && res.user.session_token ){

				this.user = new User(res.user);
				localStorage.session = res.user.session_token;
				this.hideModal();
				this.drawLogin();

			}

		});

	}

	logOut(){

		localStorage.removeItem("session");
		this.user = new User();
		this.drawLogin();

	}

	// Toggles the login
	drawLogin(){

		document.getElementById('login').classList.toggle("hidden", this.user.exists());
		document.getElementById('logout').classList.toggle("hidden", !this.user.exists());
		document.getElementById('logout').querySelector("span").innerText = 'Inloggad som '+this.user.nick;

		document.getElementById("hostList").classList.toggle("hidden", !this.user.isAdmin());
		document.getElementById("editorList").classList.toggle("hidden", !this.user.isAdmin());

		this.initLogin();
		
	}

	onHashChange(){

		let hash = window.location.hash;
		if( hash.startsWith("#") )
			hash = hash.substring(1);
		let spl = hash.split("/");
		this.page = spl.shift();
		this.args = spl;
		this.drawActivePage();

	}

	async drawActivePage(){

		const loggedIn = this.user.exists();
		const page = this.page;

		document.getElementById("public").classList.toggle("hidden", loggedIn || page !== "");
		document.getElementById("private").classList.toggle("hidden", !loggedIn || page !== "");

		const gameDiv = document.getElementById("game");
		gameDiv.classList.toggle("hidden", page === "");

		if( page !== "" ){

			if( page === Index.Page.Edit || page === Index.Page.Host ){

				const gameLabel = this.args[0];
				if( this.activeGame.label !== gameLabel )
					await this.setGameByLabel(gameLabel);
				
				if( page == Index.Page.Host )
					await this.activeGame.loadHost(gameDiv, this.args);
				else
					await this.activeGame.loadEditor(gameDiv, this.args);

			}
			else if( page === Index.Page.Play ){
				
				const token = this.args[0];
				// Todo: playability
				

			}

		}
		

	}

	nav( page, args = [] ){
		
		window.location.hash = page + "/" + args.join("/");
		
	}

	onGameHostClicked( event ){
		let label = event.target.dataset.label;
		this.nav(Index.Page.Host, [label]);
	}

	onGameEditorClicked( event ){
		let label = event.target.dataset.label;
		this.nav(Index.Page.Edit, [label]);
	}

	initLogin(){
		if( this._loginIni )
			return;

		this._loginIni = true;
		
		const hostList = document.querySelector("#hostList > div.gameListing");
		const editorList = document.querySelector("#editorList > div.gameListing");
		for( let game of this.registeredGames ){

			let host = Dom.create("div", {class:"game"}, hostList);
			host.innerText = game.name;
			host.dataset.label = game.label;
			host.onclick = this.onGameHostClicked.bind(this);
			
			let editor = Dom.create("div", {class:"game"}, editorList);
			editor.innerText = game.name;
			editor.dataset.label = game.label;
			editor.onclick = this.onGameEditorClicked.bind(this);
			
		}

	}

}

