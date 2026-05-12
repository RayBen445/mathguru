const trainer = require('../src/trainer/trainerEngine');

describe('trainer system tests', () => {
  test('quiz generation with difficulty and category', () => {
    const quiz = trainer.generate('calculus', 'easy', 2);
    expect(quiz.questions.length).toBe(2);
    expect(quiz.category).toBe('calculus');
  });

  test('answer generation and formatting', () => {
    const quiz = trainer.generate('algebra', 'medium', 1);
    const output = trainer.formatQuiz(quiz);
    expect(output).toContain('Answer:');
  });

  test('invalid difficulty/category handling', () => {
    expect(() => trainer.generate('biology', 'easy', 1)).toThrow();
    expect(() => trainer.generate('algebra', 'expert', 1)).toThrow();
  });
});
