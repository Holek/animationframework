function Scene(a, b) {
    this.id = a;
    this.title = "undefined" != typeof b ? b : a;
    this.div = createDiv(a, "scene");
    this.stage = null;
    this.dimensions = {
        x: 0,
        y: 0
    };
    this.isVisible = !1;
    this.actors = [];
    this.texts = [];
    this.textDisplaying = !0;
    this.alwaysShowsText = !1;
    this.displayedAt = Date.now();
    this.resetAge = function () {
        return this.displayedAt = Date.now()
    };
    this.age = function () {
        return Date.now() - this.displayedAt
    };
    this.alwaysShowText = function () {
        this.alwaysShowsText = !0
    };
    this.preloadSceneIds = [a];
    this.resetActors = function () {
        for (var a = this.actors.length - 1; 0 <= a; a--) this.actors[a].reset()
    };
    this.setDimensions = function (a, b) {
        this.dimensions = {
            x: a,
            y: b
        };
        this.div.style.width = this.dimensions.x + "px";
        this.div.style.height = this.dimensions.y + "px"
    };
    this.makeVisible = function () {
        this.div.style.visibility = "visible";
        this.isVisible = !0
    };
    this.makeInvisible = function () {
        this.div.style.visibility = "hidden";
        this.isInvisible = !1;
        this.resetActors()
    };
    this.makeInvisible();
    this.makeOthersInvisible = function () {
        for (var a = window.animation.textIsDisplaying, b = window.animation.loadedScenes.length - 1; 0 <= b; b--) window.animation.loadedScenes[b].id.match(this.id) ? this.makeVisible() : (window.animation.loadedScenes[b].makeInvisible(), window.animation.loadedScenes[b].hideText());
        a || this.alwaysShowsText ? this.showText() : this.hideText();
        window.animation.textIsDisplaying = a
    };
    this.mute = function () {
        for (var a = 0; a < this.actors.length; a++) try {
            this.actors[a].pauseAudio()
        } catch (b) {}
    };
    this.muteOthers = function () {
        for (var a = window.animation.loadedScenes.length - 1; 0 <= a; a--) window.animation.loadedScenes[a].id.match(this.id) || window.animation.loadedScenes[a].mute()
    };
    this.createActor = function (a, b, f, h, g) {
        a = new Actor(a, b, f, h, g);
        a.scene = this;
        this.actors.push(a);
        return a
    };
    this.enterActors = function () {
        for (var a = 0; a < this.actors.length; a++) this.actors[a].enter(this)
    };
    this.putOnStage = function (a) {
        a.appendChild(this.div);
        a.scene = this;
        this.stage = a;
        this.dimensions = {
            x: parseInt(a.style.width),
            y: parseInt(a.style.height)
        };
        this.div.style.width = this.dimensions.x + "px";
        this.div.style.height = this.dimensions.y + "px";
        for (a = 0; a < window.stage.scene.actors.length; a++) this.actors[a].enter(this)
    };
    this.write = function (a, b, f, h) {
        var g = document.createElement("div");
        g.innerHTML = f;
        g.setAttribute("class", "text " + ("undefined" === typeof h ? "" : h));
        g.style.left = a + "px";
        g.style.top = b + "px";
        this.div.appendChild(g);
        this.texts.push(g)
    };
    this.showText = function () {
        this.textDisplaying = !0;
        for (var a = this.texts.length - 1; 0 <= a; a--) this.texts[a].style.visibility = "visible";
        window.animation.textIsDisplaying = !0
    };
    this.hideText = function () {
        this.textDisplaying = !1;
        for (var a = this.texts.length - 1; 0 <= a; a--) this.texts[a].style.visibility =
            "hidden";
        window.animation.textIsDisplaying = !1
    };
    return this
};