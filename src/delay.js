/**
 * Delay stream events by the specified number of milliseconds. Maintains
 * the relative spacing of events.
 *
 * @param  {Observable} input Input Observable
 * @param  {number}     ms    Delay time in milliseconds
 * @return {Observable} New Observable
 */
const delay = (input, ms) =>
  new input.constructor(observer => {
    const timers = new Set();

    const subscription = input.subscribe({
      next(value) {
        const timer = setTimeout(() => {
          observer.next(value);
          timers.delete(timer);
        }, ms);
        timers.add(timer);
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        timers.add(setTimeout(() => observer.complete(), ms));
      },
    });

    return () => {
      timers.forEach(clearTimeout);
      subscription.unsubscribe();
    };
  });

delay._name = 'delay';

export default delay;
