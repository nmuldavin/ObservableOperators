/**
 * Leaves off the last N values of an Observable
 *
 * @example
 * skipLast(observable.of(1, 2, 3, 4), 2) // 1, 2
 *
 * @example
 * // if available on Observable.prototype
 * Observable.of('a', 'b', 'c', 'd', 'e').skipLast(3) // a, b
 *
 * @param  {Observable} input Input Observable
 * @param  {number}     n     Number of values to leave off the end
 * @return {Observable}       New Observable
 */
const skipLast = (input, n) => {
  const values = [];

  return new input.constructor(observer =>
    input.subscribe({
      next(value) {
        values.push(value);
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        values
          .slice(0, values.length - n)
          .forEach(value => observer.next(value));
        observer.complete();
      },
    }),
  );
};

skipLast._name = 'skipLast';

export default skipLast;
