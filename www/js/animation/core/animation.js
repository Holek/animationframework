function Animation(width, height, minWidth, maxWidth){
	this.loadedScenes = new Array;
	this.stageDiv = createDiv('stage', 'stage');
	this.stageDiv.style.width = width + 'px';
	this.stageDiv.style.height = height + 'px';
	this.width = width;
	this.height = height;
	this.minWidth = minWidth;
	this.maxWidth = maxWidth;

	this.scaleToWidth = function(newWidth){
		if (this.minWidth != 0 && newWidth < this.minWidth) {
			newWidth = this.minWidth
		} else if (this.minWidth != 0 && newWidth > this.maxWidth) {
			newWidth = this.maxWidth;
		};
		var scaleFactor = newWidth / this.width;
		rescale(this.stageDiv, scaleFactor);

		// position on screen:
		window.animationwrapper.style.marginTop = ((window.innerHeight - parseInt(this.height * scaleFactor))/2) + 'px';
		window.animationwrapper.style.marginLeft = ((window.innerWidth - parseInt(this.width * scaleFactor))/2) + 'px';
	};

	this.scaleToWindowWidth = function(){
		this.scaleToWidth(window.innerWidth);
	}

	this.loadScene = function(sceneid){
		// is the scene maybe already loaded?
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id.match(sceneid)) {
				return this.loadedScenes[i];
			};
		};

		// if we reached this point, the scene isn't loaded yet.
		var newScene = eval(sceneid + '()');
		newScene.setDimensions(width, height);
		this.loadedScenes.push(newScene);
		this.stageDiv.appendChild(newScene.div);
		newScene.makeInvisible();
		return newScene;
	};

	this.showScene = function(sceneid){
		// console.log("SHOWING SCENE " + sceneid);
		this.currentScene = loadScene(sceneid);
		var sceneNum = getIntegerFromEndOfString(sceneid);
		window.location.hash = sceneNum == 0 ? '' : sceneNum; 
		this.currentScene.enterActors();
		this.currentScene.resetActors();
		this.currentScene.makeOthersInvisible();
		this.currentScene.muteOthers();
		this.dropUnneededScenes(this.currentScene.preloadSceneIds);
		this.loadNeededScenes(this.currentScene.preloadSceneIds);
	};

	this.loadedSceneIds = function(){
		var result = new Array;
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			result.push(this.loadedScenes[i].id);
		};
		return result;
	};

	this.dropUnneededScenes = function(neededScenes){
		// neededScenes: array if scene-ids
		var droplist = this.loadedSceneIds().minus(neededScenes);
		for (var i = droplist.length - 1; i >= 0; i--) {
			this.dropScene(droplist[i]);
		};
	};

	this.loadNeededScenes = function(neededScenes){
		var loadlist = neededScenes.minus(this.loadedSceneIds());
		for (var i = loadlist.length - 1; i >= 0; i--) {
			this.loadScene(loadlist[i]);
		};
	};

	this.dropScene = function(sceneid){
		for (var i = this.loadedScenes.length - 1; i >= 0; i--) {
			if (this.loadedScenes[i].id.match(sceneid)) {
				var element = document.getElementById(sceneid);
				this.stageDiv.removeChild(this.loadedScenes[i].div);
				this.loadedScenes = this.loadedScenes.without(i);
			};
		};
	};
	return this;
}

function loadAnimation(title, width, height, firstScene, minWidth, maxWidth){
	document.title = title;

	if(!browserCompatible()){
		var div = document.createElement('div');
		div.setAttribute('id', 'compatibility');
		var headline = "Please upgrade your browser"
		div.innerHTML += '<h1>' + headline + '</h1>';
		var text1 = 'You need a more modern browser to view this awesome animation.';
		div.innerHTML += '<p>' + text1 + '</p>';
		var text2 = 'More information: <a href="http://animation.io/compatible-browsers.html">http://animation.io/compatible-browsers.html</a>';
		div.innerHTML += '<p>' + text2 + '</p>';
		document.body.appendChild(div);
		return;
	}

	if (window.onload) var oldOnload = window.onload;
	window.onload = function(){
		if (oldOnload) oldOnload();

		// scroll away address bar:
		setTimeout(function() { window.scrollTo(0, 1) }, 100);

		window.animation = Animation(width, height, minWidth, maxWidth);
		window.animationwrapper = createDiv('animationwrapper', '');
		window.document.body.appendChild(window.animationwrapper);
		window.animation.scaleToWidth(window.innerWidth);
		window.animationwrapper.appendChild(this.stageDiv);

		// read scene-number from hashtag in URL or start with default:
		var sceneNum = parseInt(window.location.hash.substring(1));
		if (isNaN(sceneNum)) {
			window.animation.showScene(firstScene);
		} else{
			eval("window.animation.showScene('scene" + sceneNum + "')");
		};
		window.animation.startLoop();
	};

	if (window.onresize) var oldOnresize = window.onresize;
	window.onresize = function() {
		if(oldOnresize) oldOnresize();
		window.animation.scaleToWindowWidth();
	};
}

// requestAnim shim layer by Paul Irish
requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function startLoop(){
	this.animloop = function(){
		requestAnimFrame(animloop);
			for (var i = 0; i < window.currentScene.actors.length; i++) {
				animateactor(window.currentScene.actors[i]);
			};
	};
	this.animloop();
};