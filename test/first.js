import { expect } from 'chai';
import first from '../src/first';
import apiCheck from './common/apiCheck';

describe('(First) defer', () => {
  apiCheck(first);

  it('emits the first element of an Observable', () => {
    expect(first(Observable.of(1, 2, 3))).to.eql(1);
  });
});
