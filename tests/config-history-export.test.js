const fs = require('fs');
const path = require('path');
const os = require('os');

const homeDir = path.join(os.tmpdir(), `mathguru-test-${Date.now()}`);
process.env.HOME = homeDir;

const { readConfig, setConfigValue, getConfigValue } = require('../src/config/configManager');
const { addHistoryEntry, readHistory, clearHistory, getLatestHistoryEntry } = require('../src/history/historyManager');
const { exportData } = require('../src/export/exportManager');

const originalCwd = process.cwd();
const workDir = path.join(os.tmpdir(), `mathguru-export-${Date.now()}`);

describe('config/history/export', () => {
  beforeAll(() => {
    fs.mkdirSync(homeDir, { recursive: true });
    fs.mkdirSync(workDir, { recursive: true });
  });

  beforeEach(() => {
    process.chdir(workDir);
  });

  afterEach(() => {
    const exportsPath = path.join(workDir, 'exports');
    fs.rmSync(exportsPath, { recursive: true, force: true });
  });

  afterAll(() => {
    process.chdir(originalCwd);
    fs.rmSync(homeDir, { recursive: true, force: true });
    fs.rmSync(workDir, { recursive: true, force: true });
  });

  test('reads and updates config', () => {
    const config = readConfig();
    expect(config.precision).toBeDefined();
    setConfigValue('precision', 2);
    expect(getConfigValue('precision')).toBe(2);
  });

  test('writes and clears history', () => {
    clearHistory();
    addHistoryEntry('add', ['2', '3'], 5);
    const entries = readHistory();
    expect(entries.length).toBeGreaterThan(0);
    expect(getLatestHistoryEntry().result).toBe(5);
    clearHistory();
    expect(readHistory()).toEqual([]);
  });

  test('exports json/txt/csv', () => {
    const payload = { command: 'add', inputs: ['2', '3'], result: 5, timestamp: new Date().toISOString() };
    const jsonFile = exportData('result', payload, 'json');
    const txtFile = exportData('result', payload, 'txt');
    const csvFile = exportData('result', payload, 'csv');

    expect(fs.existsSync(jsonFile)).toBe(true);
    expect(fs.existsSync(txtFile)).toBe(true);
    expect(fs.existsSync(csvFile)).toBe(true);
  });
});
