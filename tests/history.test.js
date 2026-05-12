const path = require('path');
const os = require('os');

process.env.HOME = path.join(os.tmpdir(), `mathguru-history-${Date.now()}`);

const {
  addHistoryEntry,
  readHistory,
  clearHistory,
  getLatestHistoryEntry,
} = require('../src/history/historyManager');

describe('history tests', () => {
  test('history add/read/latest/clear', () => {
    clearHistory();
    addHistoryEntry('add', ['2', '3'], 5);
    addHistoryEntry('calc', ['diff(x^2)'], '2*x');
    const entries = readHistory();
    expect(entries.length).toBe(2);
    expect(getLatestHistoryEntry().command).toBe('calc');
    clearHistory();
    expect(readHistory()).toEqual([]);
  });
});
