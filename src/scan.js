import transform from './transform'

/**
 * Returns a new observable containing incrementally accumulated values, starting with the provided
 * initial value. Similar to {@link reduce}.
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
