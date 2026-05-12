const fs = require('fs');
const path = require('path');
const os = require('os');

const trainer = require('../src/trainer/trainerEngine');
const converter = require('../src/convert/unitConverter');
const markdown = require('../src/markdown/mathMarkdown');

describe('trainer/convert/markdown utilities', () => {
  test('trainer generates quizzes by category and difficulty', () => {
    const quiz = trainer.generate('calculus', 'medium', 2);
    expect(quiz.questions.length).toBe(2);
    expect(trainer.formatQuiz(quiz)).toContain('Trainer Quiz');
  });

  test('unit converter works for distance and temperature', () => {
    const distance = converter.convert(5, 'km', 'miles');
    expect(distance.output).toBeGreaterThan(3);

    const temp = converter.convert(100, 'celsius', 'fahrenheit');
    expect(Math.round(temp.output)).toBe(212);
  });

  test('markdown utility detects and formats equations', () => {
    const content = 'Equation: x^2 + y^2 = z^2';
    const found = markdown.detectExpressions(content);
    expect(found.length).toBeGreaterThan(0);

    const formatted = markdown.formatMarkdownMath(content);
    expect(formatted).toContain('$$');
  });

  test('markdown utility processes files', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mathguru-md-'));
    const filePath = path.join(tempDir, 'notes.md');
    fs.writeFileSync(filePath, 'Equation: x^2 + y^2 = z^2\n');

    const result = markdown.processFile(filePath);
    expect(result.expressions).toBeGreaterThan(0);
    expect(fs.readFileSync(filePath, 'utf8')).toContain('$$');

    fs.rmSync(tempDir, { recursive: true, force: true });
  });
});
