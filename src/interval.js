/**
 * Creates an observable that emits an integer count every specified
 * number of milliseconds
 *
 * @example
 * Observable.interval(1000) // 0, 1, 2, ...
 * Observable.interval(500)  // 0, 1, 2, ... but twice as fast
 *
 * @param  {number}     ms          Millisecond count interval
 * @param  {Function}   Constructor Observable constructor
 * @return {Observable} Observable stream of integers
 */
const interval = (ms, Constructor = Observable) =>
  new Constructor(observer => {
    let count = 0;

    const intervalId = setInterval(() => {
      observer.next(count);
      count += 1;
    }, ms);

    return () => clearInterval(intervalId);
  });

interval._name = 'interval';

export default interval;
