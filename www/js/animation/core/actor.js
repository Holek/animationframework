var Actor = function (a, b, c, d, f) {
    this.startAnimationTimestamp = (new Date).getTime();
    this.resetStartAnimationTimestamp = function () {
        this.startAnimationTimestamp = (new Date).getTime()
    };
    this.startPosition = {
        x: b,
        y: c
    };
    this.vector = {
        x: 0,
        y: 0
    };
    this.spin = this.tilt = 0;
    this.behaviors = [];
    this.phases = [];
    this.oldPhase = 0;
    this.phaseCycle = 1E3;
    this.enteredAt = null;
    this.waitingForReset = this.doesReset = !1;
    this.waitingForResetSince = null;
    this.originalOpacity = this.currentOpacity = 1;
    this.delay = this.originaldelay = 0;
    this.navigatesOnTouch = function (a, c) {
        this.reacts("window.animation.showScene('" + a + "')", c);
        this.image.className += "navigation";
        this.scene.preloadSceneIds.push(a)
    };
    this.delays = function (a) {
        this.delay = this.originaldelay = a
    };
    this.age = function () {
        return (new Date).getTime() - this.startAnimationTimestamp
    };
    this.alterOpacity = function (a) {
        a != this.currentOpacity && (this.currentOpacity = a, this.image.style.opacity = this.currentOpacity)
    };
    this.setOpacity = function (a) {
        a != this.currentOpacity && (this.currentOpacity = this.originalOpacity = a, this.image.style.opacity = this.currentOpacity)
    };
    this.resets = function (a) {
        this.doesReset = !0;
        "undefined" === typeof a && (a = 0);
        this.resetDelay = a
    };
    this.reset = function () {
        for (var a = 0; a < this.behaviors.length; a++) try {
            this.behaviors[a].ontouch ? delete this.behaviors[a] : this.behaviors[a].reset()
        } catch (g) {}
        this.image.src = "images/" + this.image.originalPath;
        this.resetStartAnimationTimestamp();
        this.position = {
            x: b,
            y: c
        };
        this.vector = {
            x: 0,
            y: 0
        };
        this.setSize(d, f);
        this.setOpacity(this.originalOpacity);
        this.delay = this.originaldelay;
        this.finishedDelaying = !1;
        this.startedDelayingAt = null;
        this.tilt = 0;
        moveActor(this);
        tiltActor(this)
    };
    this.setSize = function (a, c) {
        this.imagesize = {
            x: a,
            y: c
        };
        this.image.style.width = a + "px";
        this.image.style.height = c + "px"
    };
    this.enter = function (a) {
        a.div.appendChild(this.image);
        this.enteredAt = (new Date).getTime()
    };
    this.addBehavior = function (a) {
        try {
            a.reset()
        } catch (c) {}
        this.behaviors.push(a)
    };
    "undefined" != typeof delay && (this.delay = parseInt(delay), this.startedDelayingAt = null, this.finishedDelaying = !1);
    this.addPhase = function (a) {
        document.createElement("img").setAttribute("src",
            "images/" + a);
        this.phases.push("images/" + a)
    };
    this.setPhaseCycleLength = function (a) {
        this.phaseCycle = a
    };
    this.currentPhase = function () {
        var a = 0,
            c = this.phases.length;
        if (1 < c) var a = (new Date).getTime() - this.enteredAt,
            b = this.phaseCycle / c,
            a = parseInt(a % (c * b) / b);
        return a
    };
    this.setup = function () {
        this.image = document.createElement("img");
        this.image.originalPath = a;
        this.image.setAttribute("src", "images/" + this.image.originalPath);
        this.image.actor = this;
        this.phases.push("images/" + a);
        this.position = {
            x: b,
            y: c
        };
        this.setSize(d,
        f);
        this.vector = {
            x: 0,
            y: 0
        };
        moveActor(this)
    };
    this.setup()
};

function moveActor(a) {
    a.position.x += a.vector.x;
    a.position.y += a.vector.y;
    a.image.style.left = a.position.x + "px";
    a.image.style.top = a.position.y + "px";
    a.vector = {
        x: 0,
        y: 0
    }
}
function tiltActor(a) {
    a.tilt = (a.tilt + a.spin) % 360;
    a.image.style.transform = "rotate(" + a.tilt + "deg)";
    a.image.style.webkitTransform = "rotate(" + a.tilt + "deg)";
    a.image.style.msTransform = "rotate(" + a.tilt + "deg)";
    a.image.style.OTransform = "rotate(" + a.tilt + "deg)";
    a.spin = 0
}

function visibleOnStage() {
    return !notVisibleOnStage
}
function notVisibleOnStage(a) {
    return a.position.x > a.scene.dimensions.x || 0 > a.position.x + a.imagesize.x || 0 > a.position.y + a.imagesize.y || a.position.y > a.scene.dimensions.y
}

function animateactor(a) {
    if (notVisibleOnStage(a)) a.waitingForReset ? t() - a.waitingForResetSince >= a.resetDelay && (a.reset(), a.waitingForReset = !1) : a.doesReset && (a.alterOpacity(0), a.waitingForReset = !0, a.waitingForResetSince = t());
    else if (0 < a.delay && !a.finishedDelaying) null == a.startedDelayingAt ? a.startedDelayingAt = t() : t() >= a.startedDelayingAt + a.delay && (a.finishedDelaying = !0);
    else {
        1 < a.phases.length && a.currentPhase() != a.oldPhase && (a.image.src = a.phases[a.currentPhase()], a.oldPhase = a.currentPhase());
        for (var b = 0; b < a.behaviors.length; b++) a.behaviors[b].applybehavior();
        (0 != a.vector.x || 0 != a.vector.y) && moveActor(a);
        0 != a.spin && tiltActor(a)
    }
};