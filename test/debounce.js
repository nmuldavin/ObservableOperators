import { expect } from 'chai';
import sinon from 'sinon';
import debounce from '../src/debounce';
import apiCheck from './common/apiCheck';

const emitAfterTime = (observer, ms, value) =>
  setTimeout(() => observer.next(value), ms);

describe('(Operator) debounce', () => {
  apiCheck(debounce);

  it('returns a new Observable', () => {
    expect(debounce(Observable.of())).to.be.an.instanceOf(Observable);
  });

  it('debounces values by specified time interval', async () => {
    const source = new Observable(observer => {
      emitAfterTime(observer, 25, 1);
      emitAfterTime(observer, 50, 2);
      emitAfterTime(observer, 75, 3);
      emitAfterTime(observer, 125, 4);
      setTimeout(() => observer.complete(), 200);
    });

    const outputSpy = sinon.spy();

    await new Promise(resolve => {
      debounce(source, 30).subscribe({
        next: outputSpy,
        complete: resolve,
      });
    });

    expect(outputSpy).to.have.been.calledTwice;
    expect(outputSpy).to.have.been.calledWithExactly(3);
    expect(outputSpy).to.have.been.calledWithExactly(4);
  });

  it('emits the last value when the input completes', async () => {
    const source = new Observable(observer => {
      emitAfterTime(observer, 50, 1);
      setTimeout(() => observer.complete(), 60);
    });

    const outputSpy = sinon.spy();

    await new Promise(resolve => {
      debounce(source, 50).subscribe({
        next: outputSpy,
        complete: resolve,
      });
    });

    expect(outputSpy).to.have.been.calledOnce.and.have.been.calledWithExactly(
      1,
    );
  });

  it('does not emit more values after unsubscription', async () => {
    const source = new Observable(observer => {
      emitAfterTime(observer, 10, 1);
      setTimeout(() => observer.complete(), 60);
    });

    const outputSpy = sinon.spy();

    await new Promise(resolve => {
      const subscription = debounce(source, 50).subscribe(outputSpy);
      setTimeout(() => subscription.unsubscribe(), 30);
      setTimeout(resolve, 60);
    });

    expect(outputSpy).to.not.have.been.called;
  });
});
