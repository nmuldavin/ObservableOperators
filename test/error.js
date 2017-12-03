import { expect } from 'chai';
import sinon from 'sinon';
import error from '../src/error';
import apiCheck from './common/apiCheck';

describe('(Creator) error', () => {
  apiCheck(error);

  it('should return an Observable', () => {
    expect(error(Promise.resolve())).to.be.an.instanceOf(Observable);
  });

  it('should trigger an Observable error event with the provided value', () => {
    const observer = { error: sinon.spy() };
    error('error').subscribe(observer);
    expect(observer.error).to.have.been.calledWith('error');
  });
});
