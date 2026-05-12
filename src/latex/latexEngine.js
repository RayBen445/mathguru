const { create, all } = require('mathjs');

const math = create(all, {});

function normalizeInput(expression) {
  const raw = String(expression || '').trim();
  if (!raw) {
    throw new Error('latex: expression is required.');
  }

  const integralMatch = raw.match(/^integral\s+(.+)$/i);
  if (integralMatch) {
    return `integrate(${integralMatch[1]}, x)`;
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
