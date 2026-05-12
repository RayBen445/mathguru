const chalk = require('chalk');

let colorsEnabled = true;

function setColorsEnabled(enabled) {
  colorsEnabled = Boolean(enabled);
}

function apply(colorFn, text) {
  return colorsEnabled ? colorFn(text) : text;
}

module.exports = {
  setColorsEnabled,
  banner: (text) => apply(chalk.cyanBright, text),
  title: (text) => apply(chalk.bold.blue, text),
  success: (text) => apply(chalk.green, text),
  error: (text) => apply(chalk.red, text),
  warning: (text) => apply(chalk.yellow, text),
  info: (text) => apply(chalk.gray, text),
  value: (text) => apply(chalk.bold.white, text),
  section: (text) => apply(chalk.bold.magenta, text),
};
