import { expect } from 'chai';
import sinon from 'sinon';
import throttle from '../src/throttle';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

const emitAfterTime = (observer, ms, value) =>
  setTimeout(() => observer.next(value), ms);

describe('(Operator) throttle', () => {
  apiCheck(throttle);

  it('returns a new Observable', () => {
    expect(throttle(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of the first input Observable', () => {
    expect(throttle(MyObservable.of())).to.be.an.instanceOf(MyObservable);
  });

  it('throttles values by specified time interval', async () => {
    const outputValues = [];

    const source = new Observable(observer => {
      emitAfterTime(observer, 50, 1);
      emitAfterTime(observer, 100, 2);
      emitAfterTime(observer, 150, 3);
      emitAfterTime(observer, 200, 4);
      emitAfterTime(observer, 250, 5);
      setTimeout(() => observer.complete(), 300);
    });

    await new Promise(resolve => {
      throttle(source, 50).subscribe({
        next: value => outputValues.push(value),
        complete: resolve,
      });
    });

    expect(outputValues).to.eql([1, 3, 5]);
  });

  it('only emits when it receives a value from the input', async () => {
    const outputValues = [];

    const source = new Observable(observer => {
      observer.next(1);
      setTimeout(() => observer.complete(), 100);
    });

    await new Promise(resolve => {
      throttle(source, 25).subscribe({
        next: value => outputValues.push(value),
        complete: resolve,
      });
    });

    expect(outputValues).to.eql([1]);
  });

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      throttle(errorObservable, 50).subscribe({
        error(e) {
          errorHandler(e);
          resolve();
        },
      }),
    );

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
