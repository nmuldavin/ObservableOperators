import transform from './transform'

/**
 * Emits the first N values of an input Observable
 *
 * @example
 * take(observable.of(1, 2, 3, 4), 2) // 1, 2
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of('a', 'b', 'c', 'd', 'e').take(3) // a, b, c
 *
 * @param  {Observable} input Input Observable
 * @param  {number}     n     Number of values to take
 * @return {Observable}       New Observable
 */
const take = (input, n) => {
  if (n < 1) {
    return input.constructor.of()
  }

  let count = 0

  return transform(input, (observer, value) => {
    count = count + 1
    observer.next(value)

    if (count >= n) {
      observer.complete()
    }
  })
}

take._name = 'take'

export default take
