function LineDrawer(actor, imageX, imageY, sceneX, sceneY){

  var lineElement = document.createElement('div'),
      rad2Deg = 180 / Math.PI,
      deg2Rad = Math.PI / 180;
  lineElement.style.borderTop = "1px solid #000";
  lineElement.style.height = "10px";
  lineElement.style.backgroundColor = "#F00";
  lineElement.style.position = "absolute";
  lineElement.style.transformOrigin = "0 0";
  lineElement.style.webkitTransformOrigin = "0 0";
  actor.scene.div.appendChild(lineElement);
  this.applybehavior = function(){
    var actorAngle = actor.tilt + actor.spin;
    var sin = Math.sin(actorAngle * deg2Rad)
      , cos = Math.cos(actorAngle * deg2Rad)
      , x = actor.position.x
      , y = actor.position.y
      , newX, newY, angle, a,b,c;

  /*
  [x'] = [x*cos(alpha) - y*sin(alpha)]
  [y'] = [x*sin(alpha) + y*cos(alpha)]

  */
    newX = ((imageX) * cos - (imageY) * sin);
    newY = ((imageX) * sin + (imageY) * cos);
    a = (sceneY-newY);
    b = (sceneX-newX);
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
