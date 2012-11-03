function Playing(actor, audioFilename, playingImagePath){
	var playing = new Plugin(0, 0);
	playing.actor = actor;
	playing.actor.playingImagePath = 'images/' + playingImagePath;
	playing.actor.waitingImagePath = playing.actor.image.src;

	playing.actor.showPlayingImage = function(){
		this.image.src = this.playingImagePath;
	};

	playing.actor.showWaitingImage = function(){
		this.image.src = this.waitingImagePath;
	};

	playing.actor.audio = document.createElement('audio');
	var source = document.createElement('source');

	if (playing.actor.audio.canPlayType('audio/mpeg;')) {
	    source.type = 'audio/mpeg';
	    source.src= 'audio/' + audioFilename + '.mp3';
	} else {
	    source.type= 'audio/ogg';
	    source.src= 'audio/' + audioFilename + '.mp3';
	}

	playing.actor.audio.appendChild(source);
	playing.actor.audio.actor = playing.actor;
	playing.actor.audio.load();


	bindEvent(playing.actor.audio, 'ended', function(){
		this.actor.showWaitingImage(this.actor);
		this.actor.audioplaying = false;
	});

	playing.actor.audioplaying = false;
	playing.actor.toggleAudio = function(){
		// when this is called, "this" referres to the actor!
		if (!this.audioplaying) {
			// audio is not playing, let's start it
			if (this.audio.currentTime) {
				this.audio.currentTime = 0;				
			};
			this.audio.play();
			this.showPlayingImage();
			this.audioplaying = true;
		} else {
			// audio is playing, let's stop it
			this.audio.pause();
			this.audioplaying = false;
			this.showWaitingImage();
		};
	};

	playing.actor.pauseAudio = function(){
		this.audio.pause();
	};

	playing.actor.addBehavior(new Reacting(actor, 'this.actor.toggleAudio();'));

	return playing;
}

Actor.prototype.plays = function(audioFilename, playingImagePath) {
	this.addBehavior(new Playing(this, audioFilename, playingImagePath));
};
