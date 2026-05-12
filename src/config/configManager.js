const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_CONFIG = {
  precision: 4,
  colors: true,
  exportFormat: 'json',
  currencySymbol: '$',
  scientificMode: false,
  shellStartup: false,
};

const CONFIG_DIR = path.join(os.homedir(), '.mathguru');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');

function ensureConfigFile() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
  }
}

function readConfig() {
  ensureConfigFile();
  try {
    const parsed = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function writeConfig(config) {
  ensureConfigFile();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function normalizeValue(key, value) {
  if (key === 'precision') {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 15) {
      throw new Error('config: precision must be an integer between 0 and 15.');
    }
    return parsed;
  }

  if (key === 'colors' || key === 'scientificMode' || key === 'shellStartup') {
    if (value === true || value === false) {
      return value;
    }
    const lowered = String(value).toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(lowered)) {
      return true;
    }
    if (['false', '0', 'no', 'off'].includes(lowered)) {
      return false;
    }
    throw new Error(`config: ${key} must be true or false.`);
  }

  if (key === 'exportFormat') {
    const lowered = String(value).toLowerCase();
    const normalized = lowered === 'markdown' ? 'md' : lowered;
    if (!['json', 'txt', 'csv', 'md'].includes(normalized)) {
      throw new Error('config: exportFormat must be one of json, txt, csv, md/markdown.');
    }
    return normalized;
  }

  if (key === 'currencySymbol') {
    const text = String(value);
    if (!text.trim()) {
      throw new Error('config: currencySymbol must not be empty.');
    }
    return text;
  }

  return value;
}

function setConfigValue(key, value) {
  const current = readConfig();
  if (!(key in DEFAULT_CONFIG)) {
    throw new Error(`config: unknown key '${key}'.`);
  }
  current[key] = normalizeValue(key, value);
  writeConfig(current);
  return current[key];
}

function getConfigValue(key) {
  const current = readConfig();
  if (!key) {
    return current;
  }
  if (!(key in DEFAULT_CONFIG)) {
    throw new Error(`config: unknown key '${key}'.`);
  }
  return current[key];
}

module.exports = {
  CONFIG_PATH,
  DEFAULT_CONFIG,
  readConfig,
  writeConfig,
  setConfigValue,
  getConfigValue,
};
