var scene1 = function(){
  this.scene = new Scene('scene1', 'Moving');

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene0');

  var arrow2 = scene.createActor('arrow-right.png', 500, 450);
  arrow2.navigatesOnTouch('scene0');

  var arrow2 = scene.createActor('arrow-right.png', -150, 250, 160, 139);
  arrow2.moves(0.1, 0);
  arrow2.resets(500);
  arrow2.navigatesOnTouch('scene2');

  scene.write(20, 20, "The most basic animation is to move something around.<br />Here we are moving around the arrow that leads to the next scene.");

  return scene;
}
