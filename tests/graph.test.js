const fs = require('fs');
const path = require('path');
const os = require('os');
const graph = require('../src/graph/graphEngine');

describe('graph engine tests', () => {
  test('ASCII graph generation', () => {
    const ascii = graph.plotAscii('sin(x)', { size: '40x20' });
    expect(ascii).toContain('x:[');
  });

  test('SVG and PNG exports', () => {
    const cwd = process.cwd();
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mathguru-graph-'));
    process.chdir(temp);

    const svg = graph.exportGraph('x^2', { format: 'svg', size: '320x240' });
    const png = graph.exportGraph('x^2', { format: 'png', size: '320x240' });

    expect(fs.existsSync(svg)).toBe(true);
    expect(fs.existsSync(png)).toBe(true);

    process.chdir(cwd);
    fs.rmSync(temp, { recursive: true, force: true });
  });

  test('invalid format handling', () => {
    expect(() => graph.exportGraph('x^2', { format: 'pdf' })).toThrow();
  });
});
