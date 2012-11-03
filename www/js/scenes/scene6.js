var scene6 = function(){
  this.scene = new Scene('scene6', 'Pulsates');

  var box = scene.createActor('box.png', 300, 120, 200, 200);
  box.pulsates(1, 1);

  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene5');

  var arrow2 = scene.createActor('arrow-right.png', 550, 440);
  arrow2.navigatesOnTouch('scene7');

  scene.write(100, 20, "You can even let the actors pulsate!");

  return scene;
};
