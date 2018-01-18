/*
 * Recursive inner method to subscribe to the next source on completion of the previous.
 * The recursive call means that the maximum number of streams we can concat is equal to
 * the recursion limit. This is not ideal, I'd love to think of another way to do this,
 * even if it's unlikely that someone wants to concat that many streams
 */
const subscribe = (sources, observer, onSubscribe) =>
  sources[0].subscribe({
    start: onSubscribe,
    next(value) {
      observer.next(value);
    },
    error(e) {
      observer.error(e);
    },
    complete() {
      if (sources.length > 1) {
        subscribe(sources.slice(1), observer, onSubscribe);
      } else {
        observer.complete();
      }
    },
  });

/**
 * Subscribe to a list of Observables in order. As one completes, the next is subscribed.
 *
 * @example
 * concat(
 *   Observable.of(1, 2, 3),
 *   Observable.of(4, 5, 6),
 *   Observable.of(7, 8, 9)
 * ) // 1, 2, 3, 4, 5, 6, 7, 8, 9
 *
 * @example
 * // if available on Observable.prototype
 * firstStream
 *  .concat(nextStream)
 *  .subscribe(handle)
 *
 * @param  {...Observable} sources List of Observables
 * @return {Observable}    new Observable with concated values
 */
const concat = (...sources) =>
  new sources[0].constructor(observer => {
    let subscription;
    const onSubscribe = newSubscription => {
      subscription = newSubscription;
    };

    subscribe(sources, observer, onSubscribe);

    return () => {
      subscription.unsubscribe();
    };
  });

concat._name = 'concat';

export default concat;
