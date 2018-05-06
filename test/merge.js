import { expect } from 'chai';
import sinon from 'sinon';
import merge from '../src/merge';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) merge', () => {
  apiCheck(merge);

  it('returns a new Observable', () => {
    expect(merge(Observable.of(), Observable.of())).to.be.an.instanceOf(
      Observable,
    );
  });

  it('returns a new instance of the first input Observable', () => {
    expect(merge(MyObservable.of(), Observable.of())).to.be.an.instanceOf(
      MyObservable,
    );
  });

  it('emits all values from all input observables', async () => {
    const outputValues = [];

    await new Promise(resolve =>
      merge(
        Observable.of(1, 2, 3),
        Observable.of(4, 5, 6),
        Observable.of(7, 8, 9),
      ).subscribe({
        next(value) {
          outputValues.push(value);
        },
        complete: resolve,
      }),
    );

    expect(outputValues).to.include.members([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('propagates errors from all inputs', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler1 = sinon.spy();
    const errorHandler2 = sinon.spy();

    await new Promise(resolve =>
      merge(errorObservable, Observable.of()).subscribe({
        error(e) {
          errorHandler1(e);
          resolve();
        },
      }),
    );

    expect(errorHandler1).to.have.been.calledWith('error');

    await new Promise(resolve =>
      merge(Observable.of(), errorObservable).subscribe({
        error(e) {
          errorHandler2(e);
          resolve();
        },
      }),
    );

    expect(errorHandler2).to.have.been.calledWith('error');
  });
});
