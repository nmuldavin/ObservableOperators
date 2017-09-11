/**
 * Adds an array of operators to the specified target object, modifying each
 * so that 'this' is passed in as the first argument.
 */
const addOperators = (target, operators = []) => {
  operators.forEach(operator => {
    target[operator._name] = function (...args) {
      return operator(this, ...args)
    }
  })
}

export default addOperators
