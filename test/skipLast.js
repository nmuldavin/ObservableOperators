import { expect } from 'chai';
import sinon from 'sinon';
import skipLast from '../src/skipLast';
import apiCheck from './common/apiCheck';

describe('(Operator) skipLast', () => {
  apiCheck(skipLast);

  it('returns a new Observable', () => {
    expect(skipLast(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('leaves off the last N values of the input observable', () => {
    const outputValues = [];

    skipLast(Observable.of(1, 2, 3, 4, 5), 2).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.eql([1, 2, 3]);
  });

  it('propagates errors from the input observable', () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    skipLast(errorObservable, 5).subscribe({
      error: errorHandler,
    });

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
