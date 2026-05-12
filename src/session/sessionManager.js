const fs = require('fs');
const path = require('path');
const { readHistory, writeHistory } = require('../history/historyManager');
const { POWERED_BY_KONTYRA } = require('../cli/branding');

const SESSIONS_DIR = path.join(process.cwd(), 'sessions');

function ensureSessionsDir() {
  if (!fs.existsSync(SESSIONS_DIR)) {
    fs.mkdirSync(SESSIONS_DIR, { recursive: true });
  }
  return SESSIONS_DIR;
}

function sanitizeName(name) {
  return String(name || 'session')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase();
}

function createSessionPayload(entries, name) {
  return {
    name: sanitizeName(name),
    poweredBy: POWERED_BY_KONTYRA,
    createdAt: new Date().toISOString(),
    entries: Array.isArray(entries) ? entries : [],
  };
}

function resolveSessionPath(input) {
  ensureSessionsDir();

  if (!input) {
    return path.join(SESSIONS_DIR, 'latest-session.json');
  }

  if (path.isAbsolute(input)) {
    return input;
  }

  const normalized = input.endsWith('.json') ? input : `${input}.json`;
  return path.join(SESSIONS_DIR, normalized);
}

function saveSession(name) {
  const entries = readHistory();
  const payload = createSessionPayload(entries, name || `session-${Date.now()}`);
  const filename = `${payload.name}.json`;
  const filePath = path.join(ensureSessionsDir(), filename);
  const latestPath = path.join(SESSIONS_DIR, 'latest-session.json');

  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
  fs.writeFileSync(latestPath, JSON.stringify(payload, null, 2));

  return {
    filePath,
    count: payload.entries.length,
  };
}

function readSession(nameOrPath) {
  const targetPath = resolveSessionPath(nameOrPath);
  if (!fs.existsSync(targetPath)) {
    throw new Error(`session: file not found at ${targetPath}`);
  }

  const payload = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  if (!payload || !Array.isArray(payload.entries)) {
    throw new Error('session: invalid session file format.');
  }

  return {
    filePath: targetPath,
    payload,
  };
}

function loadSession(nameOrPath) {
  const { filePath, payload } = readSession(nameOrPath);
  writeHistory(payload.entries);

  return {
    filePath,
    count: payload.entries.length,
  };
}

function toText(payload) {
  const header = [`Session: ${payload.name}`, `Created: ${payload.createdAt}`, payload.poweredBy, ''];
  const body = payload.entries.map(
    (entry) => `[${entry.timestamp}] ${entry.command}(${(entry.inputs || []).join(', ')}) => ${entry.result}`
  );
  return [...header, ...body].join('\n');
}

function toMarkdown(payload) {
  const lines = [
    `# Session: ${payload.name}`,
    '',
    `- Created: ${payload.createdAt}`,
    `- ${payload.poweredBy}`,
    '',
    '| Timestamp | Command | Inputs | Result |',
    '|---|---|---|---|',
  ];

  payload.entries.forEach((entry) => {
    lines.push(
      `| ${entry.timestamp} | ${entry.command} | ${JSON.stringify(entry.inputs || [])} | ${entry.result} |`
    );
  });

  return lines.join('\n');
}

function exportSession(format, nameOrPath) {
  const extensionRaw = String(format || 'json').toLowerCase();
  const extension = extensionRaw === 'markdown' ? 'md' : extensionRaw;
  if (!['json', 'txt', 'md'].includes(extension)) {
    throw new Error('export-session: format must be json, txt, or markdown/md.');
  }

  const { payload } = readSession(nameOrPath);
  const baseName = `${payload.name}-${new Date().toISOString().replace(/[.:]/g, '-')}`;
  const targetPath = path.join(ensureSessionsDir(), `${baseName}.${extension}`);

  let content;
  if (extension === 'json') {
    content = JSON.stringify(payload, null, 2);
  } else if (extension === 'txt') {
    content = toText(payload);
  } else {
    content = toMarkdown(payload);
  }

  fs.writeFileSync(targetPath, content);
  return targetPath;
}

module.exports = {
  SESSIONS_DIR,
  ensureSessionsDir,
  saveSession,
  readSession,
  loadSession,
  exportSession,
};
