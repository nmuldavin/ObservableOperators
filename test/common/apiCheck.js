import { expect } from 'chai'

/**
 * Runs tests on an operator asserting that it follows the general API
 * guidelines for this project
 */
const apiCheck = operator => {
  it('should be a function', () => {
    expect(operator).to.be.a('function')
  })

  it('should have a _name property equal to the unminified operator name', () => {
    expect(operator._name).to.exist
    expect(operator._name).to.equal(operator.name)
  })
}

export default apiCheck
