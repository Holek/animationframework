function Animation(width, height, minWidth, maxWidth, minHeight, maxHeight){
	this.loadedScenes = new Array;
	this.stageDiv = createDiv('stage', 'stage');
	this.stageDiv.style.width = width + 'px';
	this.stageDiv.style.height = height + 'px';
	this.width = width;
	this.height = height;
	this.minWidth = minWidth;
	this.maxWidth = maxWidth;
	this.minHeight = minHeight;
	this.maxHeight = maxHeight;

	this.scaleToWindow = function(){
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		var newHeight = winHeight;
		var newWidth = winWidth;
		var winWidth = winWidth

		var windowFactor = window.innerWidth / window.innerHeight;
		var animationFactor = this.width / this.height;

		if (this.minWidth != 0 && (animationFactor > windowFactor)) {
			// the WIDTH has to be set
			if (winWidth < this.minWidth) {
				winWidth = this.minWidth
			} else if (winWidth > this.maxWidth) {
				winWidth = this.maxWidth;
			};
			var scaleFactor = winWidth / this.width;
			newHeight = winWidth * scaleFactor;

		} else if (this.minWidth != 0){
			// the HEIGHT has to be set
			if (winHeight < this.minHeight) {
				winHeight = this.minHeight
			} else if (winHeight > this.maxHeight) {
				winHeight = this.maxHeight;
			};
			var scaleFactor = winHeight / this.height;
			newWidth = winHeight * scaleFactor;
		};

		if (scaleFactor != 1) {
			rescale(this.stageDiv, scaleFactor);
		};

		// position on screen:
		window.animationwrapper.style.marginTop = ((window.innerHeight - parseInt(this.height * scaleFactor))/2) + 'px';
		window.animationwrapper.style.width = newWidth + 'px';
		window.animationwrapper.style.marginLeft = ((window.innerWidth - parseInt(this.width * scaleFactor))/2) + 'px';
		window.animationwrapper.style.height = newHeight + 'px';
	};

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

function loadAnimation(title, width, height, firstScene, minWidth, maxWidth, minHeight, maxHeight){
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

		window.animation = Animation(width, height, minWidth, maxWidth, minHeight, maxHeight);
		window.animationwrapper = createDiv('animationwrapper', '');
		window.document.body.appendChild(window.animationwrapper);
		window.animation.scaleToWindow();
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
		window.animation.scaleToWindow();
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
