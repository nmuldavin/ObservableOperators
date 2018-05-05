/**
 * Applies a mapping function to the items emitted by an Observable, then
 * transforms the result into an Observable whos outputs are emitted to the subscriber.
 * When a new value of the input stream arrives, the previous Observable is unsubscribed
 * and replaced with the next.
 *
 * @example
 * // using switchMap for an autocomplete fetch stream. When a new fetch is initiated,
 * // the old result stream will be cancelled
 * function autocomplete(inputStream) {
 *   return switchMap(
 *     inputStream,
 *     userInput => fromPromise(fetchData(input))
 *   )
 * }
 *
 * @example
 * // same example in fluent style with a debounce thrown in
 *
 * Observable.fromEvent(input, 'input')
 *  .map(evt => evt.value)
 *  .debounce(300)
 *  .switchMap(input => Observable.fromPromise(autocomplete(input)))
 *
 * @param  {Observable} input Input Observable
 * @param  {Function}   fn    Mapping function. May return a value, another Observable, or iterable.
 *                            The result will be transformed into an Observable with Observable.from
 * @return {Observable}       New Observable that emits the flattened outputs of all mapped values
 */
const switchMap = (input, fn) =>
  new input.constructor(observer => {
    let activeSubscription;
    let rootIsComplete;

    const rootSubscription = input.subscribe({
      next(value) {
        try {
          if (activeSubscription) {
            activeSubscription.unsubscribe();
          }

          activeSubscription = input.constructor.from(fn(value)).subscribe({
            next(val) {
              observer.next(val);
            },
            error(e) {
              observer.error(e);
            },
            complete() {
              activeSubscription = undefined;

              if (rootIsComplete) {
                observer.complete();
              }
            },
          });
        } catch (e) {
          observer.error(e);
        }
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        rootIsComplete = true;

        if (!activeSubscription) {
          observer.complete();
        }
      },
    });

    return () => {
      rootSubscription.unsubscribe();

      if (activeSubscription) {
        activeSubscription.unsubscribe();
      }
    };
  });

switchMap._name = 'switchMap';

export default switchMap;
