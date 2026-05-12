const mathguru = require('../index');

describe('calc and core math tests', () => {
  test('basic arithmetic', () => {
    expect(mathguru.add(2, 3)).toBe(5);
    expect(mathguru.subtract(10, 4)).toBe(6);
    expect(mathguru.multiply(5, 6)).toBe(30);
    expect(mathguru.divide(20, 4)).toBe(5);
  });

  test('divide by zero handling', () => {
    expect(() => mathguru.divide(5, 0)).toThrow();
  });

  test('scientific ops', () => {
    expect(mathguru.sqrt(25)).toBe(5);
    expect(mathguru.factorial(5)).toBe(120);
  });

  test('symbolic differentiation/integration/solve', () => {
    expect(String(mathguru.calc.differentiate('x^2'))).toContain('2*x');
    expect(String(mathguru.calc.integrate('sin(x)')).toLowerCase()).toContain('cos');
    expect(String(mathguru.calc.solve('x^2-4=0'))).toContain('2');
  });

  test('invalid calc input handling', () => {
    expect(() => mathguru.calc.run('')).toThrow();
  });
});
