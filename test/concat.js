import { expect } from 'chai';
import sinon from 'sinon';
import concat from '../src/concat';
import apiCheck from './common/apiCheck';

describe('(Operator) concat', () => {
  apiCheck(concat);

  it('returns a new Observable', () => {
    expect(concat(Observable.of(), Observable.of())).to.be.an.instanceOf(
      Observable,
    );
  });

  it('emits all values from all input observables in order', async () => {
    const outputValues = [];
    const one = new Observable(observer => {
      setTimeout(() => {
        observer.next(1);
        observer.complete();
      }, 100);
    });

    await new Promise(resolve => {
      concat(one, Observable.of(4, 5, 6), Observable.of(7, 8, 9)).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      });
    });

    expect(outputValues).to.eql([1, 4, 5, 6, 7, 8, 9]);
  });

  it('propagates errors from all inputs', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler1 = sinon.spy();
    const errorHandler2 = sinon.spy();

    await new Promise(resolve =>
      concat(errorObservable, Observable.of()).subscribe({
        error: e => {
          errorHandler1(e);
          resolve();
        },
      }),
    );

    expect(errorHandler1).to.have.been.calledWith('error');

    await new Promise(resolve =>
      concat(Observable.of(), errorObservable).subscribe({
        error: e => {
          errorHandler2(e);
          resolve();
        },
      }),
    );

    expect(errorHandler2).to.have.been.calledWith('error');
  });
});
