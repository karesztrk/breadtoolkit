import { calcHydratation } from '../service/calculator';
import { expect } from 'chai';

describe('hydration', () => {
  it('does not exceed 100', () => {
    expect(calcHydratation(2, 100)).to.equal('100+');
  });
  it('accept zero flour', () => {
    expect(calcHydratation(0, 100)).to.equal('100');
  });
  it('gives correct value', () => {
    expect(calcHydratation(100, 50)).to.equal('50.0');
  });
  it('has correct precision', () => {
    expect(calcHydratation(100, 33.33333)).to.equal('33.3');
  });
});
