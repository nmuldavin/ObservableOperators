import { expect } from 'chai';
import sinon from 'sinon';
import skipLast from '../src/skipLast';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) skipLast', () => {
  apiCheck(skipLast);

  it('returns a new Observable', () => {
    expect(skipLast(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of the first input Observable', () => {
    expect(skipLast(MyObservable.of())).to.be.an.instanceOf(MyObservable);
  });

  it('leaves off the last N values of the input observable', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      skipLast(Observable.of(1, 2, 3, 4, 5), 2).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([1, 2, 3]);
  });

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      skipLast(errorObservable, 5).subscribe({
        error(e) {
          errorHandler(e);
          resolve();
        },
      }),
    );

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
