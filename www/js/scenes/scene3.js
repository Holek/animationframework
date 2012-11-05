var scene3 = function(){
	var scene = new Scene('scene3', 'Rotation');

	var box1 = scene.createActor('box.png', 100, 120);
	box1.rotates(0.05);

	var box2 = scene.createActor('box.png', 500, 120);
	box2.rotatesOnTouch(-0.05);

	var arrow1 = scene.createActor('arrow-left.png', 30, 450);
	arrow1.navigatesOnTouch('scene2');

	var arrow2 = scene.createActor('arrow-right.png', 610, 430, 160, 139);
	arrow2.navigatesOnTouch('scene4', 'arrow-right-active.png');

	scene.write(100, 10, "box.rotates(0.05)");
	scene.write(100, 350, "box.rotatesOnTouch(-0.05)");

	return scene;
};
