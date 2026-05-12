/**
 * add.js
 * Returns the sum of two numbers.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Adds two numbers.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of a and b.
 */
function add(a, b) {
  validateRequiredArgs('add', arguments.length, 2);
  validateNumber(a, 'a', 'add');
  validateNumber(b, 'b', 'add');
  return a + b;
}

module.exports = add;
