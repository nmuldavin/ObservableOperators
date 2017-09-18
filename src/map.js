import transform from './transform'

/**
 * Returns a new Observable that emits the result of a provided function applied to each
 * value received from an input observable.
 * @param  {Observable} input Input Observable
 * @param  {Function}   fn    Mapping function
 * @return {Observable}       New observable with mapped values
 */
const map = (input, fn) =>
  transform(input, (observer, value) => observer.next(fn(value)))

map._name = 'map'

export default map
