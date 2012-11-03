var scene2 = function(){
  var scene = new Scene('scene2', 'Reacting');

  var box1 = scene.createActor('box.png', 100, 120);
  box1.shakes(30, 30, 2);

  var box2 = scene.createActor('box.png', 450, 120);
  box2.shakesOnTouch(30, 30, 2);

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene1');

  var arrow2 = scene.createActor('arrow-right.png', 670, 450);
  arrow2.navigatesOnTouch('scene3');

  scene.write(100, 10, "box.shakes(30, 30, 2)");
  scene.write(100, 350, "box.shakesOnTouch(30, 30, 2)");

  return scene;
}
