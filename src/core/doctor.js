const fs = require('fs');
const path = require('path');
const { readConfig } = require('../config/configManager');
const { loadAllFormulas } = require('../formulas/formulaEngine');
const { plotAscii } = require('../graph/graphEngine');
const { evaluateExpression } = require('../parser/expressionParser');

function runCheck(name, fn, fixHint) {
  try {
    fn();
    return { name, status: 'PASS', message: 'OK', fixHint };
  } catch (error) {
    return { name, status: 'FAIL', message: error.message, fixHint };
  }
}

function runDoctor() {
  const checks = [
    runCheck(
      'Config integrity',
      () => {
        const config = readConfig();
        if (!config || typeof config !== 'object') {
          throw new Error('Config is not readable.');
        }
      },
      'Run: mathguru config'
    ),
    runCheck(
      'Exports directory',
      () => {
        const exportDir = path.join(process.cwd(), 'exports');
        if (!fs.existsSync(exportDir)) {
          fs.mkdirSync(exportDir, { recursive: true });
        }
      },
      'Run any export command to auto-create exports/'
    ),
    runCheck(
      'Formula loading',
      () => {
        const formulas = loadAllFormulas();
        if (!Array.isArray(formulas) || formulas.length === 0) {
          throw new Error('No formulas loaded.');
        }
      },
      'Verify src/formulas/**/*.json files'
    ),
    runCheck(
      'Graph engine',
      () => {
        const output = plotAscii('sin(x)', { size: '30x15' });
        if (!output.includes('x:[')) {
          throw new Error('Graph output did not render as expected.');
        }
      },
      'Check graph dependencies and expression syntax'
    ),
    runCheck(
      'Parser health',
      () => {
        const value = evaluateExpression('2 + 2');
        if (value !== 4) {
          throw new Error('Parser returned unexpected result.');
        }
      },
      'Review src/parser/expressionParser.js'
    ),
    runCheck(
      'Dependencies',
      () => {
        require('mathjs');
        require('nerdamer');
        require('algebrite');
        require('asciichart');
      },
      'Run: npm install'
    ),
  ];

  const failed = checks.filter((item) => item.status === 'FAIL');
  return {
    checks,
    passed: checks.length - failed.length,
    failed: failed.length,
  };
}

function formatDoctorReport(report) {
  const lines = ['MathGuru Doctor Report', ''];

  report.checks.forEach((check) => {
    lines.push(`${check.status} - ${check.name}: ${check.message}`);
    if (check.status === 'FAIL') {
      lines.push(`  Fix: ${check.fixHint}`);
    }
  });

  lines.push('');
  lines.push(`Summary: ${report.passed} passed, ${report.failed} failed`);
  if (report.failed > 0) {
    lines.push('Troubleshooting: run npm install, npm test, and verify config/formula files.');
  }

  return lines.join('\n');
}

module.exports = {
  runDoctor,
  formatDoctorReport,
};
