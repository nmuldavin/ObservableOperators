/**
 * Limits the rate of events to at most one every throttlePeriod. Emits the first
 * event encountered once throttlePeriod milliseconds have passed since the last event.
 *
 * @example
 * throttle(interval(1000), 3000) // 0 ... 3 ... 6 ...
 *
 * @example
 * // limits scroll events, maybe to bookmark scroll position
 * // If available on Observable.prototype
 * scrollEvents
 *   .throttle(300)
 *
 * @param  {Observable} input           Input Observable
 * @param  {number}     throttlePeriod  Minimum number of milliseconds between events
 * @return {Observable} New Observable
 */
const throttle = (input, throttlePeriod) =>
  new input.constructor(observer => {
    let throttling = false;
    let timer;

    const subscription = input.subscribe({
      next(value) {
        if (!throttling) {
          observer.next(value);
          throttling = true;
          timer = setTimeout(() => {
            throttling = false;
          }, throttlePeriod);
        }
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        observer.complete();
        clearTimeout(timer);
      },
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  });

throttle._name = 'throttle';

export default throttle;
