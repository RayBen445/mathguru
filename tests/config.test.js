const path = require('path');
const os = require('os');

process.env.HOME = path.join(os.tmpdir(), `mathguru-config-${Date.now()}`);

const { readConfig, setConfigValue, getConfigValue } = require('../src/config/configManager');

describe('config system tests', () => {
  test('default config loads', () => {
    const config = readConfig();
    expect(config).toHaveProperty('precision');
    expect(config).toHaveProperty('graphSize');
  });

  test('config saving and retrieval', () => {
    setConfigValue('precision', 3);
    setConfigValue('graphFormat', 'svg');
    expect(getConfigValue('precision')).toBe(3);
    expect(getConfigValue('graphFormat')).toBe('svg');
  });

  test('invalid config handling', () => {
    expect(() => setConfigValue('graphSize', 'bad')).toThrow();
    expect(() => setConfigValue('precision', 99)).toThrow();
  });
});
