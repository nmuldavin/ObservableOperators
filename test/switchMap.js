import { expect } from 'chai';
import sinon from 'sinon';
import switchMap from '../src/switchMap';
import apiCheck from './common/apiCheck';

const emitAfterTime = (observer, ms, value) =>
  setTimeout(() => observer.next(value), ms);

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('(Operator) switchMap', () => {
  apiCheck(switchMap);

  it('returns a new Observable', () => {
    expect(switchMap(Observable.of(), x => x)).to.be.an.instanceOf(Observable);
  });

  it('should apply mapping function with each value', async () => {
    const map = sinon.spy(x => Observable.of(x));

    await new Promise(resolve =>
      switchMap(Observable.of(1, 2, 3), map).subscribe({
        complete: resolve,
      }),
    );

    expect(map)
      .to.have.been.calledWithExactly(1)
      .and.calledWithExactly(2)
      .and.calledWithExactly(3);
  });

  it('should emit the latest values of the most recently mapped Observable', async () => {
    const sink = sinon.spy();

    const source = new Observable(observer => {
      emitAfterTime(observer, 50, 1);
      emitAfterTime(observer, 100, 50);
      setTimeout(() => observer.complete(), 150);
    });

    const mapValue = value =>
      new Observable(observer => {
        observer.next(value * 10);
        emitAfterTime(observer, 100, value * 20);
        setTimeout(() => observer.complete(), 150);
      });

    const mapped = switchMap(source, mapValue);

    mapped.subscribe(sink);

    await timeout(75);

    expect(sink)
      .to.have.been.calledWith(10)
      .and.to.not.have.been.calledWith(20)
      .and.to.not.have.been.calledWith(500);

    await timeout(50);

    expect(sink)
      .to.have.been.calledWith(500)
      .and.to.not.have.been.calledWith(20);
  });

  it('should unsubscribe from each mapped Observable before subscribing to the next', async () => {
    const unsubscribeSpy1 = sinon.spy();
    const unsubscribeSpy2 = sinon.spy();

    const mapped1 = new Observable(() => unsubscribeSpy1);
    sinon.spy(mapped1, 'subscribe');
    const mapped2 = new Observable(() => unsubscribeSpy2);
    sinon.spy(mapped2, 'subscribe');

    const source = new Observable(observer => {
      emitAfterTime(observer, 50, 1);
      emitAfterTime(observer, 100, 2);
      setTimeout(() => observer.complete(), 150);
    });

    const mapValue = value => {
      if (value === 1) {
        return mapped1;
      }

      if (value === 2) {
        return mapped2;
      }

      return Observable.of();
    };

    const mapped = switchMap(source, mapValue);

    mapped.subscribe(() => null);

    await timeout(75);

    expect(mapped1.subscribe).to.have.been.called;
    expect(unsubscribeSpy1).to.not.have.been.called;

    await timeout(50);

    expect(unsubscribeSpy1).to.have.been.called;
    expect(mapped2.subscribe).to.have.been.called;
    expect(unsubscribeSpy2).to.not.have.been.called;
  });

  it('should unsubscribe from mapped Observable when unsubscribed', async () => {
    const unsubscribeSpy = sinon.spy();

    const map = () => new Observable(() => unsubscribeSpy);

    const source = new Observable(observer => {
      observer.next();
    });

    const subscription = switchMap(source, map).subscribe(() => {});

    await timeout(50);

    subscription.unsubscribe();

    expect(unsubscribeSpy).to.have.been.calledOnce;
  });

  it('should propagate errors from the original Observable', async () => {
    const errorHandlerSpy = sinon.spy();
    const errorObservable = new Observable(observer => {
      observer.error('error');
    });

    await new Promise(resolve => {
      switchMap(errorObservable, () => Observable.of()).subscribe({
        error(e) {
          errorHandlerSpy(e);
          resolve();
        },
      });
    });

    expect(errorHandlerSpy).to.have.been.calledWith('error');
  });

  it('should propagate errors from mapped Observables', async () => {
    const errorHandlerSpy = sinon.spy();
    const errorObservable = new Observable(observer => {
      observer.error('error');
    });

    await new Promise(resolve => {
      switchMap(Observable.of(1), () => errorObservable).subscribe({
        error(e) {
          errorHandlerSpy(e);
          resolve();
        },
      });
    });

    expect(errorHandlerSpy).to.have.been.calledWith('error');
  });
  //
  it('should handle errors in mapping function', async () => {
    const errorHandlerSpy = sinon.spy();

    const error = new Error('error');

    const map = () => {
      throw error;
    };

    try {
      await new Promise(resolve => {
        switchMap(Observable.of(1, 2, 3), map).subscribe({
          error(e) {
            errorHandlerSpy(e);
            resolve();
          },
        });
      });

      // eslint-disable-next-line
    } catch (e) {}

    expect(errorHandlerSpy).to.have.been.calledWith(error);
  });

  it('should not complete until the mapped observable has completed', async () => {
    const completeSpy = sinon.spy();
    const waitAWhile = new Observable(observer => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 100);
    });

    switchMap(Observable.of(1), () => waitAWhile).subscribe({
      complete: completeSpy,
    });

    await timeout(50);

    expect(completeSpy).to.not.have.been.called;

    await timeout(150);

    expect(completeSpy).to.have.been.called;
  });
});
