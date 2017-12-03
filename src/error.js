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
 * @param  {*}          e Error value
 * @return {Observable} New Observable
 */
function error(e) {
  const Constructor = this || Observable;

  return new Constructor(observer => {
    observer.error(e);
  });
}

error._name = 'error';

export default error;
