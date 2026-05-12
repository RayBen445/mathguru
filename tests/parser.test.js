const { evaluateExpression } = require('../src/parser/expressionParser');

describe('expression parser', () => {
  test('evaluates arithmetic with parentheses', () => {
    expect(evaluateExpression('5 * (10 + 2)')).toBe(60);
  });

  test('supports sqrt', () => {
    expect(evaluateExpression('sqrt(25) + 5')).toBe(10);
  });

  test('supports powers and percentages', () => {
    expect(evaluateExpression('2^3')).toBe(8);
    expect(evaluateExpression('50% * 200')).toBe(100);
  });

  test('rejects invalid expressions', () => {
    expect(() => evaluateExpression('sqrt(-1)')).toThrow();
  });
});
