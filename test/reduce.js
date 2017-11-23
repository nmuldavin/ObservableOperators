import { expect } from 'chai'
import reduce from '../src/reduce'
import apiCheck from './common/apiCheck'
import sinon from 'sinon'

const sampleAccumulator = (acc, val) => acc + val

describe('(Operator) reduce', () => {
  apiCheck(reduce)

  it('returns a promise', () => {
    expect(reduce(Observable.of())).to.be.an.instanceOf(Promise)
  })

  it('should resolve with the appropriate accumulated value', () =>
    reduce(Observable.of(1, 2, 3), sampleAccumulator, 0).then(result =>
      expect(result).to.eql(6)
    ))

  it('should pass in the provided initial value', () =>
    reduce(Observable.of(1, 2, 3), sampleAccumulator, 5).then(result =>
      expect(result).to.eql(11)
    ))

  it('should reject on an error in the input observable', () => {
    const errorHandler = sinon.spy()

    return reduce(
      new Observable(observer => observer.error('error')),
      sampleAccumulator,
      5
    )
      .catch(errorHandler)
      .then(() => expect(errorHandler).to.have.been.calledWith('error'))
  })

  it('should reject on an error in the accumulation operation', () => {
    const errorHandler = sinon.spy()
    const error = new Error('things went bad')

    return reduce(
      Observable.of(1, 2, 3),
      (acc, val) => {
        throw error
      },
      5
    )
      .catch(errorHandler)
      .then(() => expect(errorHandler).to.have.been.calledWith(error))
  })
})
