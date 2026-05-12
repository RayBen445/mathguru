const sdk = require('./src/sdk');

const { readConfig, setConfigValue, getConfigValue } = require('./src/config/configManager');
const { readHistory, clearHistory } = require('./src/history/historyManager');
const { registerPlugin, listPlugins } = require('./src/plugins/loader');

module.exports = {
  ...sdk.basic,
  ...sdk.scientific,
  ...sdk.economics,
  ...sdk.finance,
  evaluateExpression: sdk.parser.evaluateExpression,
  basic: sdk.basic,
  scientific: sdk.scientific,
  economics: sdk.economics,
  finance: sdk.finance,
  calc: sdk.calc,
  graph: sdk.graph,
  latex: sdk.latex,
  formulas: sdk.formulas,
  readConfig,
  setConfigValue,
  getConfigValue,
  readHistory,
  clearHistory,
  registerPlugin,
  listPlugins,
};
