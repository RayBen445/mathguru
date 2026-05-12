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

  test('basic command works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-basic-'));
    const result = runCli(['add', '2', '3'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Result:');
  });

  test('help includes Kontyra branding', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-help-'));
    const result = runCli(['help'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Powered by Kontyra');
  });

  test('calc command works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-calc-'));
    const result = runCli(['calc', 'diff(x^2)'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('2*x');
  });

  test('graph command works in ascii mode', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-graph-'));
    const result = runCli(['graph', 'sin(x)', '--format', 'ascii', '--size', '40x20'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('x:[');
  });

  test('latex command works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-latex-'));
    const result = runCli(['latex', 'sin(x)^2 + cos(x)^2'], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('sin');
  });

  test('formula search and explain works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-formula-'));
    const search = runCli(['search', 'cobb-douglas'], workDir);
    expect(search.status).toBe(0);
    expect(search.stdout.toLowerCase()).toContain('cobb-douglas');

    const explain = runCli(['explain', 'cobb-douglas'], workDir);
    expect(explain.status).toBe(0);
    expect(explain.stdout).toContain('Variables:');
  });

  test('trainer and convert commands work', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-trainer-convert-'));
    const trainer = runCli(['trainer', 'calculus', '--difficulty', 'easy', '--count', '1'], workDir);
    expect(trainer.status).toBe(0);
    expect(trainer.stdout).toContain('Trainer Quiz');

    const convert = runCli(['convert', '5', 'km', 'miles'], workDir);
    expect(convert.status).toBe(0);
    expect(convert.stdout).toContain('miles');
  });

  test('markdown utility command works', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-md-'));
    const filePath = path.join(workDir, 'notes.md');
    fs.writeFileSync(filePath, 'Equation: x^2 + y^2 = z^2\n');

    const result = runCli(['md', filePath], workDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Formatted');
    expect(fs.readFileSync(filePath, 'utf8')).toContain('$$');
  });

  test('unknown command suggests closest', () => {
    const workDir = fs.mkdtempSync(path.join(tempRoot, 'case-suggest-'));
    const result = runCli(['squrt'], workDir);
    expect(result.status).toBe(1);
    expect(result.stderr + result.stdout).toContain('Did you mean');
    expect(result.stderr + result.stdout).toContain('sqrt');
  });
});
