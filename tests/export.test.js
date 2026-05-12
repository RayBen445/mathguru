const fs = require('fs');
const path = require('path');
const os = require('os');

const { exportData } = require('../src/export/exportManager');
const { addHistoryEntry, clearHistory, readHistory } = require('../src/history/historyManager');
const { saveSession, loadSession, exportSession } = require('../src/session/sessionManager');

describe('export and session tests', () => {
  const originalCwd = process.cwd();
  const workDir = path.join(os.tmpdir(), `mathguru-export-test-${Date.now()}`);

  beforeAll(() => {
    fs.mkdirSync(workDir, { recursive: true });
    process.chdir(workDir);
  });

  afterAll(() => {
    process.chdir(originalCwd);
    fs.rmSync(workDir, { recursive: true, force: true });
  });

  test('history export json/csv/txt/markdown', () => {
    const payload = { command: 'add', inputs: ['2', '3'], result: 5, timestamp: new Date().toISOString() };
    expect(fs.existsSync(exportData('result', payload, 'json'))).toBe(true);
    expect(fs.existsSync(exportData('result', payload, 'csv'))).toBe(true);
    expect(fs.existsSync(exportData('result', payload, 'txt'))).toBe(true);
    expect(fs.existsSync(exportData('result', payload, 'markdown'))).toBe(true);
  });

  test('session save/load/export json/md/csv', () => {
    clearHistory();
    addHistoryEntry('add', ['1', '2'], 3);
    const saved = saveSession('demo');
    expect(fs.existsSync(saved.filePath)).toBe(true);
    const loaded = loadSession('demo');
    expect(loaded.count).toBeGreaterThan(0);
    expect(fs.existsSync(exportSession('json', 'demo'))).toBe(true);
    expect(fs.existsSync(exportSession('markdown', 'demo'))).toBe(true);
    expect(fs.existsSync(exportSession('csv', 'demo'))).toBe(true);
    expect(readHistory().length).toBeGreaterThan(0);
  });
});
