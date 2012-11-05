var scene5 = function(){
  this.scene = new Scene('scene5', 'Waving');

  var box1 = scene.createActor('box.png', 300, 120, 200, 200);
  box1.waves(15, 0.25, 100, 200);

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene4');

  var arrow2 = scene.createActor('arrow-right.png', 610, 430, 160, 139);
  arrow2.navigatesOnTouch('scene6', 'arrow-right-active.png');

  scene.write(100, 10, "actor.waves(15, 0.25, 100, 200);");

  return scene;
};
