/**
 * index.js — mathguru entry point
 *
 * This file imports all math utility functions from the src/ folder
 * and re-exports them as a single, easy-to-use object.
 *
 * Usage:
 *   const mathguru = require('mathguru');
 *   mathguru.add(2, 3);       // 5
 *   mathguru.subtract(9, 4);  // 5
 *   mathguru.multiply(3, 4);  // 12
 *   mathguru.divide(10, 2);   // 5
 *   mathguru.square(6);       // 36
 *
 * Or with destructuring:
 *   const { add, subtract, multiply, divide, square } = require('mathguru');
 */

const add = require('./src/add');
const subtract = require('./src/subtract');
const multiply = require('./src/multiply');
const divide = require('./src/divide');
const square = require('./src/square');

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  square,
};
