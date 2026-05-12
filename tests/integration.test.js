const fs = require('fs');
const path = require('path');
const os = require('os');

const mathguru = require('../index');
const { runDoctor } = require('../src/core/doctor');

describe('platform integration tests', () => {
  test('modules interoperate through sdk', () => {
    const calc = mathguru.calc.run('diff(x^2)');
    const latex = mathguru.latex.convert('x^2');
    const graph = mathguru.graph.plot('x^2', { size: '30x15' });
    const formula = mathguru.formulas.explain('cobb-douglas');

    expect(String(calc)).toContain('2*x');
    expect(latex.length).toBeGreaterThan(0);
    expect(graph).toContain('x:[');
    expect(formula).toContain('Applications:');
  });

  test('config affects graph defaults and markdown utilities run', () => {
    mathguru.setConfigValue('graphFormat', 'ascii');
    mathguru.setConfigValue('graphSize', '50x20');

    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mathguru-int-'));
    const file = path.join(temp, 'n.md');
    fs.writeFileSync(file, 'x^2 + y^2 = z^2\n');

    const result = mathguru.markdown.processFile(file);
    expect(result.expressions).toBeGreaterThan(0);
    fs.rmSync(temp, { recursive: true, force: true });
  });

  test('doctor reports checks', () => {
    const report = runDoctor();
    expect(report.checks.length).toBeGreaterThan(0);
  });
});
