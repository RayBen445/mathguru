const mathguru = require('../index');

describe('SDK modular exports', () => {
  test('exposes modular namespaces', () => {
    expect(typeof mathguru.basic.add).toBe('function');
    expect(typeof mathguru.scientific.sqrt).toBe('function');
    expect(typeof mathguru.finance.compoundInterest).toBe('function');
    expect(typeof mathguru.calc.integrate).toBe('function');
    expect(typeof mathguru.graph.plot).toBe('function');
    expect(typeof mathguru.latex.convert).toBe('function');
    expect(typeof mathguru.formulas.get).toBe('function');
    expect(typeof mathguru.trainer.generate).toBe('function');
    expect(typeof mathguru.convert.run).toBe('function');
    expect(typeof mathguru.markdown.processFile).toBe('function');
  });

  test('maintains top-level legacy exports', () => {
    expect(mathguru.add(2, 3)).toBe(5);
    expect(mathguru.sqrt(25)).toBe(5);
  });
});
