const formulas = require('../src/formulas/formulaEngine');

describe('formula engine tests', () => {
  test('formula loading and metadata structure', () => {
    const all = formulas.loadAllFormulas();
    expect(all.length).toBeGreaterThan(0);
    const sample = all[0];
    expect(sample).toHaveProperty('name');
    expect(sample).toHaveProperty('category');
    expect(sample).toHaveProperty('formula');
    expect(sample).toHaveProperty('description');
    expect(sample).toHaveProperty('variables');
    expect(sample).toHaveProperty('examples');
    expect(sample).toHaveProperty('applications');
  });

  test('category listing and search/fuzzy match', () => {
    expect(formulas.getCategories()).toContain('economics');
    expect(formulas.search('cobb').length).toBeGreaterThan(0);
    expect(formulas.search('derivative').length).toBeGreaterThan(0);
  });

  test('explanation system', () => {
    const text = formulas.explain('cobb-douglas');
    expect(text).toContain('Variables:');
    expect(text).toContain('Applications:');
  });
});
