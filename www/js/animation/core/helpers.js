function l(msg){
  console.log(msg);
}

function round(number, decimals){
  if (decimals < 0) decimals = 0;
  this.q = Math.pow(10, decimals);
  return Math.round(number * this.q)/this.q;
}

function cutOffPx(value){
  var length = value.length;
  return parseFloat(value.toString().substring(0, length-2));
}

function createDiv(id, cssclass){
  var div = document.createElement('div');
  div.setAttribute('id', id);
  div.setAttribute('class', cssclass);
  return div;
}

function t(){
  return new Date().getTime();
}

function browserCompatible(){
  try {
    var tmp = new Audio();
    return true;
  } catch(e) {
    return false;
  }
}

function getIntegerFromEndOfString(myString){
  return parseInt(myString.match(/\d+$/)[0]);
}

function rescale(domobject, newscale){
    domobject.style.transformOrigin = "0 0";
    domobject.style.transform = "scale(" + newscale + ", " + newscale + ")";
    domobject.style.msTransformOrigin = "0 0";
    domobject.style.msTransform = "scale(" + newscale + ", " + newscale + ")";
    domobject.style.webkitTransformOrigin = "0 0";
    domobject.style.webkitTransform = "scale(" + newscale + ", " + newscale + ")";
    domobject.style.OTransformOrigin = "0 0";
    domobject.style.OTransform = "scale(" + newscale + ", " + newscale + ")";
}
