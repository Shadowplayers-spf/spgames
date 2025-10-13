
// You can omit options and just enter parent if you want
export function create( type, options, parent ){
	
	const out = document.createElement(type);
	if( arguments.length > 2 ){

		let c = options.class || options.classList;
		if( c )
			out.classList.add(c);
		c = options.style;
		if( c )
			out.style = c;
		if( options.id )
			out.id = options.id;
		if( options.name )
			out.name = options.name;
		if( options.type )
			out.type = options.type;
		if( options.placeholder )
			out.placeholder = options.placeholder;
		if( options.value )
			out.value = options.value;
		if( options.autocomplete )
			out.autocomplete = options.autocomplete;

	}
	else
		parent = options;
	
	if( parent )
		parent.appendChild(out);
	return out;

}

export function br( parent ){ 
	
	let el = document.createElement("br"); 
	if( parent )
		parent.appendChild(el);
	return el;

}

