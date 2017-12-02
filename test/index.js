import { expect } from 'chai';
import library from '../src/index';

describe('Library index', () => {
  it('should export a function', () => {
    expect(library).to.be.a('function');
  });

  it('should exectute without crashing', () => {
    library();
  });
});
