/**
 * colors.js
 * Centralized color helpers for consistent CLI styling.
 */

const chalk = require('chalk');

module.exports = {
  banner: (text) => chalk.cyanBright(text),
  title: (text) => chalk.bold.blue(text),
  success: (text) => chalk.green(text),
  error: (text) => chalk.red(text),
  warning: (text) => chalk.yellow(text),
  info: (text) => chalk.gray(text),
  value: (text) => chalk.bold.white(text),
};
