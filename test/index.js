import { expect } from 'chai'
import addOperators from '../src/index'

describe('Library index', () => {
  it('should export a function', () => {
    expect(addOperators).to.be.a('function')
  })

  it('should exectute without crashing', () => {
    addOperators()
  })
})
