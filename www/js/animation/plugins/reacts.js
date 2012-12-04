function Reacting(actor, action, actionimagepath, actionimagelength){
	var reacting = new Plugin(0, 0);
	reacting.actor = actor;
	reacting.actor.action = action;

	// preloading:
	if (typeof actionimagepath != 'undefined'){
		actionimagepath = 'images/' + actionimagepath;
		document.createElement('img').setAttribute('src', actionimagepath);
		reacting.actor.image.actionimagepath = actionimagepath;
	};

	var myEventType;
	if( /iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		myEventType = 'touchstart';
	 } else {
		myEventType = 'mousedown';
	};
	bindEvent(reacting.actor.image, myEventType, function(){changeImageAndReact.call(reacting.actor.image);});

	reacting.actor.image.style.cursor = 'pointer';

	return reacting;
};

function changeImageAndReact(e){
	if (typeof this.actionimagepath != 'undefined'){
		// if actionimagepath was set, we will switch the image state on touch
		this.originalimagepath = this.src;
		this.src = this.actionimagepath;

		if((typeof actionimagelength != "undefined") && parseInt('0' + actionimagelength) > 0){
			// if "actionimagelength" was set, the image will be switched
			// to original image after some time
			var that = this;
			window.setTimeout(function(){parseInt(that.src = that.originalimagepath)}, 200);
		}
	}
	eval(this.actor.action);
}

Actor.prototype.reacts = function(action, actionimagepath, actionimagelength) {
	this.addBehavior(new Reacting(this, action, actionimagepath, actionimagelength));
};
