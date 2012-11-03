function Rotating(actor, hertz){
  this.spin = 360/60*hertz; // framerate 60
  this.applybehavior = function(){
    actor.spin += this.spin;
  };
}

Actor.prototype.rotates = function(hertz, ontouch) {
  var behaviour = new Rotating(this, hertz);
  if (ontouch) {
    behaviour.ontouch = true;
  };
  this.addBehavior(behaviour);
};

Actor.prototype.rotatesOnTouch = function(hertz) {
  this.reacts("this.actor.rotates(" + hertz + ", true);");
};
