const mathguru = require('../index');

describe('sdk tests', () => {
  test('exports exist', () => {
    expect(typeof mathguru.calc.integrate).toBe('function');
    expect(typeof mathguru.graph.plot).toBe('function');
    expect(typeof mathguru.latex.convert).toBe('function');
    expect(typeof mathguru.formulas.get).toBe('function');
    expect(typeof mathguru.finance.compoundInterest).toBe('function');
  });

  test('apis execute', () => {
    expect(String(mathguru.calc.integrate('sin(x)')).toLowerCase()).toContain('cos');
    expect(mathguru.graph.plot('x^2', { size: '30x15' })).toContain('x:[');
    expect(mathguru.latex.convert('x^2')).toContain('x');
  });
});
