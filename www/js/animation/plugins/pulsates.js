function Pulsating(actor, hertz, strength, howoften){
	this.applybehavior = function(){
		var scale = 1 + (strength/20 * Math.sin((new Date*hertz*2) / 500));
		actor.image.style.webkitTransform = 'scale(' + scale + ', ' + scale + ')';
	};
}

Actor.prototype.pulsates = function(hertz, strength, howoften) {
  this.addBehavior(new Pulsating(this, hertz, strength, howoften));
};
