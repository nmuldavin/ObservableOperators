import { expect } from 'chai';
import sinon from 'sinon';
import defer from '../src/defer';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Creator) defer', () => {
  let observer;
  let error;

  apiCheck(defer);

  it('should return an instance of the global Observable by default', () => {
    expect(defer(() => null)).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of specified constructor', () => {
    expect(defer(() => null, MyObservable)).to.be.an.instanceOf(MyObservable);
  });

  it('should not execute deferred action before subscription', () => {
    const action = sinon.spy();
    defer(action);
    expect(action).to.not.have.been.called;
  });

  it('should execute deferred action upon subscription', async () => {
    const action = sinon.spy();

    await new Promise(resolve => defer(action).subscribe(resolve));

    expect(action).to.have.been.calledOnce;
  });

  it('should emit the returned value of the action then complete', async () => {
    await new Promise(resolve => {
      observer = {
        next: sinon.spy(),
        complete: sinon.spy(resolve),
      };
      defer(() => Promise.resolve('value')).subscribe(observer);
    });

    expect(observer.next).to.have.been.calledWith('value');
    expect(observer.complete).to.have.been.calledOnce;
  });

  it('should error upon promise rejection', async () => {
    await new Promise(resolve => {
      error = new Error('error');

      observer = {
        error: sinon.spy(resolve),
      };

      defer(() => Promise.reject(error)).subscribe(observer);
    });

    expect(observer.error).to.have.been.calledWith(error);
  });
});
