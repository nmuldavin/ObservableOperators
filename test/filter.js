import { expect } from 'chai';
import filter from '../src/filter';
import apiCheck from './common/apiCheck';

describe('(Operator) filter', () => {
  apiCheck(filter);

  it('returns a new Observable', () => {
    expect(filter(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('emits only the input values for which the filtering operation returns truthy', async () => {
    const outputValues = [];

    await new Promise(resolve => {
      filter(Observable.of(1, 2, 3, 4), x => x % 2 === 0).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      });
    });

    expect(outputValues).to.eql([2, 4]);
  });
});
