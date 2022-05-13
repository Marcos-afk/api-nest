import * as calc from './AuxFunctions';

describe('calculus function tests', () => {
  it('should receive the sum of two numbers', () => {
    const result = calc.sum(2, 2);
    expect(result).toEqual(4);
  });

  it('should receive the subtraction of two numbers', () => {
    const result = calc.sub(2, 2);
    expect(result).toEqual(0);
  });

  it('should receive the multiplication of two numbers', () => {
    const result = calc.mul(2, 2);
    expect(result).toEqual(4);
  });

  it('should receive the division of two numbers', () => {
    const result = calc.div(2, 2);
    expect(result).toEqual(1);
  });
});
