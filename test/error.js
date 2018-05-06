import { expect } from 'chai';
import sinon from 'sinon';
import error from '../src/error';
import apiCheck from './common/apiCheck';
import MyObservable from './utils/MyObservable';

describe('(Creator) error', () => {
  apiCheck(error);

  it('should return an instance of the global Observable by default', () => {
    expect(error(Promise.resolve())).to.be.an.instanceOf(Observable);
  });

  it('returns a new instance of specified constructor', () => {
    expect(error(Promise.resolve(), MyObservable)).to.be.an.instanceOf(
      MyObservable,
    );
  });

  it('should trigger an Observable error event with the provided value', async () => {
    const errorHandler = sinon.spy();

    await new Promise(resolve => {
      error('error').subscribe({
        error(e) {
          errorHandler(e);
          resolve();
        },
      });
    });

    expect(errorHandler).to.have.been.calledWith('error');
  });
});
