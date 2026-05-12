const figlet = require('figlet');
const colors = require('./colors');

const POWERED_BY_KONTYRA = 'Powered by Kontyra';

function buildStartupBanner() {
  const title = figlet.textSync('MathGuru CLI', { horizontalLayout: 'default' });
  const line = '='.repeat(48);
  return [
    colors.banner(line),
    colors.banner(title),
    colors.brand(POWERED_BY_KONTYRA),
    colors.banner(line),
  ].join('\n');
}

module.exports = {
  POWERED_BY_KONTYRA,
  buildStartupBanner,
};
