import Observable from 'zen-observable'
import addOperators from './addOperators'

import filter from './filter'
import forEach from './forEach'
import map from './map'
import reduce from './reduce'
import scan from './scan'
import take from './take'
import toArray from './toArray'
import transform from './transform'

const addAll = target => {
  addOperators(target || Observable.prototype, [
    filter,
    forEach,
    map,
    reduce,
    scan,
    take,
    toArray,
    transform
  ])
}

export {
  addAll as default,
  addOperators,
  filter,
  forEach,
  map,
  reduce,
  scan,
  take,
  toArray,
  transform
}
