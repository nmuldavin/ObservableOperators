/**
 * Applies a function against an accumulator and each observed value of an input Observable,
 * returning a Promise that resolves with the accumulated value when the input is complete.
 * @param  {Observable} input   Observable stream
 * @param  {Function}   fn      Accumulator
 * @param  {*}          initial Initial value
 * @return {Promise}            Promise resolving to the accumulated value upon completion
 */
const reduce = (input, fn, initial) =>
  new Promise((resolve, reject) => {
    let accumulation = initial

    const subscription = input.subscribe({
      next (value) {
        try {
          accumulation = fn(accumulation, value)
        } catch (e) {
          reject(e)
          subscription.unsubscribe()
        }
      },
      error: reject,
      complete () {
        resolve(accumulation)
      }
    })
  })

reduce._name = 'reduce'

export default reduce
