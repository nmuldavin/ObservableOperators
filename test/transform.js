import { expect } from 'chai';
import sinon from 'sinon';
import transform from '../src/transform';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Operator) transform', () => {
  apiCheck(transform);

  it('returns a new observable', () => {
    expect(transform(Observable.of(), () => null)).to.be.an.instanceOf(
      Observable,
    );
  });

  it('returns a new instance of the first input Observable', () => {
    expect(transform(MyObservable.of())).to.be.an.instanceOf(MyObservable);
  });

  it('calls the provided operation function once for each observed value', async () => {
    const operation = sinon.spy();

    await new Promise(resolve =>
      transform(Observable.of(1, 2, 3), operation).subscribe({
        complete: resolve,
      }),
    );
    expect(operation).to.have.callCount(3);
  });

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      transform(errorObservable, () => null).subscribe({
        error(e) {
          errorHandler(e);
          resolve();
        },
      }),
    );

    expect(errorHandler).to.have.been.calledWith('error');
  });

  it('propagates complete calls from the input observable', async () => {
    const completeObservable = new Observable(observer => observer.complete());

    const completionHandler = sinon.spy();

    await new Promise(resolve =>
      transform(completeObservable, () => null).subscribe({
        complete() {
          completionHandler();
          resolve();
        },
      }),
    );

    expect(completionHandler).to.have.been.calledOnce;
  });

  it('propagates errors that occur in the provided operation', async () => {
    const error = new Error('things went bad');
    const errorHandler = sinon.spy();
    try {
      await new Promise(resolve =>
        transform(Observable.of(1, 2, 3), () => {
          throw error;
        }).subscribe({
          error(e) {
            errorHandler(e);
            resolve();
          },
        }),
      );
      // eslint-disable-next-line
    } catch (e) {}

    expect(errorHandler).to.have.been.calledWith(error);
  });
});
