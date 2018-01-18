import { expect } from 'chai';

/**
 * Runs tests on an operator or creator asserting that it follows the general API
 * guidelines for this project
 */
const apiCheck = operator => {
  it('should be a function', () => {
    expect(operator).to.be.a('function');
  });

  it('should have a _name property that is a string', () => {
    expect(operator._name).to.be.a('string');
  });
};

export default apiCheck;
