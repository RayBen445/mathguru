const fs = require('fs');
const path = require('path');
const os = require('os');
const markdown = require('../src/markdown/mathMarkdown');

describe('markdown utility tests', () => {
  test('equation detection', () => {
    const found = markdown.detectExpressions('x^2 + y^2 = z^2');
    expect(found.length).toBeGreaterThan(0);
  });

  test('latex block generation and formatting', () => {
    const formatted = markdown.formatMarkdownMath('Equation: x^2 + y^2 = z^2');
    expect(formatted).toContain('$$');
  });

  test('file processing', () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mathguru-md-'));
    const file = path.join(temp, 'notes.md');
    fs.writeFileSync(file, 'E=mc^2\n');
    const result = markdown.processFile(file);
    expect(result.expressions).toBeGreaterThan(0);
    fs.rmSync(temp, { recursive: true, force: true });
  });
});
