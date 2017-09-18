import transform from './transform'

/**
 * Returns a new Observable that emits only the values of the input Observable for which
 * a provided function returns truthy.
 * @param  {Observable} input Input Observable
 * @param  {Function}   fn    Filtering function
 * @return {Observable}       New filtered Observable
 */
const filter = (input, fn) =>
  transform(input, (observer, value) => {
    if (fn(value)) {
      observer.next(value)
    }
  })

filter._name = 'filter'

export default filter
