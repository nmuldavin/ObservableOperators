import { expect } from 'chai';
import sinon from 'sinon';
import delay from '../src/delay';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

const emitAfterTime = (observer, ms, value) =>
  setTimeout(() => observer.next(value), ms);

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('(Operator) delay', () => {
  apiCheck(delay);

  it('returns a new Observable', () => {
    expect(delay(Observable.of(), 100)).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of the first input Observable', () => {
    expect(delay(MyObservable.of(), 100)).to.be.an.instanceOf(MyObservable);
  });

  it('delays values by the specified time', async () => {
    const observedValues = [];
    delay(Observable.of(1, 2, 3), 100).subscribe(value =>
      observedValues.push(value),
    );
    await timeout(95);
    expect(observedValues).to.eql([]);
    await timeout(50);
    expect(observedValues).to.eql([1, 2, 3]);
  });

  it('preserves event spacing', async () => {
    const source = new Observable(observer => {
      emitAfterTime(observer, 50, 1);
      emitAfterTime(observer, 150, 2);
      setTimeout(() => observer.complete(), 200);
    });

    const observedValues = [];

    delay(source, 100).subscribe(value => observedValues.push(value));

    await timeout(160);
    expect(observedValues).to.eql([1]);
    await timeout(85);
    expect(observedValues).to.eql([1]);
    await timeout(20);
    expect(observedValues).to.eql([1, 2]);
  });

  it('does not emit values after unsubscription', () => {
    const observer = sinon.spy();
    delay(Observable.of(1, 2, 3), 1000)
      .subscribe(observer)
      .unsubscribe();
    expect(observer).to.not.have.been.called;
  });

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      delay(errorObservable, 50).subscribe({
        error: e => {
          errorHandler(e);
          resolve();
        },
      }),
    );
    expect(errorHandler).to.have.been.calledWith('error');
  });
});
