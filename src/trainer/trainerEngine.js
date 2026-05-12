const QUESTION_BANK = {
  algebra: {
    easy: [
      { question: 'Solve for x: x + 5 = 12', answer: 'x = 7' },
      { question: 'Expand: 2(x + 3)', answer: '2x + 6' },
    ],
    medium: [
      { question: 'Factor: x^2 - 5x + 6', answer: '(x - 2)(x - 3)' },
      { question: 'Solve: 3x - 4 = 2x + 8', answer: 'x = 12' },
    ],
    hard: [{ question: 'Solve: x^2 - 4x - 12 = 0', answer: 'x = 6 or x = -2' }],
  },
  calculus: {
    easy: [
      { question: 'Differentiate: x^2', answer: '2x' },
      { question: 'Integrate: 2x', answer: 'x^2 + C' },
    ],
    medium: [
      { question: 'Differentiate: sin(x)', answer: 'cos(x)' },
      { question: 'Integrate: cos(x)', answer: 'sin(x) + C' },
    ],
    hard: [{ question: 'Differentiate: x^3 * sin(x)', answer: '3x^2 sin(x) + x^3 cos(x)' }],
  },
  statistics: {
    easy: [
      { question: 'Mean of 2, 4, 6?', answer: '4' },
      { question: 'Median of 1, 5, 9?', answer: '5' },
    ],
    medium: [
      { question: 'Variance formula symbol?', answer: 'σ² or s²' },
      { question: 'Mode of 1,1,2,3?', answer: '1' },
    ],
    hard: [{ question: 'Standard deviation is the square root of?', answer: 'Variance' }],
  },
};

function normalizeCategory(category) {
  return String(category || '').toLowerCase();
}

function normalizeDifficulty(difficulty = 'easy') {
  const value = String(difficulty).toLowerCase();
  if (!['easy', 'medium', 'hard'].includes(value)) {
    throw new Error('trainer: difficulty must be easy, medium, or hard.');
  }
  return value;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generate(category, difficulty = 'easy', count = 3) {
  const normalizedCategory = normalizeCategory(category);
  const normalizedDifficulty = normalizeDifficulty(difficulty);
  const bank = QUESTION_BANK[normalizedCategory];

  if (!bank) {
    throw new Error(`trainer: unsupported category '${category}'.`);
  }

  const source = bank[normalizedDifficulty] || [];
  if (source.length === 0) {
    throw new Error(`trainer: no exercises available for ${normalizedCategory}/${normalizedDifficulty}.`);
  }

  const total = Math.max(1, Number(count) || 3);
  const questions = Array.from({ length: total }).map(() => randomItem(source));

  return {
    category: normalizedCategory,
    difficulty: normalizedDifficulty,
    questions,
  };
}

function formatQuiz(quiz) {
  const header = `Trainer Quiz (${quiz.category} - ${quiz.difficulty})`;
  const body = quiz.questions
    .map((item, index) => `${index + 1}. ${item.question}\n   Answer: ${item.answer}`)
    .join('\n');
  return `${header}\n${body}`;
}

module.exports = {
  QUESTION_BANK,
  generate,
  formatQuiz,
};
