/**
 * Returns an Observable from the result of a function exectuted
 * upon subscription. Handles async functions, emitting an event
 * upon resolution. Similar to {@link fromPromise} but useful for cases where
 * you don't want to do an expensive async thing until something subscribes.
 *
 * @example
 * async function makeCall() {
 *   const params = buildParams(...)
 *   const response = await fetch(params)
 *   return response.data
 * }
 * // call will not happen after this statement
 * const callResult = Observable
 *   .defer(makeCall)
 *   .map(handleResponse)
 * // but it will now
 * callResult.subscribe(...)
 *
 * @example
 * // will also work with a function that returns a promise
 * function doAsyncThing() {
 *   return new Promise(...)
 * }
 *
 * Observable.defer(doAsyncThing).subscribe(...)
 *
 * @example
 * // will also work with non-async functions
 * function doExpensiveSynchronousThing() {
 *   ...
 * }
 *
 * Observable.defer(doExpensiveSynchronousThing).subscribe(...)
 *
 * @param  {Function} func A function, potentially async
 * @return {Observable} Observable
 */
function defer (func) {
  /**
   * Pull Observable Constructor off the context if not undefined, or default to
   * the global Observable context. This is to ensure that if MyObservable.defer
   * is called, that it will return an instance of MyObservable
   */
  const Constructor = this !== undefined ? this : Observable

  return new Constructor(observer => {
    Promise.resolve(func())
      .then(result => {
        observer.next(result)
        observer.complete()
      })
      .catch(e => {
        observer.error(e)
      })
  })
}

defer._name = 'defer'

export default defer
