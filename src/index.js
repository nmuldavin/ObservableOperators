import addOperators from './addOperators';
import addCreators from './addCreators';

import catchError from './catchError';
import concat from './concat';
import debounce from './debounce';
import defer from './defer';
import delay from './delay';
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
import skip from './skip';
import skipLast from './skipLast';
import skipUntil from './skipUntil';
import startWith from './startWith';
import switchMap from './switchMap';
import take from './take';
import takeLast from './takeLast';
import takeUntil from './takeUntil';
import throttle from './throttle';
import toArray from './toArray';
import transform from './transform';

const addAll = (target = Observable) => {
  addCreators(target, [defer, error, fromEvent, fromPromise, interval]);

  addOperators(target.prototype, [
    catchError,
    concat,
    debounce,
    delay,
    filter,
    flatMap,
    forEach,
    map,
    merge,
    reduce,
    scan,
    skip,
    skipLast,
    skipUntil,
    startWith,
    switchMap,
    take,
    takeLast,
    takeUntil,
    throttle,
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
  delay,
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
  skip,
  skipLast,
  startWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  throttle,
  skipUntil,
  toArray,
  transform,
};
