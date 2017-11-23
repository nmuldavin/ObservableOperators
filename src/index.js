import addOperators from './addOperators'

import filter from './filter'
import forEach from './forEach'
import map from './map'
import merge from './merge'
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
    merge,
    reduce,
    scan,
    take,
    toArray,
    transform
  ])
}

export {
  addAll as default,
  addAll,
  addOperators,
  filter,
  forEach,
  map,
  merge,
  reduce,
  scan,
  take,
  toArray,
  transform
}
