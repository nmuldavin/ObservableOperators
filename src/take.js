import transform from './transform'
import Observable from 'zen-observable'

/**
 * Emits the first N values of an input Observable
 * @param  {Observable} input Input Observable
 * @param  {number}     n     Number of values to take
 * @return {Observable}       New Observable
 */
const take = (input, n) => {
  if (n < 1) {
    return Observable.of()
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
