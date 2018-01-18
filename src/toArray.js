import reduce from './reduce';

/**
 * Returns a promise resolving to an array representation of an input Observable
 * upon completion.
 *
 * @example
 * toArray(Observable.of(1, 3, 2)) // [1, 3, 2]
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of(2, 3, 4).toArray() // [2, 3, 4]
 *
 * @param  {Observable} input Input Observable
 * @return {Promise}          Promise resolving to an array upon completion
 */
const toArray = input =>
  reduce(input, (array, value) => array.concat(value), []);

toArray._name = 'toArray';

export default toArray;
