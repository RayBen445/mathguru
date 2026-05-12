const fs = require('fs');
const path = require('path');
const { convert } = require('../latex/latexEngine');

function detectExpressions(content) {
  const lines = String(content).split('\n');
  return lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => /[a-zA-Z0-9]+\s*[=+\-*/^]\s*[a-zA-Z0-9(]/.test(line));
}

function toMathBlock(expression) {
  try {
    const tex = convert(expression);
    return `$$\n${tex}\n$$`;
  } catch (_error) {
    return `$$\n${expression}\n$$`;
  }
}

function formatMarkdownMath(content) {
  const lines = String(content).split('\n');
  const expressions = detectExpressions(content);
  expressions.forEach(({ index, line }) => {
    lines[index] = `${line}\n\n${toMathBlock(line)}`;
  });
  return lines.join('\n');
}

function processFile(filePath) {
  const absolute = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  if (!fs.existsSync(absolute)) {
    throw new Error(`md: file not found at ${absolute}`);
  }

  const content = fs.readFileSync(absolute, 'utf8');
  const formatted = formatMarkdownMath(content);
  fs.writeFileSync(absolute, formatted);

  return {
    filePath: absolute,
    expressions: detectExpressions(content).length,
  };
}

module.exports = {
  detectExpressions,
  formatMarkdownMath,
  processFile,
};
