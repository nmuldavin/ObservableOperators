/**
 * Creates an observable that immediately terminates with the provided error
 *
 * @example
 * error('error message').subscribe({ error: console.log }) // logs 'error message'
 *
 * @example
 * // rejecting a certain case
 * stream
 *  .filter(specificCase)
 *  .flatMap(value => Observable.error(value))
 *  .subscribe(observer)
 *
 * @param  {*}          e           Error value
 * @param  {Function}   Constructor Observable constructor
 * @return {Observable} New Observable
 */
const error = (e, Constructor = Observable) =>
  new Constructor(observer => {
    observer.error(e);
  });

error._name = 'error';

export default error;
