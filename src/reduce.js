/**
 * Applies a function against an accumulator and each observed value of an input Observable,
 * returning a Promise that resolves with the accumulated value when the input is complete.
 * Similar to {@link scan}.
 *
 * @example
 * // logs 16
 * reduce(Observable.of(1, 2, 3), (acc, val) => acc + val, 10)
 *  .then(console.log)
 *  .catch(panic)
 *
 * @example
 * // if available on Observable.prototype
 * // logs 5
 * Observable.of(1, 5, 2)
 *   .reduce(Math.max, 0)
 *   .then(console.log)
 *   .catch(panic)
 *
 * @param  {Observable} input   Observable stream
 * @param  {Function}   fn      Accumulator
 * @param  {*}          initial Initial value
 * @return {Promise}            Promise resolving to the accumulated value upon completion
 */
const reduce = (input, fn, initial) =>
  new Promise((resolve, reject) => {
    let accumulation = initial;

    const subscription = input.subscribe({
      next(value) {
        try {
          accumulation = fn(accumulation, value);
        } catch (e) {
          reject(e);
          subscription.unsubscribe();
        }
      },
      error: reject,
      complete() {
        resolve(accumulation);
      },
    });
  });

reduce._name = 'reduce';

export default reduce;
