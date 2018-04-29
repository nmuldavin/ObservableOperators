import { expect } from 'chai';
import skip from '../src/skip';
import apiCheck from './common/apiCheck';

describe('(Operator) skip', () => {
  apiCheck(skip);

  it('returns a new Observable', () => {
    expect(skip(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('skips the first N values of the input observable', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      skip(Observable.of(1, 2, 3, 4), 2).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([3, 4]);
  });
});
