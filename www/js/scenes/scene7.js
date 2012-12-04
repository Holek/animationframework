var scene7 = function(){
  this.scene = new Scene('scene7', 'Drifting');

  var box = scene.createActor('box.png', 100, 120, 200, 200);
  box.drifts(0.25,0.1);
  box.resets();

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene6');


  scene.write(10, 10, "box.drifts(0.25,0.1);");

  return scene;
};
