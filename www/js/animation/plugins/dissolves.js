function Dissolving(actor, startAt, dissolveLength){
  this.actor = actor;
  var originalOpacity = this.actor.currentOpacity;
  var newOpacity;

  this.reset = function(){
    this.actor.setOpacity(originalOpacity);
    this.dissolveStartedAt = new Date().getTime();
  };

  this.applybehavior = function(){
    if (this.actor.currentOpacity > 0 && (this.actor.age() > startAt)) {
      if (typeof this.dissolveStartedAt === "undefined") {
        this.dissolveStartedAt = new Date().getTime();
      };

      newOpacity = 1 + ((this.dissolveStartedAt - (new Date().getTime())) / dissolveLength);
      this.actor.setOpacity(newOpacity);
    };
  };
}

Actor.prototype.dissolves = function(startAt, dissolveLength) {
  this.addBehavior(new Dissolving(this, startAt, dissolveLength));
};

Actor.prototype.dissolvesOnTouch = function(dissolveLength){
  this.reacts("this.actor.dissolves(new Date().getTime() - this.actor.startAnimationTimestamp," + dissolveLength + ");");
};
