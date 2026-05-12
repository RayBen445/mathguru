const fs = require('fs');
const path = require('path');
const os = require('os');

const DATA_DIR = path.join(os.homedir(), '.mathguru');
const HISTORY_PATH = path.join(DATA_DIR, 'history.json');

function ensureHistoryFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(HISTORY_PATH)) {
    fs.writeFileSync(HISTORY_PATH, JSON.stringify([], null, 2));
  }
}

function readHistory() {
  ensureHistoryFile();
  try {
    const parsed = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(entries) {
  ensureHistoryFile();
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(entries, null, 2));
}

function addHistoryEntry(command, inputs, result) {
  const entries = readHistory();
  const entry = {
    command,
    inputs,
    result,
    timestamp: new Date().toISOString(),
  };
  entries.push(entry);
  writeHistory(entries);
  return entry;
}

function clearHistory() {
  writeHistory([]);
}

function getLatestHistoryEntry() {
  const entries = readHistory();
  return entries.length > 0 ? entries[entries.length - 1] : null;
}

module.exports = {
  HISTORY_PATH,
  readHistory,
  writeHistory,
  addHistoryEntry,
  clearHistory,
  getLatestHistoryEntry,
};
