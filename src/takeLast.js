/**
 * Leaves off the last N values of an Observable
 *
 * @example
 * takeLast(observable.of(1, 2, 3, 4), 2) // 3, 4
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of('a', 'b', 'c', 'd', 'e').takeLast(3) // c, d, e
 *
 * @param  {Observable} input Input Observable
 * @param  {number}     n     Number of values to leave off the end
 * @return {Observable}       New Observable
 */
const takeLast = (input, n) => {
  const lastValues = [];

  return new Observable(observer =>
    input.subscribe({
      next(value) {
        if (lastValues.length < n) {
          lastValues.push(value);
        } else {
          lastValues.shift();
          lastValues.push(value);
        }
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        lastValues.forEach(value => observer.next(value));
        observer.complete();
      },
    }),
  );
};

takeLast._name = 'takeLast';

export default takeLast;
