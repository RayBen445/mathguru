function isDigit(char) {
  return char >= '0' && char <= '9';
}

function tokenize(expression) {
  const tokens = [];
  let i = 0;

  while (i < expression.length) {
    const ch = expression[i];

    if (ch === ' ' || ch === '\t' || ch === '\n') {
      i += 1;
      continue;
    }

    if (isDigit(ch) || ch === '.') {
      let value = ch;
      i += 1;
      while (i < expression.length && (isDigit(expression[i]) || expression[i] === '.')) {
        value += expression[i];
        i += 1;
      }
      if (!/^\d*\.?\d+$/.test(value)) {
        throw new Error(`eval: invalid number '${value}'.`);
      }
      tokens.push({ type: 'number', value: Number(value) });
      continue;
    }

    if (/[a-zA-Z]/.test(ch)) {
      let ident = ch;
      i += 1;
      while (i < expression.length && /[a-zA-Z]/.test(expression[i])) {
        ident += expression[i];
        i += 1;
      }
      tokens.push({ type: 'identifier', value: ident.toLowerCase() });
      continue;
    }

    if ('+-*/^()%'.includes(ch)) {
      tokens.push({ type: 'operator', value: ch });
      i += 1;
      continue;
    }

    throw new Error(`eval: unsupported character '${ch}'.`);
  }

  return tokens;
}

function toRpn(tokens) {
  const output = [];
  const stack = [];

  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3, '%': 4 };
  const rightAssociative = new Set(['^']);

  let prevType = 'start';

  tokens.forEach((token) => {
    if (token.type === 'number') {
      output.push(token);
      prevType = 'number';
      return;
    }

    if (token.type === 'identifier') {
      if (token.value !== 'sqrt') {
        throw new Error(`eval: unsupported function '${token.value}'.`);
      }
      stack.push({ type: 'function', value: token.value });
      prevType = 'identifier';
      return;
    }

    if (token.type === 'operator' && token.value === '(') {
      stack.push(token);
      prevType = 'lparen';
      return;
    }

    if (token.type === 'operator' && token.value === ')') {
      while (stack.length > 0 && stack[stack.length - 1].value !== '(') {
        output.push(stack.pop());
      }
      if (stack.length === 0) {
        throw new Error('eval: mismatched parentheses.');
      }
      stack.pop();

      if (stack.length > 0 && stack[stack.length - 1].type === 'function') {
        output.push(stack.pop());
      }
      prevType = 'rparen';
      return;
    }

    if (token.type === 'operator' && token.value === '%') {
      if (prevType !== 'number' && prevType !== 'rparen') {
        throw new Error('eval: % must follow a value.');
      }
      output.push({ type: 'operator', value: '%' });
      prevType = 'percent';
      return;
    }

    if (token.type === 'operator' && '+-*/^'.includes(token.value)) {
      const isUnaryMinus = token.value === '-' && (prevType === 'start' || prevType === 'operator' || prevType === 'lparen');
      if (isUnaryMinus) {
        output.push({ type: 'number', value: 0 });
      }

      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (top.value === '(' || top.type === 'function') {
          break;
        }

        const topPrec = precedence[top.value] ?? 0;
        const currentPrec = precedence[token.value] ?? 0;

        if (topPrec > currentPrec || (topPrec === currentPrec && !rightAssociative.has(token.value))) {
          output.push(stack.pop());
        } else {
          break;
        }
      }

      stack.push({ type: 'operator', value: token.value });
      prevType = 'operator';
      return;
    }

    throw new Error('eval: invalid expression token.');
  });

  while (stack.length > 0) {
    const top = stack.pop();
    if (top.value === '(' || top.value === ')') {
      throw new Error('eval: mismatched parentheses.');
    }
    output.push(top);
  }

  return output;
}

function evaluateRpn(rpn) {
  const stack = [];

  rpn.forEach((token) => {
    if (token.type === 'number') {
      stack.push(token.value);
      return;
    }

    if (token.type === 'function' && token.value === 'sqrt') {
      const value = stack.pop();
      if (value === undefined) {
        throw new Error('eval: invalid sqrt usage.');
      }
      if (value < 0) {
        throw new Error('eval: sqrt input must be 0 or greater.');
      }
      stack.push(Math.sqrt(value));
      return;
    }

    if (token.type === 'operator' && token.value === '%') {
      const value = stack.pop();
      if (value === undefined) {
        throw new Error('eval: invalid % usage.');
      }
      stack.push(value / 100);
      return;
    }

    const b = stack.pop();
    const a = stack.pop();
    if (a === undefined || b === undefined) {
      throw new Error('eval: invalid expression.');
    }

    switch (token.value) {
      case '+':
        stack.push(a + b);
        break;
      case '-':
        stack.push(a - b);
        break;
      case '*':
        stack.push(a * b);
        break;
      case '/':
        if (b === 0) {
          throw new Error('eval: division by zero.');
        }
        stack.push(a / b);
        break;
      case '^':
        stack.push(Math.pow(a, b));
        break;
      default:
        throw new Error(`eval: unsupported operator '${token.value}'.`);
    }
  });

  if (stack.length !== 1) {
    throw new Error('eval: invalid expression.');
  }

  return stack[0];
}

function evaluateExpression(expression) {
  if (!expression || !String(expression).trim()) {
    throw new Error('eval: expression is required.');
  }
  const tokens = tokenize(String(expression));
  const rpn = toRpn(tokens);
  return evaluateRpn(rpn);
}

module.exports = {
  tokenize,
  toRpn,
  evaluateRpn,
  evaluateExpression,
};
