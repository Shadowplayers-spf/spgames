import Fetch from "./Fetch.js";
import Game from "./Game.js";
import * as Dom from './helpers/Dom.js'
import User from "./User.js";

export default class Index{

	activeGame = new Game();
	user = new User();

	modalWrapper = document.getElementById("modal");
	modalBase = document.querySelector("#modal > div.body");

	constructor(){}

	async begin(){

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

	}



}

