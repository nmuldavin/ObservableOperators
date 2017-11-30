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
