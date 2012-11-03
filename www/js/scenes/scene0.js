function scene0(){
	var scene = new Scene("scene0", "Frontpage");

	// var katze = scene.createActor('images/katze.png', 799, 230, 300, 292);
	var katze = scene.createActor('katze.png', 799, 230, 150, 146);
	katze.plays('quack', 'katze2.png');
	katze.shakes(0, 40, 0.3);
	katze.delays(1500);
	katze.resets(1500);
	katze.drifts(-1, 0);

	var arrow = scene.createActor('arrow-right.png', 550, 450, 160, 139);
	arrow.navigatesOnTouch('scene1', 'arrow-right-active.png')

	scene.write(30, 40, "animation.io", "black");
	scene.write(30, 100, "web- and bookapp-animation<br />for artists and illustrators", "grey");
	scene.write(30, 210, 'for developer preview email your Github-name to <a href="mailto:bitte@mehreinfach.de?subject=animation.io%20developer%20preview">bitte@mehreinfach.de</a>', "small grey center")

	return scene;
};
