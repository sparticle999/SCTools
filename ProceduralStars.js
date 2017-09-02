var resources = ["uranium", "lava", "oil", "metal", "gem", "charcoal", "wood", "lunarite", "methane", "titanium", "gold", "silver", "silicon", "hydrogen", "helium", "ice", "meteorite"]

var Starloader = (function(){

	var instance = {};

	instance.starNum = 20;
	instance.entries = {};

	instance.factions = [
		{id: "carnelian", name: "Carnelian Resistance"},
		{id: "prasnian", name: "Prasnian Empire"},
		{id: "hyacinite", name: "Hyacinite Congregation"},
		{id: "kitrinos", name: "Kitrinos Corporation"},
		{id: "moviton", name: "Moviton Syndicate"}];

	instance.dataTemplate = Handlebars.compile([
		'<span>instance._{{id}} = {',
		'	name: "{{name}}",',
		'	distance: {{distance}},',
		'	planets: {{planets}},',
		'	faction: "{{faction}}",',
		'	factionId: "{{factionId}}",',
		'	resource1: "{{resource1}}",',
		'	resource2: "{{resource2}}",',
		'	stats: {',
		'		"power": {{power}},',
		'		"defense": {{defense}},',
		'		"speed": {{speed}},',
		'	},',
		'};',
		'',
		''].join('<br>'));

	instance.initialise = function(){
		for(var i = 4; i < 50; i++){
			var data = star_init_list[i];

			var planets = this.getRndBias();
			var x = Math.floor(Math.random() * 5);
			var a = Math.floor(Math.random() * resources.length);
			var b = Math.floor(Math.random() * resources.length);

			var prod1 = Math.random();
			var prod2 = Math.random();

			var p = Math.floor((Math.random()*3+1)*Math.pow(data.dist,2));
			var d = Math.floor((Math.random()*2+1)*Math.pow(data.dist,2));
			var s = Math.floor(Math.random()*11 + 5);

			for(var star in this.entries){
				if(this.entries[star].distance == data.distance){
					continue;
				}
			}

			this.entries[data.starName] = {
				name: data.starName,
				id: data.id,
				distance: data.dist,
				planets: planets,
				faction: this.factions[x].id,
				factionId: this.factions[x].name,
				resource1: this.capitaliseFirst(resources[a]),
				resource2: this.capitaliseFirst(resources[b]),
				power: p,
				defense: d,
				speed: s,
            };

            var js = this.dataTemplate(this.entries[data.starName]);

			$('#body').append(js);
		}
	};

	instance.getRndBias = function() {
	    var unif = Math.random()*10;
	    var beta = Math.pow(Math.sin(unif*Math.PI/2),2);
	    var beta_left = (beta < 0.5) ? 2*beta : 2*(1-beta);
	    var output = Math.floor(beta_left*5)+1;
	    return output;
	}

	instance.capitaliseFirst = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
	

	return instance;

}());

window.onload = function(){
	Starloader.initialise();
}