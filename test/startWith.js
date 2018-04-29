import { expect } from 'chai';
import startWith from '../src/startWith';
import apiCheck from './common/apiCheck';

describe('(Operator) startWith', () => {
  apiCheck(startWith);

  it('returns a new Observable', () => {
    expect(startWith(Observable.of())).to.be.an.instanceOf(Observable);
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
