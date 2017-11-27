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
const defer = func =>
  new Observable(observer => {
    Promise.resolve(func())
      .then(result => {
        observer.next(result)
        observer.complete()
      })
      .catch(e => {
        observer.error(e)
      })
  })

defer._name = 'defer'

export default defer
