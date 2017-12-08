# ObservableOperators

[![Build Status](https://travis-ci.org/nmuldavin/ObservableOperators.svg?branch=master)](https://travis-ci.org/nmuldavin/ObservableOperators)
[![Coverage Status](https://coveralls.io/repos/github/nmuldavin/ObservableOperators/badge.svg?branch=master)](https://coveralls.io/github/nmuldavin/ObservableOperators?branch=master)
[![npm version](https://badge.fury.io/js/observable-operators.svg)](https://badge.fury.io/js/observable-operators)

A library of [Reactive Operators](http://reactivex.io/documentation/operators.html) built with [ECMAScript Observables](https://github.com/tc39/proposal-observable) from the ground up.

* Flexible - Operators can be expressed in functional or fluent format
* Small - If you want everything there's RxJS, this library has a small set of canonical operators
* Well [documented](https://nmuldavin.github.io/ObservableOperators/)


## Install

Install with `npm` or `yarn`:

```
npm install observable-operators
```

You will need an ES Observable polyfill. I recommend [zen-observable](https://github.com/zenparsing/zen-observable).

## Use

This library's default export will add all available methods to the `Observable` constructor and prototype so that they may be chained in the reactive style:

```
import addAll from 'observable-operators';

addAll();

Observable.fromEvent(document, 'click')
  .merge(otherClicks)
  .map(parseEvent)
  .filter(theOnesICareAbout)
  .subscribe(console.log);
```

With `require` the `addAll` method can be called inline:

```
require('observable-operators').addAll();
```

`Observable` and `Observable.prototype` *will not be modified unless this function is invoked*. If you wish to have all operators available, you should import this module somewhere high-up so that it runs before the rest of your code.

### Specifying another target

If you do not wish to modify the global `Observable` you can pass in a different target object:

```
addAll(MyObservable)
```

This will allow chaining on your custom Observable as long as it has the core methods specified in the [Observable proposal](https://github.com/tc39/proposal-observable).

### Method types

This library distinguishes between `Operators` and `Creators`
* `Operators`: Functions that take at least one Observable as input and return something else (either another Observable, a Promise, or other value). All Operators take an Observable as the first argument. This allows them to be used either directly as functions:

  ```
  import { map } from 'observable-operators';

  map(Observable.of(1, 2, 3), x => x + 1)
    .subscribe(console.log)
  ```

  or as chainable methods once the operators are added to `Observable.prototype`:

  ```
  Observable.of(1, 2, 3)
    .map(x => x + 1)
    .merge(otherStream)
    .filter(isOdd)
    .subscribe(console.log)
  ```

  The helper method `addOperators` is used to add operators to `Observable.prototype` as part of the library's root method. If you wish to cherrypick operators you can do so:
  ```
  import { addOperators, filter, merge } from 'observable-operators'

  addOperators(Observable.prototype, [filter, merge])
  ```

* `Creators`: Functions that take other things as inputs and return Observables. Creators may be used directly as functions:

  ```
  import { fromEvent } from 'observable-operators'

  fromEvent(document, 'click').subscribe(handleEvent)
  ```

  or once added to the `Observable` constructor or another constructor, may be accessed as static methods:

  ```
  Observable.fromEvent(document, 'click').subscribe(handleEvent)
  ```

  If used as static methods creators will return an instance of the Constructor method to which they are assigned:
  ```
  MyObservable.interval(1) instanceof MyObservable // true
  ```
  If used directly as a function they will return an instance of the global Observable constructor.

  The helper function `addCreators` is used to add creators to the Observable constructor as part of the library's root method. If you wish to cherrypick creators you may do so:

  ```
  import { addCreators, interval, fromEvent } from 'observable-operators'

  addCreators(Observable, [interval, fromEvent])
  ```

## Available Methods

### Creators
* [defer](https://nmuldavin.github.io/ObservableOperators/#defer)
* [error](https://nmuldavin.github.io/ObservableOperators/#error)
* [fromEvent](https://nmuldavin.github.io/ObservableOperators/#fromevent)
* [fromPromise](https://nmuldavin.github.io/ObservableOperators/#frompromise)
* [interval](https://nmuldavin.github.io/ObservableOperators/#interval)

### Operators
* [catchError](https://nmuldavin.github.io/ObservableOperators/#catcherror)
* [concat](https://nmuldavin.github.io/ObservableOperators/#concat)
* [debounce](https://nmuldavin.github.io/ObservableOperators/#debounce)
* [delay](https://nmuldavin.github.io/ObservableOperators/#delay)
* [filter](https://nmuldavin.github.io/ObservableOperators/#filter)
* [flatMap](https://nmuldavin.github.io/ObservableOperators/#flatmap)
* [forEach](https://nmuldavin.github.io/ObservableOperators/#foreach)
* [map](https://nmuldavin.github.io/ObservableOperators/#map)
* [merge](https://nmuldavin.github.io/ObservableOperators/#merge)
* [reduce](https://nmuldavin.github.io/ObservableOperators/#reduce)
* [scan](https://nmuldavin.github.io/ObservableOperators/#scan)
* [skip](https://nmuldavin.github.io/ObservableOperators/#skip)
* [skipLast](https://nmuldavin.github.io/ObservableOperators/#skiplast)
* [skipUntil](https://nmuldavin.github.io/ObservableOperators/#skipuntil)
* [startWith](https://nmuldavin.github.io/ObservableOperators/#startwith)
* [take](https://nmuldavin.github.io/ObservableOperators/#take)
* [takeLast](https://nmuldavin.github.io/ObservableOperators/#takelast)
* [takeUntil](https://nmuldavin.github.io/ObservableOperators/#takeuntil)
* [throttle](https://nmuldavin.github.io/ObservableOperators/#throttle)
* [toArray](https://nmuldavin.github.io/ObservableOperators/#toarray)
* [transform](https://nmuldavin.github.io/ObservableOperators/#transform)

## Motivation

There are great existing reactive observable libraries out there already such as [most.js](https://github.com/cujojs/most) and [RxJS](https://github.com/Reactive-Extensions/RxJS), but none of them that are built from the bottom up on top of the [ECMAScript Observable](https://github.com/tc39/proposal-observables) proposal that will (hopefully) be part of the language. This is that library.
