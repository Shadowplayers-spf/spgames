import Fetch from "./Fetch.js";
import Game from "./Game.js";
import * as Dom from './helpers/Dom.js'

export default class Index{

	activeGame = new Game();
	user = null;

	modalWrapper = document.getElementById("modal");
	modalBase = document.querySelector("#modal > div.body");

	constructor(){}

	async begin(){

		this.modalWrapper.addEventListener("click", () => {
			this.hideModal();
		});
		this.modalBase.addEventListener("click", event => {event.stopImmediatePropagation();});
		document.getElementById('login').addEventListener("click", this.showLogin.bind(this));

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
			console.log("Response", res);

		});

	}



}

