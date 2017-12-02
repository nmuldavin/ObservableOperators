import transform from './transform';

/**
 * Returns a new Observable that emits only the values of the input Observable for which
 * a provided function returns truthy.
 *
 * @example
 * filter(Observable.of(1, 2, 3, 4), value ==> value % 2) // 2, 4
 *
 * @example
 * // If available on Observable.prototype
 * Observable.of(1, 2, 3, 4).filter(value => value % 2 === 1) // 1, 3
 *
 * @param  {Observable} input Input Observable
 * @param  {Function}   fn    Filtering function
 * @return {Observable}       New filtered Observable
 */
const filter = (input, fn) =>
  transform(input, (observer, value) => {
    if (fn(value)) {
      observer.next(value);
    }
  });

filter._name = 'filter';

export default filter;
