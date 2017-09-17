import Observable from 'zen-observable'
import addOperators from './addOperators'

import reduce from './reduce'
import transform from './transform'

const addAll = target => {
  addOperators(target || Observable.prototype, [reduce, transform])
}

export { addAll as default, addOperators, reduce, transform }
