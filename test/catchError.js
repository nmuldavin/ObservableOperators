import { expect } from 'chai';
import sinon from 'sinon';
import catchError from '../src/catchError';
import apiCheck from './common/apiCheck';

describe('(Operator) catchError', () => {
  apiCheck(catchError);

  it('returns a new Observable', () => {
    expect(
      catchError(Observable.of(), () => Observable.of()),
    ).to.be.an.instanceOf(Observable);
  });

  it('does not propagate errors from original stream', async () => {
    const errorHandler = sinon.spy();

    await new Promise(resolve =>
      catchError(new Observable(observer => observer.error()), () =>
        Observable.of(),
      ).subscribe({
        error: errorHandler,
        complete: resolve,
      }),
    );

    expect(errorHandler).to.not.have.been.called;
  });

  it('replaces stream with new Observable on error', () => {
    const source = new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.error(new Error('error'));
    });

    const outputValues = [];

    catchError(source, () => Observable.of(3, 4, 5)).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.eql([1, 2, 3, 4, 5]);
  });

  it('passes the error value to the mapping function', () => {
    const source = new Observable(observer => observer.error('error'));

    const map = sinon.spy(() => Observable.of());

    catchError(source, map).subscribe(() => {});

    expect(map).to.have.been.calledWith('error');
  });

  it('does not modify stream if no error occurs', () => {
    const source = Observable.of(1, 2, 3);

    const outputValues = [];

    catchError(source, () => Observable.of(3, 4, 5)).subscribe(value => {
      outputValues.push(value);
    });

    expect(outputValues).to.eql([1, 2, 3]);
  });
});
