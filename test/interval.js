import { expect } from 'chai';
import sinon from 'sinon';
import interval from '../src/interval';
import apiCheck from './common/apiCheck';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('(Creator) interval', () => {
  apiCheck(interval);

  it('should return an Observable', () => {
    expect(interval(() => null)).to.be.an.instanceOf(Observable);
  });

  it('should count up integers at the specified rate', async () => {
    const observer = sinon.spy();
    const subscription = interval(50).subscribe(observer);
    await timeout(50);
    expect(observer).to.have.been.calledWith(0);
    await timeout(50);
    expect(observer).to.have.been.calledWith(1);
    await timeout(50);
    expect(observer).to.have.been.calledWith(2);
    subscription.unsubscribe();
    expect(observer).to.have.callCount(3);
  });

  it('should clear interval on unsubscribe', () => {
    sinon.spy(global, 'clearInterval');
    interval(50)
      .subscribe(() => null)
      .unsubscribe();
    expect(global.clearInterval).to.have.been.calledOnce;
    global.clearInterval.restore();
  });
});
