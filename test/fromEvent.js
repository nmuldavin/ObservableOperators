import { expect } from 'chai';
import sinon from 'sinon';
import fromEvent from '../src/fromEvent';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Creator) fromEvent', () => {
  const element = document.createElement('div');
  const observableStream = fromEvent(element, 'click');
  sinon.spy(element, 'addEventListener');
  sinon.spy(element, 'removeEventListener');

  afterEach(() => {
    element.addEventListener.resetHistory();
    element.removeEventListener.resetHistory();
  });

  after(() => {
    element.remove();
  });

  apiCheck(fromEvent);

  it('should return an Observable', () => {
    expect(observableStream).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of specified constructor', () => {
    expect(fromEvent(element, 'click', MyObservable)).to.be.an.instanceOf(
      MyObservable,
    );
  });

  it('should not register event listener before subscription', () => {
    expect(element.addEventListener).to.not.have.been.called;
  });

  it('should register event upon subscription', () => {
    observableStream.subscribe(() => null);
    expect(element.addEventListener).to.have.been.calledOnce;
  });

  it('should emit an observable event when the specified dom event is triggered', () => {
    const spy = sinon.spy();
    const subscription = observableStream.subscribe(spy);
    element.click();
    expect(spy).to.have.been.calledOnce;
    subscription.unsubscribe();
  });

  it('should unregister listener upon unsubsciption', () => {
    observableStream.subscribe(() => null).unsubscribe();
    expect(element.removeEventListener).to.have.been.calledOnce;
  });
});
