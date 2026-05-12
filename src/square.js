/**
 * square.js
 * Returns the square of a number (x raised to the power of 2).
 */

/**
 * Returns the square of a number.
 *
 * @param {number} x - The number to square.
 * @returns {number} The value of x * x.
 *
 * @example
 * const { square } = require('mathguru');
 * square(5); // 25
 * square(3); // 9
 */
function square(x) {
  return x * x;
}

module.exports = square;
