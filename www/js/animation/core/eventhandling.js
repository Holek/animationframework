function bindEvent(el, eventName, eventHandler) {
  if (el.addEventListener){
    el.addEventListener(eventName, eventHandler, false);
  } else if (el.attachEvent){
    el.attachEvent('on'+eventName, eventHandler);
  }
}
