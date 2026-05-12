const fs = require('fs');
const path = require('path');
const { convert } = require('../latex/latexEngine');

function detectExpressions(content) {
  const lines = String(content).split('\n');
  const operators = ['=', '+', '-', '*', '/', '^'];
  return lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => {
      const trimmed = line.trim();
      if (trimmed.length < 3) {
        return false;
      }
      const hasOperator = operators.some((operator) => trimmed.includes(operator));
      const hasAlphaNumeric = Array.from(trimmed).some((char) => /[a-z0-9]/i.test(char));
      return hasOperator && hasAlphaNumeric;
    });
}

function toMathBlock(expression) {
  try {
    const tex = convert(expression);
    return `$$\n${tex}\n$$`;
  } catch {
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
