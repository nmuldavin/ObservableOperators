/**
 * Calls a function once for each observed value. Returns a Promise
 * that resolves when the input Observable is complete.
 *
 * @example
 * forEach(
 *   Observable.of(1, 2, 3),
 *   value => console.log(`{value} mississippi`)
 * )
 *   .then(() => console.log('Ready or not here I come!'))
 *   .catch(() => console.log('Something went wrong'))
 *
 * @example
 * // if available on Observable.prototype
 * myObservable
 *   .forEach(doAThing)
 *   .then(wrapItUp)
 *   .catch(panic)
 *
 * @param  {Observable} input Input Observable
 * @param  {Function}   fn    Function to call
 * @return {Promise}          Promise resolving when the Observable is complete
 */
const forEach = (input, fn) =>
  new Promise((resolve, reject) => {
    const subscription = input.subscribe({
      next (value) {
        try {
          fn(value)
        } catch (e) {
          reject(e)
          subscription.unsubscribe()
        }
      },
      error: reject,
      complete: resolve
    })
  })

forEach._name = 'forEach'

export default forEach
