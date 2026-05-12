const converter = require('../src/convert/unitConverter');

describe('unit conversion tests', () => {
  test('distance conversion', () => {
    const result = converter.convert(5, 'km', 'miles');
    expect(result.output).toBeGreaterThan(3);
  });

  test('temperature conversion', () => {
    const result = converter.convert(0, 'celsius', 'fahrenheit');
    expect(result.output).toBe(32);
  });

  test('mass and time conversion', () => {
    expect(converter.convert(1, 'kg', 'pounds').output).toBeGreaterThan(2);
    expect(converter.convert(1, 'hours', 'minutes').output).toBe(60);
  });

  test('invalid units', () => {
    expect(() => converter.convert(5, 'abc', 'xyz')).toThrow();
  });
});
