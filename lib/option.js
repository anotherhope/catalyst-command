class Option {
	constructor(settings){
		this.long 	 	 = settings.long 		|| false;
		this.short  	 = settings.short  		|| false;
		this.description = settings.description || "no description";
		this.context	 = settings.context 	|| "Global";
		this.default	 = settings.default		|| false;
		this.values		 = settings.values		|| [];
		this.current	 = settings.current		|| false;
	}
	static filter (a, b){
		return b.context === "Global" ? 1 
			 : a.context === "Global" ? -1 
			 : a.context.localeCompare(b.context);
	}
}

module.exports = Option;