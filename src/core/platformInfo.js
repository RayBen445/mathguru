const packageJson = require('../../package.json');

module.exports = {
  name: packageJson.name,
  version: packageJson.version,
  poweredBy: packageJson.kontyra?.poweredBy || 'Powered by Kontyra',
};
