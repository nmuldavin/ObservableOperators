/**
 * Adds an array of methods to the specified target Constructor, passing in the
 * Constructor itself as the last argument to each.
 * @example
 * // adding creators to Observable so you can call Observable.fromPromise(), etc
 * addCreators(Observable, [fromEvent, fromPromise])
 *
 * @param {Constructor}          target   Target Object
 * @param {Array<Function>} creators Array of functions
 */

const addCreators = (Constructor, creators) =>
  creators.forEach(creator => {
    Object.defineProperty(Constructor, creator._name, {
      value: (...args) => creator(...args.concat(Constructor)),
      writable: true,
      enumerable: false,
      configurable: true,
    });
  });

export default addCreators;
