/**
 * Adds an array of methods to the specified target object. Does not modify
 * the functions (unlike {@link addOperators}).
 * @example
 * // adding creators to Observable so you can call Observable.fromPromise(), etc
 * addCreators(Observable, [fromEvent, fromPromise])
 *
 * @param {Object}          target   Target Object
 * @param {Array<Function>} creators Array of functions
 */

const addCreators = (target, creators) =>
  creators.forEach(creator => {
    Object.defineProperty(target, creator._name, {
      value: creator,
      writable: true,
      enumerable: false,
      configurable: true,
    });
  });

export default addCreators;
