const { create, all } = require('mathjs');

const math = create(all, {});

function normalizeInput(expression) {
  const raw = String(expression || '').trim();
  if (!raw) {
    throw new Error('latex: expression is required.');
  }

  const lowered = raw.toLowerCase();
  if (lowered.startsWith('integral ')) {
    const integralExpression = raw.slice(9).trim();
    if (!integralExpression) {
      throw new Error('latex: integral expression is required after \"integral\".');
    }
    return `integrate(${integralExpression}, x)`;
  }

  return raw;
}

function convert(expression) {
  const normalized = normalizeInput(expression);
  try {
    return math.parse(normalized).toTex({ parenthesis: 'auto' });
  } catch (error) {
    throw new Error(`latex conversion failed: ${error.message}`);
  }
}

module.exports = {
  convert,
};
