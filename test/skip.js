import { expect } from 'chai';
import skip from '../src/skip';
import apiCheck from './common/apiCheck';

describe('(Operator) skip', () => {
  apiCheck(skip);

  it('returns a new Observable', () => {
    expect(skip(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('skips the first N values of the input observable', () => {
    const outputValues = [];

    skip(Observable.of(1, 2, 3, 4), 2).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.eql([3, 4]);
  });
});
