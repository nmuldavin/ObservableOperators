/**
 * Creates an Observable by adding an eventListener to the specified
 * DOMElement. Removes event listener when the Observable's observer is unsubscribed
 *
 * @example
 * Observable.fromEvent(button, 'click').subscribe(handleClick)
 *
 * @param  {Element}    element   Dom element to listen on
 * @param  {String}     eventName Event type
 * @return {Observable} Observable sequence of events
 */
const fromEvent = (element, eventName) =>
  new Observable(observer => {
    const handler = event => {
      observer.next(event)
    }

    element.addEventListener(eventName, handler, true)

    return () => {
      element.removeEventListener(eventName, handler)
    }
  })

fromEvent._name = 'fromEvent'

export default fromEvent
