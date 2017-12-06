import addOperators from './addOperators';
import addCreators from './addCreators';

import catchError from './catchError';
import concat from './concat';
import debounce from './debounce';
import defer from './defer';
import error from './error';
import filter from './filter';
import flatMap from './flatMap';
import forEach from './forEach';
import fromEvent from './fromEvent';
import fromPromise from './fromPromise';
import interval from './interval';
import map from './map';
import merge from './merge';
import reduce from './reduce';
import scan from './scan';
import startWith from './startWith';
import take from './take';
import toArray from './toArray';
import transform from './transform';

const addAll = (target = Observable) => {
  addCreators(target, [defer, error, fromEvent, fromPromise, interval]);

  addOperators(target.prototype, [
    catchError,
    concat,
    debounce,
    filter,
    flatMap,
    forEach,
    map,
    merge,
    reduce,
    scan,
    startWith,
    take,
    toArray,
    transform,
  ]);
};

export {
  addAll as default,
  addAll,
  addOperators,
  catchError,
  concat,
  debounce,
  defer,
  error,
  filter,
  flatMap,
  forEach,
  fromEvent,
  fromPromise,
  interval,
  map,
  merge,
  reduce,
  scan,
  startWith,
  take,
  toArray,
  transform,
};
