import Observable from 'zen-observable'
import { expect } from 'chai'
import filter from '../src/filter'
import apiCheck from './common/apiCheck'

describe('(Operator) filter', () => {
  apiCheck(filter)

  it('returns a new Observable', () => {
    expect(filter(Observable.of())).to.be.an.instanceOf(Observable)
  })

  it('emits only the input values for which the filtering operation returns truthy', () => {
    let outputValues = []

    filter(Observable.of(1, 2, 3, 4), x => x % 2 === 0).subscribe(value => {
      outputValues.push(value)
    })

    expect(outputValues).to.eql([2, 4])
  })
})
