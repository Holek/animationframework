var scene4 = function(){
  var scene = new Scene('scene4', 'Dissolving');

  var box1 = scene.createActor('box.png', 100, 120, 200, 200);
  box1.dissolves(1000, 10000);

  var box2 = scene.createActor('box.png', 500, 120, 200, 200);
  box2.dissolvesOnTouch(5000);

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene3');

  var arrow2 = scene.createActor('arrow-right.png', 600, 440);
  arrow2.navigatesOnTouch('scene5');

  scene.write(100, 10, "actor.dissolves(1000, 10000);");
  scene.write(100, 350, "actor.dissolvesOnTouch(5000);");

  return scene;
};
