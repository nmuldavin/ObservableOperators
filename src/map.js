import transform from './transform'

/**
 * Returns a new Observable that emits the result of a provided function applied to each
 * value received from an input observable.
 *
 * @example
 * map(Observable.of(1, 2, 3), val => val + 1) // 2, 3, 4
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of(1, 2, 3).map(val => `${val} mississippi`)
 *
 * @param  {Observable} input Input Observable
 * @param  {Function}   fn    Mapping function
 * @return {Observable}       New observable with mapped values
 */
const map = (input, fn) =>
  transform(input, (observer, value) => observer.next(fn(value)))

map._name = 'map'

export default map
