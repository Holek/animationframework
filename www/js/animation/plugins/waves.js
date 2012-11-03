function Waving(actor, radius, hertz, centerOffsetX, centerOffsetY){
	this.reset = function(){
		this.actor = actor;
		this.hertz = hertz;
		this.radius = radius;
	};

	this.applybehavior = function(){
		if (typeof this.wavingStartedAt === "undefined") {
			this.wavingStartedAt = new Date().getTime();
		};

		this.skew = Math.sin((this.wavingStartedAt - (new Date().getTime())) * this.hertz/1000) * this.radius;

		this.actor.image.style.webkitTransformOrigin = centerOffsetX + 'px ' + centerOffsetY + 'px';
		this.actor.image.style.webkitTransform = 'skew(' + this.skew + 'deg, 0deg)';

		this.actor.image.style.transformOrigin = centerOffsetX + 'px ' + centerOffsetY + 'px';
		this.actor.image.style.transform = 'skew(' + this.skew + 'deg, 0deg)';

		this.actor.image.style.msTransformOrigin = centerOffsetX + 'px ' + centerOffsetY + 'px';
		this.actor.image.style.msTransform = 'skew(' + this.skew + 'deg, 0deg)';

		this.actor.image.style.OTransformOrigin = centerOffsetX + 'px ' + centerOffsetY + 'px';
		this.actor.image.style.OTransform = 'skew(' + this.skew + 'deg, 0deg)';
	};
}

Actor.prototype.waves = function(radius, hertz, centerOffsetX, centerOffsetY) {
	this.addBehavior(new Waving(this, radius, hertz, centerOffsetX, centerOffsetY));
};
