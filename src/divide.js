/**
 * divide.js
 * Divides the first number by the second.
 * Throws an error if dividing by zero.
 */

/**
 * Returns the quotient of two numbers.
 *
 * @param {number} a - The dividend (number to be divided).
 * @param {number} b - The divisor (number to divide by). Must not be zero.
 * @returns {number} The result of a divided by b.
 * @throws {Error} Throws an error if b is zero.
 *
 * @example
 * const { divide } = require('mathguru');
 * divide(10, 2); // 5
 * divide(5, 0);  // throws Error: Division by zero is not allowed.
 */
function divide(a, b) {
  // Guard against division by zero, which is mathematically undefined
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

module.exports = divide;
