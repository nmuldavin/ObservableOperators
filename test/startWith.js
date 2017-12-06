import { expect } from 'chai';
import startWith from '../src/startWith';
import apiCheck from './common/apiCheck';

describe('(Operator) startWith', () => {
  apiCheck(startWith);

  it('returns a new Observable', () => {
    expect(startWith(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('starts with the provided values', () => {
    const outputValues = [];

    startWith(Observable.of(1, 2, 3), 4, 5, 6).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.eql([4, 5, 6, 1, 2, 3]);
  });
});
