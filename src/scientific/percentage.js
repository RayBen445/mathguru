/**
 * percentage.js
 * Calculates what percent a value is of a total.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Calculates percentage using (value / total) * 100.
 *
 * @param {number} value - Partial value.
 * @param {number} total - Whole value.
 * @returns {number} Percentage value.
 */
function percentage(value, total) {
  validateRequiredArgs('percentage', arguments.length, 2);
  validateNumber(value, 'value', 'percentage');
  validateNumber(total, 'total', 'percentage');

  if (total === 0) {
    throw new Error('percentage: total must not be 0.');
  }

  return (value / total) * 100;
}

module.exports = percentage;
