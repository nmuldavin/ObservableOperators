import { expect } from 'chai';
import sinon from 'sinon';
import transform from '../src/transform';
import apiCheck from './common/apiCheck';

describe('(Operator) transform', () => {
  apiCheck(transform);

  it('returns a new observable', () => {
    expect(transform(Observable.of()), () => null).to.be.an.instanceOf(
      Observable,
    );
  });

  it('calls the provided operation function once for each observed value', () => {
    const operation = sinon.spy();
    transform(Observable.of(1, 2, 3), operation).subscribe(() => null);
    expect(operation).to.have.callCount(3);
  });

  it('propagates errors from the input observable', () => {
    const errorObservable = new Observable(observer => observer.error('error'));
    const errorHandler = sinon.spy();

    transform(errorObservable, () => null).subscribe({
      error: errorHandler,
    });

    expect(errorHandler).to.have.been.calledWith('error');
  });

  it('propagates complete calls from the input observable', () => {
    const completeObservable = new Observable(observer => observer.complete());

    const completionHandler = sinon.spy();

    transform(completeObservable, () => null).subscribe({
      complete: completionHandler,
    });

    expect(completionHandler).to.have.been.calledOnce;
  });

  it('propagates errors that occur in the provided operation', () => {
    const error = new Error('things went bad');
    const errorHandler = sinon.spy();
    try {
      transform(Observable.of(1, 2, 3), () => {
        throw error;
      }).subscribe({
        error(e) {
          errorHandler(e);
        },
      });
      // eslint-disable-next-line
    } catch (e) {}

    expect(errorHandler).to.have.been.calledWith(error);
  });
});
