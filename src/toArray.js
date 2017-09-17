import reduce from './reduce'

/**
 * Returns a promise resolving to an array representation of an input Observable
 * upon completion.
 * @param  {Observable} input Input Observable
 * @return {Promise}          Promise resolving to an array upon completion
 */
const toArray = input =>
  reduce(input, (array, value) => array.concat(value), [])

toArray._name = 'toArray'

export default toArray
