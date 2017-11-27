import defer from './defer'
/**
 * Transforms a Promise in to an Observable that emits a single value upon
 * Promise resolution. The Observable will error if the promise does. This method
 * requires that the Promise has already been created so that it may be passed in
 * as the argument. If you wish to defer Promise creation until the Observable has been
 * subscribed to see {@link defer}.
 *
 * @example
 * Observable.fromPromise(myPromise).subscribe(handleCall)
 *
 * @example
 * // will also work with the return values of async functions
 * async function makeCall() {
 *  const response = await fetch(...)
 *  return handleReponse(response)
 * }
 *
 * Observable.fromPromise(makeCall()).subscribe(console.log)
 *
 * @param  {Promise}    promise A Promise
 * @return {Observable} Observable
 */
const fromPromise = promise => defer(() => promise)

fromPromise._name = 'fromPromise'

export default fromPromise
