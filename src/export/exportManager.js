const fs = require('fs');
const path = require('path');

function ensureExportsDir() {
  const dir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
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

function exportData(type, payload, format) {
  const dir = ensureExportsDir();
  const extension = format.toLowerCase();
  const timestamp = new Date().toISOString().replace(/[.:]/g, '-');
  const filename = `${type}-${timestamp}.${extension}`;
  const filePath = path.join(dir, filename);

  let content;
  if (extension === 'json') {
    content = JSON.stringify(payload, null, 2);
  } else if (extension === 'txt') {
    if (Array.isArray(payload)) {
      content = payload
        .map((entry) => `[${entry.timestamp}] ${entry.command}(${entry.inputs.join(', ')}) => ${entry.result}`)
        .join('\n');
    } else {
      content = `[${payload.timestamp}] ${payload.command}(${payload.inputs.join(', ')}) => ${payload.result}`;
    }
  } else if (extension === 'csv') {
    content = toCsv(Array.isArray(payload) ? payload : [payload]);
  } else {
    throw new Error('export: format must be json, txt, or csv.');
  }

  fs.writeFileSync(filePath, content);
  return filePath;
}

module.exports = {
  exportData,
};
