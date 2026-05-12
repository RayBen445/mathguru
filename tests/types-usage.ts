import mathguru = require('mathguru');

const addResult: number = mathguru.add(2, 3);
const diffResult = mathguru.calc.differentiate('x^2');
const graph = mathguru.graph.plot('x^2', { size: '30x15' });
const latex = mathguru.latex.convert('x^2 + 1');
const quiz = mathguru.trainer.generate('algebra', 'easy', 1);
const conversion = mathguru.convert.run(5, 'km', 'miles');

if (
  addResult < 0 ||
  typeof diffResult !== 'string' ||
  !graph ||
  !latex ||
  quiz.questions.length === 0 ||
  conversion.output <= 0
) {
  throw new Error('Type usage smoke test failed');
}
