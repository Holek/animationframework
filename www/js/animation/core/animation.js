function Animation(a, b, c, d, f, h, g) {
    this.firstSceneId = c;
    this.loadedScenes = [];
    this.stageDiv = createDiv("stage", "stage");
    this.stageDiv.style.width = a + "px";
    this.stageDiv.style.height = b + "px";
    this.width = a;
    this.height = b;
    this.textIsDisplaying = !0;
    this.minWidth = "undefined" == typeof d ? this.width : d;
    this.maxWidth = "undefined" == typeof f ? this.width : f;
    this.minHeight = "undefined" == typeof h ? this.height : h;
    this.maxHeight = "undefined" == typeof g ? this.height : g;
    this.scaleToWindow = function () {
        var a = window.innerWidth,
            c = window.innerHeight,
            b = c,
            d = a,
            f = window.innerWidth / window.innerHeight,
            h = this.width / this.height;
        if (0 != this.minWidth && h > f) {
            a < this.minWidth ? a = this.minWidth : a > this.maxWidth && (a = this.maxWidth);
            var g = a / this.width,
                b = a * g
        } else 0 != this.minWidth && (c < this.minHeight ? c = this.minHeight : c > this.maxHeight && (c = this.maxHeight), g = c / this.height, d = c * g);
        1 != g && rescale(this.stageDiv, g);
        window.animationwrapper.style.marginTop = (window.innerHeight - parseInt(this.height * g)) / 2 + "px";
        window.animationwrapper.style.width = d + "px";
        window.animationwrapper.style.marginLeft = (window.innerWidth - parseInt(this.width * g)) / 2 + "px";
        window.animationwrapper.style.height = b + "px"
    };
    this.loadScene = function (c) {
        for (var d = this.loadedScenes.length - 1; 0 <= d; d--) if (this.loadedScenes[d].id === c) return this.loadedScenes[d];
        c = eval(c + "()");
        c.setDimensions(a, b);
        this.loadedScenes.push(c);
        this.stageDiv.appendChild(c.div);
        c.makeInvisible();
        return c
    };
    this.showScene = function (a) {
        if ("undefined" === typeof this.currentScene || 1E3 < this.currentScene.age() || "undefined" !== typeof developermode && developermode) this.currentScene = loadScene(a), a = getIntegerFromEndOfString(a), window.location.hash = 0 == a ? "" : a, this.currentScene.enterActors(), this.currentScene.resetActors(), this.currentScene.makeOthersInvisible(), this.currentScene.muteOthers(), this.currentScene.resetAge(), this.dropUnneededScenes(this.currentScene.preloadSceneIds), this.loadNeededScenes(this.currentScene.preloadSceneIds)
    };
    this.showFirstScene = function () {
        this.showScene(this.firstSceneId)
    };
    this.loadedSceneIds = function () {
        for (var a = [], c = this.loadedScenes.length - 1; 0 <= c; c--) a.push(this.loadedScenes[c].id);
        return a
    };
    this.dropUnneededScenes = function (a) {
        for (var a = this.loadedSceneIds().minus(a), c = a.length - 1; 0 <= c; c--) this.dropScene(a[c])
    };
    this.loadNeededScenes = function (a) {
        for (var a = a.minus(this.loadedSceneIds()), c = a.length - 1; 0 <= c; c--) this.loadScene(a[c])
    };
    this.dropScene = function (a) {
        for (var c = this.loadedScenes.length - 1; 0 <= c; c--) this.loadedScenes[c].id === a && (document.getElementById(a), this.stageDiv.removeChild(this.loadedScenes[c].div), this.loadedScenes = this.loadedScenes.without(c))
    };
    return this
}

function loadAnimation(a, b, c, d, f, h, g, e) {
    document.title = a;
    if (browserCompatible()) {
        if (window.onload) var i = window.onload;
        window.onload = function () {
            i && i();
            setTimeout(function () {
                window.scrollTo(0, 1)
            }, 100);
            window.animation = Animation(b, c, d, f, h, g, e);
            window.animationwrapper = createDiv("animationwrapper", "");
            window.document.body.appendChild(window.animationwrapper);
            window.animation.scaleToWindow();
            window.animationwrapper.appendChild(this.stageDiv);
            var a = parseInt(window.location.hash.substring(1));
            isNaN(a) ? window.animation.showScene(d) : eval("window.animation.showScene('scene" + a + "')");
            window.animation.startLoop()
        };
        if (window.onresize) var j = window.onresize;
        window.onresize = function () {
            j && j();
            window.animation.scaleToWindow()
        }
    } else a = document.createElement("div"), a.setAttribute("id", "compatibility"), a.innerHTML += "<h1>Please upgrade your browser</h1>", a.innerHTML += "<p>You need a more modern browser to view this awesome animation.</p>", a.innerHTML += '<p>More information: <a href="http://animation.io/compatible-browsers.html">http://animation.io/compatible-browsers.html</a></p>',
    document.body.appendChild(a)
}
requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
        window.setTimeout(a, 1E3 / 60)
    }
}();

function startLoop() {
    this.animloop = function () {
        requestAnimFrame(animloop);
        for (var a = 0; a < window.currentScene.actors.length; a++) animateactor(window.currentScene.actors[a])
    };
    this.animloop()
};

Array.prototype.minus = function (a) {
    for (var b = this, c = b.length - 1; 0 <= c; c--) for (var d = a.length - 1; 0 <= d; d--) if (a[d].match(b[c])) {
        b = b.without(c);
        break
    }
    return b
};