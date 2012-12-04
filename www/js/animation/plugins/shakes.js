function Shaking(actor, peakX, peakY, hertz){
	this.reset = function(){
		this.peak = {x: (peakX/2), y: (peakY/2)};
		this.hertz = hertz;
		this.actor = actor;
		this.force = {x: 0, y: 0};
	};

	this.applybehavior = function(){
		if (typeof this.shakingStartedAt === "undefined") {
			this.shakingStartedAt = new Date().getTime();
		};

		this.tmpValue = Math.sin((this.shakingStartedAt - new Date().getTime()) * this.hertz/250);

		if (typeof this.lastTmpValue != "undefined"){
		  this.actor.vector.x += (this.lastTmpValue - this.tmpValue) * this.peak.x;
		  this.actor.vector.y += (this.lastTmpValue - this.tmpValue) * this.peak.y;
		};

    this.lastTmpValue = this.tmpValue;
	};
};

Actor.prototype.shakes = function(peakX, peakY, hertz) {
	this.addBehavior(new Shaking(this, peakX, peakY, hertz));
};

Actor.prototype.shakesOnTouch = function(peakX, peakY, hertz) {
	this.reacts("this.actor.shakes(" + peakX + "," + peakY + "," + hertz + ");")
	// when tapped multiple times, the shaking becomes stronger as
	// shaking adds up
};
