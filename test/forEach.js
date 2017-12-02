import { expect } from 'chai';
import sinon from 'sinon';
import forEach from '../src/forEach';
import apiCheck from './common/apiCheck';

describe('(Operator) forEach', () => {
  apiCheck(forEach);

  it('returns a promise', () => {
    expect(forEach(Observable.of())).to.be.an.instanceOf(Promise);
  });

  it('call the provided function with each observed value', () => {
    const spy = sinon.spy();

    return forEach(Observable.of(1, 2, 3), spy).then(() =>
      expect(spy.args).to.eql([[1], [2], [3]]),
    );
  });

  it('should reject on an error in the input observable', () => {
    const errorHandler = sinon.spy();

    return forEach(
      new Observable(observer => observer.error('error')),
      () => null,
    )
      .catch(errorHandler)
      .then(() => expect(errorHandler).to.have.been.calledWith('error'));
  });

  it('should reject on an error in the function execution', () => {
    const errorHandler = sinon.spy();
    const error = new Error('things went bad');

    return forEach(Observable.of(1, 2, 3), () => {
      throw error;
    })
      .catch(errorHandler)
      .then(() => expect(errorHandler).to.have.been.calledWith(error));
  });
});
