const latex = require('../src/latex/latexEngine');

describe('latex engine tests', () => {
  test('expression conversion', () => {
    const result = latex.convert('sin(x)^2 + cos(x)^2');
    expect(result).toContain('sin');
  });

  test('calculus latex conversion', () => {
    const result = latex.convert('integral x^2');
    expect(result.length).toBeGreaterThan(0);
  });

  test('invalid expression handling', () => {
    expect(() => latex.convert('')).toThrow();
  });
});
