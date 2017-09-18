import transform from './transform'

/**
 * Returns a new Observable that emits the result of a provided operation applied to each
 * value received from an input observable
 * @param  {Observable} input [description]
 * @param  {Function}   fn    [description]
 * @return {Observable}         [description]
 */
const map = (input, fn) =>
  transform(input, (observer, value) => observer.next(fn(value)))

map._name = 'map'

export default map
