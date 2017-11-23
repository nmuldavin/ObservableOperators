import Observable from 'zen-observable'
import { expect } from 'chai'
import sinon from 'sinon'
import merge from '../src/merge'
import apiCheck from './common/apiCheck'

describe('(Operator) merge', () => {
  apiCheck(merge)

  it('returns a new Observable', () => {
    expect(merge(Observable.of(), Observable.of())).to.be.an.instanceOf(
      Observable
    )
  })

  it('emits all values from all input observables', () => {
    let outputValues = []

    merge(
      Observable.of(1, 2, 3),
      Observable.of(4, 5, 6),
      Observable.of(7, 8, 9)
    ).subscribe(value => {
      outputValues.push(value)
    })

    expect(outputValues).to.include.members([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('propagates errors from all inputs', () => {
    const errorObservable = new Observable(observer => observer.error('error'))
    const errorHandler1 = sinon.spy()
    const errorHandler2 = sinon.spy()

    merge(errorObservable, Observable.of()).subscribe({
      error: errorHandler1
    })

    expect(errorHandler1).to.have.been.calledWith('error')

    merge(Observable.of(), errorObservable).subscribe({
      error: errorHandler2
    })

    expect(errorHandler2).to.have.been.calledWith('error')
  })
})
