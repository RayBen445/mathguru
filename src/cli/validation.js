/**
 * validation.js
 * Reusable validation utilities for CLI input and arguments.
 */

/**
 * Parses and validates a single number.
 *
 * @param {string|number} input - User-provided input.
 * @param {string} label - Parameter label for readable errors.
 * @param {string} command - Command name for readable errors.
 * @returns {number} Parsed numeric value.
 */
function parseNumber(input, label, command) {
  if (input === undefined || input === null || String(input).trim() === '') {
    throw new Error(`${command}: '${label}' is required.`);
  }

  const value = Number(input);
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    throw new Error(`${command}: '${label}' must be a valid number.`);
  }

  return value;
}

/**
 * Parses and validates a list of numeric values.
 *
 * @param {Array<string|number>} values - User-provided values.
 * @param {string} command - Command name.
 * @returns {Array<number>} Parsed numeric values.
 */
function parseNumberList(values, command) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error(`${command}: provide at least one numeric value.`);
  }

  return values.map((value, index) => parseNumber(value, `argument ${index + 1}`, command));
}

module.exports = {
  parseNumber,
  parseNumberList,
};
