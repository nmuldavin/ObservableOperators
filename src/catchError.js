/**
 * "Catch" an Observable sequence by continuing with another Observable sequence
 * upon error. Takes a function as an argument that will be passed the error value
 * and must return an Observable. When assigned to a Constructor this method is called with `.catch()`
 * @example
 * catchError(
 *   new Observable(observer => observer.error('bad stuff')),
 *   e => Observable.of(`Caught error: ${e}`)
 * )
 *   .subscribe(console.log) // Caught error: bad stuff
 *
 * @example
 * // If available on Observable.prototype
 * stream
 *   .catch(e => alternateStream)
 *   .subscribe(...)
 *
 * @param  {Observable} input Input Observable.
 * @param  {Function}   fn    Catching function. Must return an Observable.
 * @return {Observable} new Observable
 */
const catchError = (input, fn) =>
  new input.constructor(observer => {
    let subscription = input.subscribe({
      next(value) {
        observer.next(value);
      },
      error(e) {
        subscription = fn(e).subscribe({
          next(value) {
            observer.next(value);
          },
          error(ee) {
            observer.error(ee);
          },
          complete() {
            observer.complete();
          },
        });
      },
      complete() {
        observer.complete();
      },
    });

    return subscription;
  });

catchError._name = 'catch';

export default catchError;
