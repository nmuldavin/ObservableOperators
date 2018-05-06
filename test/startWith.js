import { expect } from 'chai';
import startWith from '../src/startWith';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) startWith', () => {
  apiCheck(startWith);

  it('returns a new Observable', () => {
    expect(startWith(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of the first input Observable', () => {
    expect(startWith(MyObservable.of(), 2)).to.be.an.instanceOf(MyObservable);
  });

  it('starts with the provided values', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      startWith(Observable.of(1, 2, 3), 4, 5, 6).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([4, 5, 6, 1, 2, 3]);
  });
});
