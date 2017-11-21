# ObservableOperators

[![Build Status](https://travis-ci.org/nmuldavin/ObservableOperators.svg?branch=master)](https://travis-ci.org/nmuldavin/ObservableOperators)
[![Coverage Status](https://coveralls.io/repos/github/nmuldavin/ObservableOperators/badge.svg?branch=master)](https://coveralls.io/github/nmuldavin/ObservableOperators?branch=master)
[![npm version](https://badge.fury.io/js/observable-operators.svg)](https://badge.fury.io/js/observable-operators)

A library of [Reactive Operators](http://reactivex.io/documentation/operators.html) built with the [ECMAScript Observable](https://github.com/tc39/proposal-observables) from the ground up.

* Flexible - Operators can be expressed in functional or fluent format
* Small - If you want everything there's RxJS, this library should include a small subset of canonical Operators
* Well [documented](https://nmuldavin.github.io/ObservableOperators/)


## Install

Install with `npm` or `yarn`:

```
npm install observable-operators
```

## Use

This library's default export will add all available methods to `Observable.prototype` so that they may be chained in the reactive style:

```
import addAll from 'observable-operators';

addAll();

Observable.of(1, 2, 3, 4)
  .map(x => x + 2)
  .filter(x => x % 2)
  .subscribe(console.log); // 4, 6
```

With `require` the `addAll` method can be called inline:

```
require('observable-operators').addAll();
```

`Observable.prototype` *will not be modified unless this function is invoked*. If you wish to have all operators available, you should import this module somewhere high-up so that it runs before the rest of your code.

### Specifying another target

If you do not wish to modify `Observable.prototype` you can pass in a different target object:

```
addAll(MyObservable.prototype)
```

This will allow chaining on your custom Observable as long as it has the core methods specified in the [Observable proposal](https://github.com/tc39/proposal-observable).

You could even (if you wanted) add operators to a single Observable instance:

```
addAll(myObservable)
```

### Functional style

If you prefer functional style rather than fluent, you can import all Operators directly. When referenced this way, the target Observable can be passed in as the first argument

```
import { map, reduce } from 'observable-operators';

async function average (observable) {
  const result = await reduce(
    map(observable, x => x * 2),
    ({ count, sum }, val) => ({ count: count + 1, sum: sum + val }),
    { count: 0, sum: 0 }
  );

  return result.count / result.sum;
}
```

## Available Operators

As of now this library is set up with a very small set of Operators to get the project going. A list of all available Operators and accompanying documentation is found [here](https://nmuldavin.github.io/ObservableOperators/). Quite clearly this is nowhere near complete, pull requests gladly accepted!

## Motivation

There are great existing reactive observable libraries out there already such as [most.js](https://github.com/cujojs/most) and [RxJS](https://github.com/Reactive-Extensions/RxJS), but none of them that are built from the bottom up on top of the [ECMAScript Observable](https://github.com/tc39/proposal-observables) proposal that will inevitably be part of the language very soon. This is that library.
