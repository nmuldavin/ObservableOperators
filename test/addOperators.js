import { expect } from 'chai'
import addOperators from '../src/addOperators'

describe('(Helper) addOperators', () => {
  it('should assign operators at the _name property of the target object', () => {
    const target = {}

    const fakeOperator1 = () => null
    fakeOperator1._name = 'fake1'

    const fakeOperator2 = () => null
    fakeOperator2._name = 'fake2'

    addOperators(target, [fakeOperator1, fakeOperator2])

    expect(target)
      .to.have.property('fake1')
      .that.is.a('function')
    expect(target)
      .to.have.property('fake2')
      .that.is.a('function')
  })
})
