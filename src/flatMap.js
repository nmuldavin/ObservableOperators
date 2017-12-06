/**
 * Applies a mapping function to the items emitted by an Observable, then
 * transforms the result into an Observable whos outputs are flattened into
 * a single Observable.
 *
 * @example
 * // Combining flatMap with fromEvent and fromPromise to create an Observable stream
 * // of data fetched when a certain element is clicked
 * function fetchOnClick(element) {
 *   return flatMap(
 *     fromEvent(element, 'click'),
 *     click => fromPromise(fetchData(click))
 *   )
 * }
 *
 * @example
 * // if available on Observable.prototype
 * // assuming registerSocket returns an Observable, this will merge all new messages
 * // from a set of websockets
 * socketUrls
 *  .flatMap(url => registerSocket(url))
 *  .map(parseMessage)
 *  .subscribe(handleEvent)
 *
 * @param  {Observable} input Input Observable
 * @param  {Function}   fn    Mapping function. May return a value, another Observable, or iterable.
 *                            The result will be transformed into an Observable with Observable.from
 * @return {Observable}       New Observable that emits the flattened outputs of all mapped values
 */
const flatMap = (input, fn) =>
  new Observable(observer => {
    const subscriptions = new Map();
    let completed;

    const rootSubscription = input.subscribe({
      next(value) {
        let mapped;

        try {
          mapped = fn(value);

          input.constructor.from(mapped).subscribe({
            start(subs) {
              this.subscription = subs;
              subscriptions.set(this.subscription, true);
            },
            next(val) {
              observer.next(val);
            },
            error(e) {
              observer.error(e);
            },
            complete() {
              subscriptions.delete(this.subscription);

              if (completed && subscriptions.size === 0) {
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
        completed = true;

        if (subscriptions.length === 0) {
          observer.complete();
        }
      },
    });

    return () => {
      subscriptions.forEach((_, subscription) => subscription.unsubscribe());
      rootSubscription.unsubscribe();
    };
  });

flatMap._name = 'flatMap';

export default flatMap;
