import { expect } from 'chai';
import scan from '../src/scan';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) scan', () => {
  apiCheck(scan);

  it('returns a new Observable', () => {
    expect(scan(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of the first input Observable', () => {
    expect(scan(MyObservable.of())).to.be.an.instanceOf(MyObservable);
  });

  it('emits the correct accumulated values', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      scan(Observable.of(1, 2, 3), (acc, val) => acc + val, 0).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([1, 3, 6]);
  });

  it('should start with the provided initial value', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      scan(Observable.of(1, 2, 3), (acc, val) => acc + val, 3).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([4, 6, 9]);
  });
});
