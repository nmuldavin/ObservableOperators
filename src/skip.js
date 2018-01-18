import transform from './transform';

/**
 * Skips the first N values of an Observable
 *
 * @example
 * skip(observable.of(1, 2, 3, 4), 2) // 3, 4
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of('a', 'b', 'c', 'd', 'e').skip(3) // d, e
 *
 * @param  {Observable} input Input Observable
 * @param  {number}     n     Number of values to skip
 * @return {Observable}       New Observable
 */
const skip = (input, n) => {
  let count = 0;

  return transform(input, (observer, value) => {
    count += 1;

    if (count > n) {
      observer.next(value);
    }
  });
};

skip._name = 'skip';

export default skip;
