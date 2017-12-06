/**
 * Subscribes to an input Observable but does not emit values until it receives a value
 * from a signal observable. Emits an empty Observable if the signal terminates without
 * emitting a value. Propagates errors from both input and signal.
 *
 * @example
 * // emits consecutive integers until after the user says they care
 * skipUntil(Observable.interval(100), startEvent)
 *
 * @example
 * // if available on Observable.prototype
 * socketEvents
 *   .skipUntil(startListening)
 *
 * @param  {Observable} input  Input Observable
 * @param  {Observable} signal Signal Observable
 * @return {Observable} New Observable
 */
const skipUntil = (input, signal) =>
  new input.constructor(observer => {
    let block = true;
    let signalSubscription;

    signal.subscribe({
      start(subs) {
        signalSubscription = subs;
      },
      next() {
        block = false;
        signalSubscription.unsubscribe();
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        // If still blocked, there was never a signal so complete
        if (block) {
          observer.complete();
        }
      },
    });

    // If complete already don't do the rest of this code
    if (observer.closed) {
      return undefined;
    }

    const inputSubscription = input.subscribe({
      next(value) {
        if (!block) {
          observer.next(value);
        }
      },
      error(e) {
        observer.error(e);
      },
      complete() {
        signalSubscription.unsubscribe();
        observer.complete();
      },
    });

    return () => {
      inputSubscription.unsubscribe();
      signalSubscription.unsubscribe();
    };
  });

skipUntil._name = 'skipUntil';

export default skipUntil;
