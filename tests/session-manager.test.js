const fs = require('fs');
const path = require('path');
const os = require('os');

const tempRoot = path.join(os.tmpdir(), `mathguru-session-${Date.now()}`);
const homeDir = path.join(tempRoot, 'home');
const workDir = path.join(tempRoot, 'work');
const originalCwd = process.cwd();

process.env.HOME = homeDir;

const { addHistoryEntry, clearHistory } = require('../src/history/historyManager');
const { saveSession, loadSession, exportSession } = require('../src/session/sessionManager');

describe('session manager', () => {
  beforeAll(() => {
    fs.mkdirSync(homeDir, { recursive: true });
    fs.mkdirSync(workDir, { recursive: true });
    process.chdir(workDir);
  });

  afterAll(() => {
    process.chdir(originalCwd);
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  test('saves, loads, and exports session files', () => {
    clearHistory();
    addHistoryEntry('add', ['1', '2'], 3);

    const saved = saveSession('demo');
    expect(fs.existsSync(saved.filePath)).toBe(true);

    const loaded = loadSession('demo');
    expect(loaded.count).toBeGreaterThan(0);

    const exportedTxt = exportSession('txt', 'demo');
    const exportedMd = exportSession('markdown', 'demo');

    expect(fs.existsSync(exportedTxt)).toBe(true);
    expect(fs.existsSync(exportedMd)).toBe(true);
    expect(exportedMd.endsWith('.md')).toBe(true);
  });
});
