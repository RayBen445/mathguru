const fs = require('fs');
const path = require('path');
const os = require('os');

const calc = require('../src/calc/calcEngine');
const graph = require('../src/graph/graphEngine');
const latex = require('../src/latex/latexEngine');
const formulas = require('../src/formulas/formulaEngine');

describe('calc/graph/latex/formula engines', () => {
  test('calc engine supports diff/integrate/solve/evaluate', () => {
    expect(String(calc.run('diff(x^2)'))).toContain('2*x');
    expect(String(calc.run('integrate(sin(x))')).toLowerCase()).toContain('cos');
    expect(String(calc.run('solve(x^2-4=0)'))).toContain('2');
    expect(Number(calc.run('sqrt(144)'))).toBe(12);
  });

  test('graph engine renders ascii', () => {
    const output = graph.plotAscii('sin(x)', { size: '40x20' });
    expect(output).toContain('x:[');
  });

  test('graph engine exports svg and png', () => {
    const cwd = process.cwd();
    const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mathguru-graph-'));
    process.chdir(workDir);

    const svgPath = graph.exportGraph('x^2', { format: 'svg', size: '320x200' });
    const pngPath = graph.exportGraph('x^2', { format: 'png', size: '200x120' });

    expect(fs.existsSync(svgPath)).toBe(true);
    expect(fs.existsSync(pngPath)).toBe(true);

    process.chdir(cwd);
    fs.rmSync(workDir, { recursive: true, force: true });
  });

  test('latex conversion works', () => {
    expect(latex.convert('sin(x)^2 + cos(x)^2')).toContain('sin');
  });

  test('formula engine supports list/search/explain', () => {
    const all = formulas.list();
    expect(all.length).toBeGreaterThan(0);
    const results = formulas.search('cobb-douglas');
    expect(results.length).toBeGreaterThan(0);
    const explanation = formulas.explain('cobb-douglas');
    expect(explanation).toContain('Variables:');
  });
});
