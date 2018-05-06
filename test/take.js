import { expect } from 'chai';
import take from '../src/take';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) take', () => {
  apiCheck(take);

  it('returns a new Observable', () => {
    expect(take(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of the first input Observable', () => {
    expect(take(MyObservable.of(), 1)).to.be.an.instanceOf(MyObservable);
  });

  it('emits the first N values of the input observable', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      take(Observable.of(1, 2, 3, 4), 2).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([1, 2]);
  });

  it('returns an empty observable when called with N = 0', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      take(Observable.of(1, 2, 3, 4), 0).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([]);
  });
});
