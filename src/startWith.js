import concat from './concat';
/**
 * Start an observable sequence with the provided values
 *
 * @example
 * startWith(Observable.of(1, 2, 3), 0) // 0, 1, 2, 3
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of(1, 2, 3)
 * .startWith(-1, 0) // -1, 0, 1, 2, 3
 *
 * @param  {Observable} input   Input Observable
 * @param  {...*}       values  Values to start with
 * @return {Observable} new Observable
 */
const startWith = (input, ...values) => concat(Observable.from(values), input);

startWith._name = 'startWith';

export default startWith;
