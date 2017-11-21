import transform from './transform'

/**
 * Returns a new observable containing incrementally accumulated values, starting with the provided
 * initial value. Similar to {@link reduce}.
 *
 * @example
 * scan(Observable.of(1, 3, 2, 5), Math.max, 0) // 1, 3, 3, 5
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of(1, 2, 3).scan((acc, val) => acc + val, 0) // 1, 3, 6
 *
 * @param  {Observable} input   Input Observable
 * @param  {Function}   fn      Accumulating function
 * @param  {*}          initial Initial value
 * @return {Observable}         New Observable of accumulated values
 */
const scan = (input, fn, initial) => {
  let accumulation = initial

  return transform(input, (observer, value) => {
    accumulation = fn(accumulation, value)
    observer.next(accumulation)
  })
}

scan._name = 'scan'

export default scan
