import { expect } from 'chai';
import sinon from 'sinon';
import takeUntil from '../src/takeUntil';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) takeUntil', () => {
  const signal = new Observable(observer => {
    setTimeout(() => {
      observer.next();
    }, 110);
  });

  apiCheck(takeUntil);

  it('returns a new Observable', () => {
    expect(takeUntil(Observable.of(), Observable.of())).to.be.an.instanceOf(
      Observable,
    );
  });

  it('returns a new instance of the first input Observable', () => {
    expect(takeUntil(MyObservable.of(), MyObservable.of())).to.be.an.instanceOf(
      MyObservable,
    );
  });

  it('emits values until it receives a value from the signal Observable', async () => {
    const observedValues = [];

    await new Promise(resolve =>
      takeUntil(Observable.interval(50), signal).subscribe({
        next(value) {
          observedValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(observedValues).to.eql([0, 1]);
  });

  it('returns an empty Observable if the signal emits a value right away', async () => {
    const observedValues = [];

    await new Promise(resolve =>
      takeUntil(Observable.interval(50), Observable.of(1)).subscribe({
        next(value) {
          observedValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(observedValues).to.eql([]);
  });

  it('does not modify the input if the signal never emits', async () => {
    const observedValues = [];

    await new Promise(resolve =>
      takeUntil(Observable.of(1, 2, 3), Observable.of()).subscribe({
        next(value) {
          observedValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(observedValues).to.eql([1, 2, 3]);
  });

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      takeUntil(errorObservable, signal).subscribe({
        error(e) {
          errorHandler(e);
          resolve();
        },
      }),
    );

    expect(errorHandler).to.have.been.calledWith('error');
  });

  it('propagates errors from the signal observable', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      takeUntil(Observable.of(1, 2, 3), errorObservable).subscribe({
        error(e) {
          errorHandler(e);
          resolve();
        },
      }),
    );

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
