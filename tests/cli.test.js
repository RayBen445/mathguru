const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const cliPath = path.join(__dirname, '..', 'bin', 'mathguru.js');
const tempRoot = path.join(os.tmpdir(), `mathguru-cli-${Date.now()}`);
const homeDir = path.join(tempRoot, 'home');

const env = {
  ...process.env,
  NO_UPDATE_NOTIFIER: '1',
  HOME: homeDir,
};

function runCli(args, cwd) {
  return spawnSync('node', [cliPath, ...args], { encoding: 'utf8', env, cwd });
}

describe('CLI commands', () => {
  beforeAll(() => {
    fs.mkdirSync(homeDir, { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  test('add command works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-add-'));
    const result = runCli(['add', '2', '3'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Result:');
  });

  test('alias command works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-alias-'));
    const result = runCli(['div', '10', '2'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('5');
  });

  test('precision flag works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-precision-'));
    const result = runCli(['divide', '10', '3', '--precision', '2'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('3.33');
  });

  test('eval command works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-eval-'));
    const result = runCli(['eval', 'sqrt(25) + 5'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('10');
  });

  test('help includes Kontyra branding', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-help-'));
    const result = runCli(['help'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Powered by Kontyra');
  });

  test('unknown command suggests closest', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-suggest-'));
    const result = runCli(['squrt'], workDir);
    expect(result.status).toBe(1);
    expect(result.stderr + result.stdout).toContain('Did you mean');
    expect(result.stderr + result.stdout).toContain('sqrt');
  });

  test('session commands save, load and export markdown', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-session-'));

    const calc = runCli(['add', '9', '1'], workDir);
    expect(calc.status).toBe(0);

    const save = runCli(['save-session', 'demo'], workDir);
    expect(save.status).toBe(0);
    expect(save.stdout).toContain('Saved session');

    const load = runCli(['load-session', 'demo'], workDir);
    expect(load.status).toBe(0);
    expect(load.stdout).toContain('Loaded');

    const exportSession = runCli(['export-session', 'markdown', 'demo'], workDir);
    expect(exportSession.status).toBe(0);
    expect(exportSession.stdout).toContain('Exported session');

    const sessionsDir = path.join(workDir, 'sessions');
    expect(fs.existsSync(sessionsDir)).toBe(true);
    const files = fs.readdirSync(sessionsDir);
    expect(files.some((file) => file.endsWith('.md'))).toBe(true);
  });
});
