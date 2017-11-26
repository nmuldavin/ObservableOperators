import { expect } from 'chai'
import addCreators from '../src/addCreators'

describe('(Helper) addCreators', () => {
  it('should assign creators at the _name property of the target object', () => {
    const target = {}

    const fakeCreator1 = () => null
    fakeCreator1._name = 'fake1'

    const fakeCreator2 = () => null
    fakeCreator2._name = 'fake2'

    addCreators(target, [fakeCreator1, fakeCreator2])

    expect(target)
      .to.have.property('fake1')
      .that.is.a('function')

    expect(target)
      .to.have.property('fake2')
      .that.is.a('function')
  })
})
