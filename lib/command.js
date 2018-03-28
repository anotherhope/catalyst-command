const Option 	= require('./option');
const minimist 	= require('minimist');
const colors	= require('colors');

let Instance 	= false;

class Command {
	static register(options = [],noKeyArgs = false){
		if(!Instance){
			     Instance = new this(options,noKeyArgs);
		} return Instance;
	}

	static get(property){
		return Instance ? Instance[property] : this.register().constructor.get(property);
	}

	constructor(options = [],noKeyArgs = false){
		this.options 	= [];
		options.push({
			"description" : "show Help",
			"short" 	  : "h",
			"long"  	  : "help"
		});
		this.setOption(options);
		this.noKeyArgs = noKeyArgs;
		this.parse(minimist(process.argv.slice(2)));
	}
	setOption(settings){
		for (let setting of settings){
			this.options.push(new Option(setting));
		}
		return this;
	}
	parse(args){
		if(!this.argIsRegistered(args)){
			this.showHelp();
		}

		for (let arg in args) {
			this[arg] = args[arg];
		}
	}
	showHelp(){
		let currentContext = false;
		let max 		   = {};
		for(let setting of this.options){
			for (let ps in setting){
				if (setting[ps].constructor.name === Array.name){
					let maxR = 0;
					for (let v of setting[ps]){ maxR = maxR < v.length + 1 ? v.length + 1 : maxR; }
					max[ps] = !max[ps] || max[ps] < maxR ? maxR : max[ps];
				} else {
					max[ps] = !max[ps] || max[ps] < setting[ps].length + 1 ? setting[ps].length + 1 : max[ps];
				}
			}
		}

		for(let setting of this.options.sort(Option.filter)){
			if(currentContext !== setting.context){
				console.log();
				console.log(setting.context + ' Commands');
				currentContext = setting.context;
			}

			let descriptionCount = setting.description.constructor.name === Array.name ? setting.description.length : 1;
			let valuesCount 	 = setting.values.constructor.name === Array.name 	   ? setting.values.length 		: 1;
			let maxCount		 = descriptionCount > valuesCount ? descriptionCount : valuesCount;
			for (let dk = 0;dk < maxCount; dk++){
				 let dashes = !dk ? "-" : " ";
				 console.log(
				 	"    ",
					dashes + 		  (!dk ? setting.short : "").padEnd(max.short),
					dashes + dashes + (!dk ? setting.long  : "").padEnd(max.long),
					setting.values[dk] ? setting.values[dk] === setting.default ? setting.values[dk].padEnd(max.values).green : setting.values[dk].padEnd(max.values) : ''.padEnd(max.values),
					setting.description.constructor.name === Array.name 
						? setting.description[dk] ? setting.description[dk].padEnd(max.description) : ''.padEnd(max.description)
						: !dk ? setting.description : ''.padEnd(max.description)
				 );
			}
		}
		console.log();
		process.exit();
	}
	argIsRegistered(args){
		let matched    = [];
		let notMatched = [];

		if(args._.length > 0 && !this.noKeyArgs){
			return false;
		}

		for(let argName in args){
			if(argName !== "_"){
				for(let setting of this.options){
					if (argName.length === 1 && argName === setting.short
					||  argName.length > 1   && argName === setting.long){
						if (setting.short !== "h" || setting.long !== "help"){ 
							matched.push(argName);
						}
					}
				}

				if(matched.indexOf(argName) < 0){
					notMatched.push(argName);
				}
			}
		}

		if(notMatched.length > 0){
			return false;
		}

		return true;
	}
}

module.exports = Command;