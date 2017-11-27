import { expect } from 'chai'
import fromPromise from '../src/fromPromise'
import apiCheck from './common/apiCheck'
import sinon from 'sinon'

describe('(Creator) fromPromise', () => {
  let observer
  let error

  apiCheck(fromPromise)

  it('should return an Observable', () => {
    expect(fromPromise(Promise.resolve())).to.be.an.instanceOf(Observable)
  })

  it('should emit the resolved value and complete upon promise resolution', async () => {
    await new Promise(resolve => {
      observer = {
        next: sinon.spy(),
        complete: sinon.spy(resolve)
      }
      fromPromise(Promise.resolve('value')).subscribe(observer)
    })

    expect(observer.next).to.have.been.calledWith('value')
    expect(observer.complete).to.have.been.calledOnce
  })

  it('should error upon promise rejection', async () => {
    await new Promise(resolve => {
      error = new Error('error')

      observer = {
        error: sinon.spy(resolve)
      }

      fromPromise(Promise.reject(error)).subscribe(observer)
    })

    expect(observer.error).to.have.been.calledWith(error)
  })
})
