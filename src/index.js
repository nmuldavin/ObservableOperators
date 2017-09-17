import Observable from 'zen-observable'
import addOperators from './addOperators'

import reduce from './reduce'
import toArray from './toArray'
import transform from './transform'

const addAll = target => {
  addOperators(target || Observable.prototype, [reduce, toArray, transform])
}

export { addAll as default, addOperators, reduce, toArray, transform }
