import { expect } from 'chai'
import toArray from '../src/toArray'
import apiCheck from './common/apiCheck'

describe('(Operator) toArray', () => {
  apiCheck(toArray)

  it('returns a promise', () => {
    expect(toArray(Observable.of())).to.be.an.instanceOf(Promise)
  })

  it('resolves to the appropriate array', () =>
    toArray(Observable.of(1, 2, 3)).then(array =>
      expect(array).to.eql([1, 2, 3])
    ))

  it('resolves with an empty array from en empty Observable', () =>
    toArray(Observable.of()).then(array => expect(array).to.eql([])))
})
