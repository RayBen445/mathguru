const { buildDocsText } = require('./docs');

function buildHelpText(version) {
  return buildDocsText(version);
}

module.exports = {
  buildHelpText,
};
