import { expect } from 'chai';
import sinon from 'sinon';
import flatMap from '../src/flatMap';
import apiCheck from './common/apiCheck';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('(Operator) flatMap', () => {
  apiCheck(flatMap);

  it('returns a new Observable', () => {
    expect(flatMap(Observable.of(), x => x)).to.be.an.instanceOf(Observable);
  });

  it('should apply mapping function with each value', () => {
    const map = sinon.spy(x => Observable.of(x));

    flatMap(Observable.of(1, 2, 3), map).subscribe(() => {});

    expect(map)
      .to.have.been.calledWithExactly(1)
      .and.calledWithExactly(2)
      .and.calledWithExactly(3);
  });

  it('should merge the output of all mapped Observables', () => {
    const outputValues = [];

    flatMap(Observable.of(2, 3, 5), value =>
      Observable.of(value, value ** 2),
    ).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.include.members([2, 3, 5, 4, 9, 25]);
  });

  it('should handle generators', () => {
    function* emitThreeAfter(val) {
      yield val + 1;
      yield val + 2;
      yield val + 3;
    }

    const outputValues = [];

    flatMap(Observable.of(1, 10, 20), emitThreeAfter).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.include.members([2, 3, 4, 11, 12, 13, 21, 22, 23]);
  });

  it('should handle and flatten arrays', () => {
    const emitThreeAfter = val => [val + 1, val + 2, val + 3];

    const outputValues = [];

    flatMap(Observable.of(1, 10, 20), emitThreeAfter).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.include.members([2, 3, 4, 11, 12, 13, 21, 22, 23]);
  });

  it('should unsubscribe from mapped Observables when unsubscribed', () => {
    const unsubscribeSpy = sinon.spy();

    const map = () => new Observable(() => unsubscribeSpy());

    const source = new Observable(observer => {
      observer.next();
    });

    flatMap(source, map)
      .subscribe(() => {})
      .unsubscribe();

    expect(unsubscribeSpy).to.have.been.calledOnce;
  });

  it('should propagate errors from the original Observable', () => {
    const errorHandlerSpy = sinon.spy();
    const errorObservable = new Observable(observer => {
      observer.error('error');
    });

    flatMap(errorObservable, () => Observable.of()).subscribe({
      error: errorHandlerSpy,
    });

    expect(errorHandlerSpy).to.have.been.calledWith('error');
  });

  it('should propagate errors from mapped Observables', () => {
    const errorHandlerSpy = sinon.spy();
    const errorObservable = new Observable(observer => {
      observer.error('error');
    });

    flatMap(Observable.of(1), () => errorObservable).subscribe({
      error: errorHandlerSpy,
    });

    expect(errorHandlerSpy).to.have.been.calledWith('error');
  });

  it('should handle errors in mapping function', () => {
    const errorHandlerSpy = sinon.spy();

    const error = new Error('error');

    const map = () => {
      throw error;
    };

    try {
      flatMap(Observable.of(1, 2, 3), map).subscribe({
        error: errorHandlerSpy,
      });
      // eslint-disable-next-line
    } catch (e) {}

    expect(errorHandlerSpy).to.have.been.calledWith(error);
  });

  it('should not complete until all mapped Observables have completed', async () => {
    const completeSpy = sinon.spy();
    const waitAWhile = new Observable(observer => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 100);
    });

    flatMap(Observable.of(1), () => waitAWhile).subscribe({
      complete: completeSpy,
    });

    await timeout(25);

    expect(completeSpy).to.not.have.been.called;

    await timeout(75);

    expect(completeSpy).to.have.been.called;
  });
});