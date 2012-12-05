var scene9 = function(){
  this.scene = new Scene('scene9', 'Phasing');

  var box = scene.createActor('box.png', 300, 200, 200, 200);
  box.addPhase('box1.png');
  box.phaseCycle = 350;
 
  var arrow1 = scene.createActor('arrow-left.png', 30, 450);
  arrow1.navigatesOnTouch('scene6');


  scene.write(10, 10, "box.plays(quack);");

  return scene;
};