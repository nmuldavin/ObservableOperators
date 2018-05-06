import { expect } from 'chai';
import map from '../src/map';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) map', () => {
  apiCheck(map);

  it('returns a new Observable', () => {
    expect(map(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of the first input Observable', () => {
    expect(map(MyObservable.of(), x => x)).to.be.an.instanceOf(MyObservable);
  });

  it('emits the result of the operation applied to each input element', async () => {
    const outputValues = [];

    await new Promise(resolve => {
      map(Observable.of(1, 2, 3), x => x * 2).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      });
    });

    expect(outputValues).to.eql([2, 4, 6]);
  });
});
