import { expect } from 'chai';
import sinon from 'sinon';
import skipUntil from '../src/skipUntil';
import apiCheck from './common/apiCheck';

describe('(Operator) skipUntil', () => {
  const signal = new Observable(observer => {
    setTimeout(() => {
      observer.next();
    }, 110);
  });

  apiCheck(skipUntil);

  it('returns a new Observable', () => {
    expect(skipUntil(Observable.of(), Observable.of())).to.be.an.instanceOf(
      Observable,
    );
  });

  it('skips values until it receives a value from the signal Observable', async () => {
    const observedValues = [];

    await new Promise(resolve => {
      const subscription = skipUntil(Observable.interval(50), signal).subscribe(
        value => {
          observedValues.push(value);
        },
      );

      setTimeout(() => {
        subscription.unsubscribe();
        resolve();
      }, 220);
    });

    expect(observedValues).to.eql([2, 3]);
  });

  it('returns an empty Observable if the signal never emits', async () => {
    const observedValues = [];

    await new Promise(resolve =>
      skipUntil(Observable.of(1, 2, 3), Observable.of()).subscribe({
        next(value) {
          observedValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(observedValues).to.eql([]);
  });

  it('propagates errors from the input observable', () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    skipUntil(errorObservable, signal).subscribe({
      error: errorHandler,
    });

    expect(errorHandler).to.have.been.calledWith('error');
  });

  it('propagates errors from the signal observable', () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    skipUntil(Observable.of(1, 2, 3), errorObservable).subscribe({
      error: errorHandler,
    });

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
