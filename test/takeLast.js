import { expect } from 'chai';
import sinon from 'sinon';
import takeLast from '../src/takeLast';
import apiCheck from './common/apiCheck';

describe('(Operator) takeLast', () => {
  apiCheck(takeLast);

  it('returns a new Observable', () => {
    expect(takeLast(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('takes the last N values of the input observable', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      takeLast(Observable.of(1, 2, 3, 4, 5), 2).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.eql([4, 5]);
  });

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      takeLast(errorObservable, 5).subscribe({
        error(e) {
          errorHandler(e);
          resolve();
        },
      }),
    );

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
