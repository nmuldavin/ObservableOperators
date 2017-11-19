/**
 * Returns a new Observable expressed as an operation on the values emitted by a single observable.
 * Usefull internally to provide repeated logic for other operations.
 * @param  {Observable} input     Observable stream
 * @param  {Function}   operation Operation to perform on input stream
 * @return {Observable}           New Observable
 */
const transform = (input, operation) =>
  new Observable(observer =>
    input.subscribe({
      next (value) {
        try {
          operation(observer, value)
        } catch (e) {
          observer.error(e)
        }
      },
      error (e) {
        observer.error(e)
      },
      complete (x) {
        observer.complete(x)
      }
    })
  )

transform._name = 'transform'

export default transform
