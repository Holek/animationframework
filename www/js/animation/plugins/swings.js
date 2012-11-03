function Swinging(actor, radius, hertz, swingcenterX, swingcenterY){
	var runningValue = 0;

	this.applybehavior = function(){
		runningValue = Math.sin((new Date) * hertz/1000);
		degrees = (runningValue * radius);

		actor.image.style.webkitTransformOrigin = swingcenterX + 'px ' + swingcenterY + 'px';
		actor.image.style.webkitTransform = 'rotate(' + degrees/2 + 'deg)';
	};
};

Actor.prototype.swings = function(radius, hertz, swingcenterX, swingcenterY) {
  this.addBehavior(new Swinging(this, radius, hertz, swingcenterX, swingcenterY));
};
