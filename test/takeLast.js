import { expect } from 'chai';
import sinon from 'sinon';
import takeLast from '../src/takeLast';
import apiCheck from './common/apiCheck';

describe('(Operator) takeLast', () => {
  apiCheck(takeLast);

  it('returns a new Observable', () => {
    expect(takeLast(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('takes the last N values of the input observable', () => {
    const outputValues = [];

    takeLast(Observable.of(1, 2, 3, 4, 5), 2).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.eql([4, 5]);
  });

  it('propagates errors from the input observable', () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    takeLast(errorObservable, 5).subscribe({
      error: errorHandler,
    });

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
