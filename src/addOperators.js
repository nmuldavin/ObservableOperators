/**
 * Adds an array of operators to the specified target object, modifying each
 * so that `this` is passed in as the first argument.
 *
 * @example
 * // a common thing you might want to do so that you can call observable.map(...).filter(...)
 * addOperators(Observable.prototype, [filter, map, scan])
 *
 * @example
 * // if you don't want to modify all Observables
 * addOperators(myCustomObservable, [reduce, take])
 *
 * @param {Object}          target    Target Object
 * @param {Array<Function>} operators Array of Operators to add
 */
const addOperators = (target, operators) => {
  operators.forEach(operator => {
    Object.defineProperty(target, operator._name, {
      value: function (...args) {
        return operator(this, ...args)
      },
      writable: true,
      enumerable: false,
      configurable: true
    })
  })
}

export default addOperators
