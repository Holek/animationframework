function scene0(){
	var scene = new Scene("scene0", "Frontpage");

	var star = scene.createActor('pink_star.png', 200, 150, 300, 300);
	star.rotates(.2);
	star.drawsLine(20, 30, 100, 100);

	return scene;
};
