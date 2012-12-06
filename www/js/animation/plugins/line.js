function LineDrawer(actor, imageX, imageY, sceneX, sceneY){

  var lineElement = document.createElement('div'),
      rad2Deg = 180 / Math.PI;
  lineElement.style.borderTop = "1px solid #000";
  lineElement.style.height = "1px";
  lineElement.style.position = "absolute";
  lineElement.style.transformOrigin = "0 0";
  lineElement.style.webkitTransformOrigin = "0 0";
  actor.scene.div.appendChild(lineElement);
  this.applybehavior = function(){
    var actorAngle = actor.tilt + actor.spin;
    var sin = Math.sin(actorAngle)
      , cos = Math.cos(actorAngle)
      , x = actor.position.x
      , y = actor.position.y
      , newX, newY, angle, a,b,c;
    newX = (imageX * cos - imageY * sin) + x;
    newY = (imageX * sin + imageY * cos) + y;
    a = Math.abs(sceneY-newY);
    b = Math.abs(sceneX-newX);
    c = Math.sqrt((a*a)+(b*b));
    angle = 360 - (Math.asin(a/c) * rad2Deg);
    lineElement.style.width = c + "px";
    lineElement.style.top = (newY + a) + "px";
    lineElement.style.left = (newX + b) + "px";
    // lineElement.style.transform = "rotate: "+ angle + "deg";
    // lineElement.style.mozTransform = "rotate: "+ angle + "deg";
    lineElement.style.webkitTransform = "rotate("+ angle + "deg)";
    // lineElement.style.msTransform = "rotate: "+ angle + "deg";
    // lineElement.style.oTransform = "rotate: "+ angle + "deg";

    actor.position.x;
  }
}

Actor.prototype.drawsLine = function(imageX, imageY, sceneX, sceneY) {
  this.addBehavior(new LineDrawer(this, imageX, imageY, sceneX, sceneY));
};