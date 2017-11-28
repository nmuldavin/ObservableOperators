/**
 * Returns a new Observable expressed as an operation on the values emitted by a single observable.
 * Useful internally to provide repeated logic for other operations.
 *
 * @example
 * // makes an operator that passes along values until a target value is found
 * const takeUntilValue = (input, targetValue) => transform(input, (observer, value) => {
 *   if (value === targetValue) {
 *     observer.complete(value)
 *   } else {
 *     observer.next(value)
 *   }
 * })
 *
 * @param  {Observable} input     Observable stream
 * @param  {Function}   operation Operation to perform on input stream
 * @return {Observable}           New Observable
 */
const transform = (input, operation) =>
  /**
   * Pull Observable constructor off the first input Observable. This is to ensure
   * that if myObservable.transform(...) is called that it will return a new Observable built off
   * the same constructor as myObservable so that it has the same available methods
   */
  new input.constructor(observer =>
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
      complete () {
        observer.complete()
      }
    })
  )

transform._name = 'transform'

export default transform
