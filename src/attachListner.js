// attach event listeners to the svg elements
export default function attachEventListeners(eventHandlerInfoArray,eventHandler) {

  for (let i = 0; i < eventHandlerInfoArray.length; i++) {
    let evInfo = eventHandlerInfoArray[i];  // get id from the array
    let el = document.getElementById(evInfo.id); //fetch the element by its id
    if (el) {
      // el.addEventListener(evInfo.eventName, evInfo.eventHandler); // add event to the element
      el.addEventListener(evInfo.eventName, eventHandler);
    }
  }

}


