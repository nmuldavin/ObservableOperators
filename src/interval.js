/**
 * Creates an observable that emits an integer count every specified
 * number of milliseconds
 *
 * @example
 * Observable.interval(1000) // 0, 1, 2, ...
 * Observable.interval(500)  // 0, 1, 2, ... but twice as fast
 *
 * @param  {number} ms Millisecond count interval
 * @return {Observable} Observable stream of integers
 */
function interval (ms) {
  /**
   * Pull Observable Constructor off the context if not undefined, or default to
   * the global Observable context. This is to ensure that if MyObservable.interval
   * is called, that it will return an instance of MyObservable
   */
  const Constructor = this !== undefined ? this : Observable

  return new Constructor(observer => {
    let count = 0

    const intervalId = setInterval(() => {
      observer.next(count)
      count += 1
    }, ms)

    return () => clearInterval(intervalId)
  })
}

interval._name = 'interval'

export default interval
