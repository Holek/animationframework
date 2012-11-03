function Linking(actor, url){
	this.actor = actor;
	this.url = url

	if( /iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		// this.actor.image.addEventListener('touchstart', function(){this.gotourl();}, false);
		bindEvent(this.actor.image, 'touchstart', function(){this.gotourl();});
	} else {
		//this.actor.image.addEventListener('mousedown', function(){this.gotourl();}, false);
		bindEvent(this.actor.image, 'mousedown', function(){this.gotourl();});
	}

	this.actor.image.gotourl = function(){
		this.removeEventListener('mousedown',arguments.callee, false);
		
		location.href=url;
	}


	this.actor.image.style.cursor = 'pointer';

	this.applybehavior =  function(){
		// nothing here
	};
}

Actor.prototype.links = function(url) {
	this.addBehavior(new Linking(this, url));
};
