const fs = require('fs');
const path = require('path');

function ensureExportsDir() {
  const dir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function normalizeFormat(format) {
  const lowered = String(format || 'json').toLowerCase();
  return lowered === 'markdown' ? 'md' : lowered;
}

function toCsv(entries) {
  const header = ['command', 'inputs', 'result', 'timestamp'];
  const rows = entries.map((entry) => {
    const values = [
      entry.command,
      JSON.stringify(entry.inputs),
      String(entry.result),
      entry.timestamp,
    ];
    return values.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
  });
  return [header.join(','), ...rows].join('\n');
}

function toText(payload) {
  const entries = Array.isArray(payload) ? payload : [payload];
  return entries
    .map((entry) => `[${entry.timestamp}] ${entry.command}(${(entry.inputs || []).join(', ')}) => ${entry.result}`)
    .join('\n');
}

function toMarkdown(payload) {
  const entries = Array.isArray(payload) ? payload : [payload];
  const lines = [
    '# MathGuru Export',
    '',
    '| Timestamp | Command | Inputs | Result |',
    '|---|---|---|---|',
  ];

  entries.forEach((entry) => {
    lines.push(`| ${entry.timestamp} | ${entry.command} | ${JSON.stringify(entry.inputs || [])} | ${entry.result} |`);
  });

  return lines.join('\n');
}

function exportData(type, payload, format) {
  const dir = ensureExportsDir();
  const extension = normalizeFormat(format);
  const timestamp = new Date().toISOString().replace(/[.:]/g, '-');
  const filename = `${type}-${timestamp}.${extension}`;
  const filePath = path.join(dir, filename);

  let content;
  if (extension === 'json') {
    content = JSON.stringify(payload, null, 2);
  } else if (extension === 'txt') {
    content = toText(payload);
  } else if (extension === 'csv') {
    content = toCsv(Array.isArray(payload) ? payload : [payload]);
  } else if (extension === 'md') {
    content = toMarkdown(payload);
  } else {
    throw new Error('export: format must be json, txt, csv, or markdown/md.');
  }

  fs.writeFileSync(filePath, content);
  return filePath;
}

module.exports = {
  exportData,
  normalizeFormat,
};
