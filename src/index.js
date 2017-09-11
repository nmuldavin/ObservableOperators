import Observable from 'zen-observable'
import addOperators from './addOperators'

import transform from './transform'

const addAll = target => {
  addOperators(target || Observable.prototype, [transform])
}

export { addAll as default, transform }
