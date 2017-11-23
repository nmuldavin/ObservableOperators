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
  new Observable(observer => {
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
