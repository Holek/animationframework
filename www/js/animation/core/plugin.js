function Plugin(delay, easeIn){
  this.delay = delay;

  this.easeIn = (typeof easeIn != 'undefined') ? easeIn : 0;
  this.needsToCalculateEasein = this.easeIn > 0;

  this.startAnimationTimestamp = new Date().getTime();

  this.resetStartAnimationTimestamp = function(){
    this.startAnimationTimestamp = new Date().getTime();
  };

  this.applybehavior =  function(){
    // should be overwritten, if actually used.
  };

  this.resetPlugin = function(){
    this.resetStartAnimationTimestamp();
    this.needsToCalculateEasein = this.easeIn > 0;
    // console.log("resetting plugin");
  };

  this.age = function(){
    return (new Date().getTime() - this.startAnimationTimestamp);
  };

  this.factor = function(){
    // cosinus ease-in
    if (this.needsToCalculateEasein && this.easeIn > 0 && this.age() < this.easeIn) {
      return Math.cos(((this.age()/this.easeIn) * (Math.PI/2)) - (Math.PI/2));
    } else {
      this.needsToCalculateEasein = false;
      return 1;
    };
  };

  return this;
};
