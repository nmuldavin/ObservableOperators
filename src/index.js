import addOperators from './addOperators';
import addCreators from './addCreators';

import debounce from './debounce';
import defer from './defer';
import filter from './filter';
import forEach from './forEach';
import fromEvent from './fromEvent';
import fromPromise from './fromPromise';
import interval from './interval';
import map from './map';
import merge from './merge';
import reduce from './reduce';
import scan from './scan';
import take from './take';
import toArray from './toArray';
import transform from './transform';

const addAll = (target = Observable) => {
  addCreators(target, [defer, fromEvent, fromPromise, interval]);

  addOperators(target.prototype, [
    debounce,
    filter,
    forEach,
    map,
    merge,
    reduce,
    scan,
    take,
    toArray,
    transform,
  ]);
};

export {
  addAll as default,
  addAll,
  addOperators,
  debounce,
  defer,
  filter,
  forEach,
  fromEvent,
  fromPromise,
  interval,
  map,
  merge,
  reduce,
  scan,
  take,
  toArray,
  transform,
};
