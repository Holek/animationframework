var Actor = function(imagePath, startX, startY, imagesizeX, imagesizeY){
	var defaultImageDirectory = 'images/';
	var defaultAudioDirectory = 'audio/';

	this.startAnimationTimestamp = new Date().getTime();
	this.resetStartAnimationTimestamp = function(){
		this.startAnimationTimestamp = new Date().getTime();
	}

	this.startPosition = {x: startX, y: startY}; // for resetting
	this.vector = {x: 0, y: 0};

	this.tilt = 0;
	this.spin = 0;

	this.behaviors = new Array;
	this.phases = new Array;
	this.oldPhase = 0;
	this.phaseCycle = 1000;
	this.enteredAt = null; // set when actor enters

	this.doesReset = false;
	this.waitingForReset = false;
	this.waitingForResetSince = null;

	this.currentOpacity = 1;
	var scene = null; // should be set later;

	this.originaldelay = 0;
	this.delay = 0;

	this.navigatesOnTouch = function(sceneid, secondImageFilename) {
	  this.reacts("window.animation.showScene('" + sceneid + "')", secondImageFilename);
	  this.image.className += 'navigation';
	  this.scene.preloadSceneIds.push(sceneid);
	};

	this.delays = function(myDelay){
		this.originaldelay = myDelay;
		this.delay = myDelay;
	};

	this.age = function(){
		return (new Date().getTime() - this.startAnimationTimestamp);
	};

	this.setOpacity = function(newOpacity){
		if (newOpacity != this.currentOpacity) {
			this.currentOpacity = newOpacity;
			this.image.style.opacity = this.currentOpacity;
		};
	};

	this.resets = function(resetDelay){
		// called in scenes when an actor should be resetting
		this.doesReset = true;
		if (typeof resetDelay === "undefined") {
			resetDelay = 0;
		};
		this.resetDelay = resetDelay;
	};

	this.reset = function(){
		// reset all behaviors
		for (var i = 0; i < this.behaviors.length; i++){
			try {
				if (this.behaviors[i].ontouch) {
					delete this.behaviors[i];
				} else {
					this.behaviors[i].reset();
				};
			} catch(e){};
		};

		this.image.src = defaultImageDirectory + this.image.originalPath;
		this.resetStartAnimationTimestamp();
		this.position = {x: startX, y: startY};
		this.vector = {x: 0, y: 0};
		this.setSize(imagesizeX, imagesizeY);
		this.setOpacity(1);
		this.delay = this.originaldelay;
		this.finishedDelaying = false;
		this.startedDelayingAt = null;
		this.tilt = 0;
		moveActor(this);
		tiltActor(this);
	};

	this.setSize = function(width, height){
		this.imagesize = {x: width, y: height};
		this.image.style.width = width + 'px';
		this.image.style.height = height + 'px';
	}

	this.enter = function(myScene){
		myScene.div.appendChild(this.image);
		this.enteredAt = new Date().getTime();
	};

	this.addBehavior = function(myBehavior){
		try {
			myBehavior.reset();
		} catch(e){}
		this.behaviors.push(myBehavior);
	};

	// variables for delayed start:
	if (typeof delay != 'undefined'){
		this.delay = parseInt(delay); // milliseconds it takes the actor to launch
		this.startedDelayingAt = null; // should be Date.now() once started
		this.finishedDelaying = false; // should be set to true once done
	}

	this.addPhase = function(phaseImagePath){
		var tmpImage = document.createElement('img');
		tmpImage.setAttribute('src', defaultImageDirectory + phaseImagePath);
		this.phases.push(defaultImageDirectory + phaseImagePath);
	};

	this.setPhaseCycleLength = function(milliseconds){
		this.phaseCycle = milliseconds;
	};

	this.currentPhase = function(){
		var myPhase = 0;
		var numberOfPhases = this.phases.length;

		if (numberOfPhases > 1) {
			// we have an original image and an extra phase image
			var passedTimeSinceEntered = new Date().getTime() - this.enteredAt;
			var lengthOfPhase = this.phaseCycle  / numberOfPhases;
			var rest = passedTimeSinceEntered % (numberOfPhases * lengthOfPhase);
			myPhase = parseInt(rest / lengthOfPhase);
		}
		return myPhase;
	};

	this.setup = function(){
		this.image = document.createElement('img');
		this.image.originalPath = imagePath;
		this.image.setAttribute('src', defaultImageDirectory  + this.image.originalPath);
		this.image.actor = this;
		this.phases.push(defaultImageDirectory + imagePath);

		this.position = {x: startX, y: startY};
		this.setSize(imagesizeX, imagesizeY);
		this.vector = {x: 0, y: 0};

		moveActor(this);
	};
	this.setup();
};

function moveActor(actor){
	actor.position.x += actor.vector.x;
	actor.position.y += actor.vector.y;
	actor.image.style.left = actor.position.x + 'px';
	actor.image.style.top = actor.position.y + 'px';
	actor.vector = {x: 0, y: 0};
}

function tiltActor(actor){
	actor.tilt = (actor.tilt + actor.spin) % 360;
	actor.image.style.transform = 'rotate(' + actor.tilt + 'deg)'; // Firefox
	actor.image.style.webkitTransform = 'rotate(' + actor.tilt + 'deg)'; // Webkit (Chrome, Safari)
	actor.image.style.msTransform = 'rotate(' + actor.tilt + 'deg)'; // Webkit (Chrome, Safari)
	actor.image.style.OTransform = 'rotate(' + actor.tilt + 'deg)'; //Opera
	actor.spin = 0;
};

function visibleOnStage(actor){
	return !notVisibleOnStage;
};

function notVisibleOnStage(actor){
	return (actor.position.x > actor.scene.dimensions.x) || ((actor.position.x + actor.imagesize.x) < 0) || ((actor.position.y + actor.imagesize.y) < 0) || (actor.position.y > actor.scene.dimensions.y);
};

function animateactor(actor){
	if (notVisibleOnStage(actor)) {
		// console.log("actor " + actor.image.src + " is waiting for reset");
			if (actor.waitingForReset) {
				if ((t() - actor.waitingForResetSince) >= actor.resetDelay) {
					actor.reset();
					actor.waitingForReset = false;
				}
		} else if (actor.doesReset) {
			// console.log("actor " + actor.image.src + " should start resetting");
			actor.setOpacity(0);
			actor.waitingForReset = true;
			actor.waitingForResetSince = t();
		}
	}
	else if ((actor.delay > 0) && !actor.finishedDelaying) {
		// NEEDS TO DELAY
		if (actor.startedDelayingAt == null) {
			// start delaying
			actor.startedDelayingAt = t();
		} else if (t() >= (actor.startedDelayingAt + actor.delay)) {
			// stop delaying
			actor.finishedDelaying = true;
		} /* else {
			// still delaying
		} */
	} else {
		// DOESN'T NEED TO DELAY

		if (actor.phases.length > 1) {
			if (actor.currentPhase() != actor.oldPhase) {
				actor.image.src = actor.phases[actor.currentPhase()];
				actor.oldPhase = actor.currentPhase();
			}
		}

		// run through all behaviors
		for (var i = 0; i < actor.behaviors.length; i++){
			actor.behaviors[i].applybehavior();
		}

		if ((actor.vector.x != 0) || (actor.vector.y != 0)){
			moveActor(actor);
		}

		if (actor.spin != 0) {
			tiltActor(actor);
		};
	}
}
