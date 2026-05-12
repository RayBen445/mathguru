const mathguru = require('../index');

describe('math functions', () => {
  test('basic operations', () => {
    expect(mathguru.add(2, 3)).toBe(5);
    expect(mathguru.subtract(10, 4)).toBe(6);
    expect(mathguru.multiply(5, 6)).toBe(30);
    expect(mathguru.divide(20, 4)).toBe(5);
  });

  test('scientific operations', () => {
    expect(mathguru.sqrt(25)).toBe(5);
    expect(mathguru.power(2, 8)).toBe(256);
    expect(mathguru.factorial(5)).toBe(120);
  });

  test('economics and finance operations', () => {
    expect(mathguru.inflationRate(500, 700)).toBe(40);
    expect(mathguru.gdpGrowth(10000, 12000)).toBe(20);
    expect(mathguru.simpleInterest(1000, 5, 2)).toBe(100);
  });
});
