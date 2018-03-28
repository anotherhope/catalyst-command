class Option {
	constructor(settings){
		this.long 	 	 = settings.long 		|| "";
		this.short  	 = settings.short  		|| "";
		this.description = settings.description || "no description";
		this.context	 = settings.context 	|| "Global";
		this.default	 = settings.default		|| "";
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