# MathGuru Unified Platform

**Powered by Kontyra**

[![npm version](https://img.shields.io/npm/v/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![GitHub release](https://img.shields.io/github/v/release/RayBen445/mathguru)](https://github.com/RayBen445/mathguru/releases)
[![CI](https://github.com/RayBen445/mathguru/actions/workflows/test.yml/badge.svg)](https://github.com/RayBen445/mathguru/actions/workflows/test.yml)
[![lint](https://github.com/RayBen445/mathguru/actions/workflows/lint.yml/badge.svg)](https://github.com/RayBen445/mathguru/actions/workflows/lint.yml)

MathGuru is a unified ecosystem-grade mathematics platform for CLI + SDK workflows: symbolic math, graphing, LaTeX conversion, formulas, trainer exercises, markdown math tools, conversions, exports, and sessions.

## Install

```bash
npm install mathguru
npm install -g mathguru
```

CLI aliases: `mathguru` and `mg`.

## CLI Examples

```bash
mathguru calc "diff(x^2)"
mathguru graph "sin(x)"
mathguru graph "x^2" --format svg --size 640x360
mathguru latex "sin(x)^2 + cos(x)^2"
mathguru formula economics cobb-douglas
mathguru search derivative
mathguru explain inflation
mathguru trainer calculus --difficulty medium --count 3
mathguru convert 5 km miles
mathguru md notes.md
mathguru doctor
```

## Shell Mode

```bash
mathguru shell
```

Shell supports persistent commands, history, `help`, `clear`, `stats`, `exit`, and symbolic shorthand such as:

```text
mathguru> integrate(sin(x))
mathguru> graph x^2
```

## SDK Examples (CommonJS)

```js
const mathguru = require('mathguru');

mathguru.calc.integrate('sin(x)');
mathguru.graph.plot('x^2', { size: '40x20' });
mathguru.latex.convert('x^2 + 1');
mathguru.formulas.get('cobb-douglas', 'economics');
mathguru.finance.compoundInterest(1000, 5, 2, 12);
```

## Session and Export

```bash
mathguru save-session demo
mathguru load-session demo
mathguru export-session csv demo
mathguru export history markdown
```

## Configuration

```bash
mathguru config set precision 2
mathguru config set graphSize 80x20
mathguru config set graphFormat svg
mathguru config set exportFormat markdown
```

## Testing and Validation

```bash
npm test
npm run coverage
npm run doctor
npm run benchmark
```

Professional test suite covers calc, formulas, graph, latex, trainer, markdown, cli, shell, sdk, config/export/session/history, conversion, parser, and integration.

## Future-ready (not implemented yet)

Prepared architecture (not implemented by design):

- AI integrations and AI tutor
- VSCode extension
- local REST API server
- cloud sync/collaboration

## Contributing

See `CONTRIBUTING.md`, `RELEASE.md`, and `docs/`.

## License

MIT
