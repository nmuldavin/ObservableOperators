import { expect } from 'chai';
import sinon from 'sinon';
import forEach from '../src/forEach';
import apiCheck from './common/apiCheck';

describe('(Operator) forEach', () => {
  apiCheck(forEach);

  it('returns a promise', () => {
    expect(forEach(Observable.of())).to.be.an.instanceOf(Promise);
  });

  it('call the provided function with each observed value', async () => {
    const spy = sinon.spy();

    await forEach(Observable.of(1, 2, 3), spy);

    expect(spy.args).to.eql([[1], [2], [3]]);
  });

  it('should reject on an error in the input observable', async () => {
    const errorHandler = sinon.spy();

    await forEach(
      new Observable(observer => observer.error('error')),
      () => null,
    ).catch(errorHandler);

    expect(errorHandler).to.have.been.calledWith('error');
  });

  it('should reject on an error in the function execution', async () => {
    const errorHandler = sinon.spy();
    const error = new Error('things went bad');

    await forEach(Observable.of(1, 2, 3), () => {
      throw error;
    }).catch(errorHandler);

    expect(errorHandler).to.have.been.calledWith(error);
  });
});
