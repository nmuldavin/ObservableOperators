import { expect } from 'chai';
import scan from '../src/scan';
import apiCheck from './common/apiCheck';

describe('(Operator) scan', () => {
  apiCheck(scan);

  it('returns a new Observable', () => {
    expect(scan(Observable.of())).to.be.an.instanceOf(Observable);
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
