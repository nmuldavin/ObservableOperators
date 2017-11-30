/**
 * Combines multiple Observables in to one by passing on each input's emissions.
 * Any error notification from an input will be passed on to the observer immediately. The
 * output stream will terminate when all inputs have terminated.
 *
 * @example
 * merge(
 *   clickEventsFromA,
 *   clickEventsFromB,
 *   clickEventsFromC
 * ).subscribe(handleEvents)
 *
 * @example
 * // if available on Observable.prototype
 * eventsEvery100ms
 *   .merge(eventsEvery10s)
 *   .forEach(console.log)
 *
 * @example
 * @param  {...Observable} inputs Input Observables
 * @return {Observable}    Single output Observable
 */
const merge = (...inputs) =>
  /*
   * Pull Observable constructor off the first input Observable. This is to ensure
   * that if myObservable.merge(...) is called that it will return a new Observable built off
   * the same constructor as myObservable so that it has the same available methods
   */
  new inputs[0].constructor(observer => {
    let numObservers = inputs.length

    const subscriptions = inputs.map((operator, index) =>
      operator.subscribe({
        next (value) {
          observer.next(value)
        },
        error (e) {
          observer.error(e)
        },
        complete () {
          numObservers = numObservers - 1

          if (numObservers === 0) {
            observer.complete()
          }
        }
      })
    )

    return () => {
      subscriptions.forEach(subscription => {
        subscription.unsubscribe()
      })
    }
  })

merge._name = 'merge'

export default merge
