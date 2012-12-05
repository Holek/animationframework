var scene8 = function(){
  this.scene = new Scene('scene8', 'Playing');

  var box = scene.createActor('box.png', 300, 200, 200, 200);
  box.plays('quack', 'box1.png');

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene6');


  scene.write(10, 10, "box.plays(quack);");

  return scene;
};
