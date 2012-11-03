function Scene(id, title){
	this.id = id;
	this.title = (typeof title != 'undefined' ? title : id);
	this.div = createDiv(id, 'scene');

	this.stage = null; // will be set when putting on stage
	this.dimensions = {x: 0, y: 0}; // will be set when putting on stage
	this.isVisible = false;
	this.actors = new Array;

	// scene itself should preload as minimum,
	// further preload-scenes are added by the navigates-plugin
	this.preloadSceneIds = [id];

	this.resetActors = function(){
		for (var i = this.actors.length - 1; i >= 0; i--) {
			this.actors[i].reset();
		};
	};

	this.setDimensions = function(width, height){
		this.dimensions = {x: width, y: height};
		this.div.style.width = this.dimensions.x + 'px';
		this.div.style.height = this.dimensions.y + 'px';
	};

	this.makeVisible = function(){
		this.div.style.visibility = 'visible';
		this.isVisible = true;
	};

	this.makeInvisible = function(){
		this.div.style.visibility = 'hidden';
		this.isInvisible = false;
		this.resetActors(); // while we are at it
	};
	this.makeInvisible(); // start out invisible

	this.makeOthersInvisible = function(){
		for (var i = window.animation.loadedScenes.length - 1; i >= 0; i--) {
			if (window.animation.loadedScenes[i].id.match(this.id)) {
				this.makeVisible();
			} else {
				window.animation.loadedScenes[i].makeInvisible();
			};
		};
	};

	this.createActor = function(filename, startAtX, startAtY, width, height){
		var actor = new Actor(filename, startAtX, startAtY, width, height);
		actor.scene = this;
		this.actors.push(actor);
		return actor;
	};

	this.enterActors = function(){
		for (var i = 0; i < this.actors.length; i++) this.actors[i].enter(this);
	};

	this.switchOffAudio = function(){
		for (var i = 0; i < window.stage.scene.actors.length; i++) {
			try {
				window.stage.scene.actors[i].pauseAudio();
			} catch(e){}
		};
	};

	this.putOnStage = function(myStageDiv){
		myStageDiv.appendChild(this.div);
		myStageDiv.scene = this;
		this.stage = myStageDiv;

		// get dimensions and set css-size according to stage
		this.dimensions = {x: parseInt(myStageDiv.style.width), y: parseInt(myStageDiv.style.height)};
		this.div.style.width = this.dimensions.x + 'px';
		this.div.style.height = this.dimensions.y + 'px';

		for (var i = 0; i < window.stage.scene.actors.length; i++)
		  this.actors[i].enter(this);

		this.hideOtherScenes();
	};

	this.write = function(myX, myY, html, cssclass){
		var newText = document.createElement('div');
		newText.innerHTML = html;
		newText.setAttribute('class', 'text ' + (typeof cssclass === "undefined" ? "" : cssclass));
		newText.style.left = myX + 'px';
		newText.style.top = myY + 'px';
		this.div.appendChild(newText);
	};

	return this;
};
