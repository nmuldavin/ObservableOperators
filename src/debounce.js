/**
 * [Debounces](https://davidwalsh.name/javascript-debounce-function) an Observable stream
 * by a specified number of milliseconds.
 *
 * @param  {Observable} input Input Observable
 * @param  {number}     ms    Milliseconds to debounce by
 * @return {Observable} Debounced Observable
 */
const debounce = (input, ms) => {
  let timer
  let emitNext
  /*
   * Pull Observable constructor off the first input Observable. This is to ensure
   * that if myObservable.transform(...) is called that it will return a new Observable built off
   * the same constructor as myObservable so that it has the same available methods
   */
  return new input.constructor(observer => {
    const subscription = input.subscribe({
      next (value) {
        clearTimeout(timer)

        emitNext = () => observer.next(value)

        timer = setTimeout(() => {
          emitNext()
          emitNext = undefined
        }, ms)
      },
      error (e) {
        observer.error(e)
      },
      complete () {
        clearTimeout(timer)

        if (emitNext) {
          emitNext()
        }

        observer.complete()
      }
    })

    return () => {
      clearTimeout(timer)
      subscription.unsubscribe()
    }
  })
}

debounce._name = 'debounce'

export default debounce
