/**
 * Calls a function once for each observed value. Returns a Promise
 * that resolves when the input Observable is complete.
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
