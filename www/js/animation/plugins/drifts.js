function Drifting(actor, forceX, forceY){
	this.reset = function(){
		this.force = {x: forceX, y: forceY};
	};
	this.reset();

	this.applybehavior = function(){
		actor.vector.x += this.force.x;
		actor.vector.y += this.force.y;
	};
}

Actor.prototype.drifts = function(forceX, forceY) {
  this.addBehavior(new Drifting(this, forceX, forceY));
};
