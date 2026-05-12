# MathGuru CLI

**Powered by Kontyra**

[![npm version](https://img.shields.io/npm/v/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![GitHub release](https://img.shields.io/github/v/release/RayBen445/mathguru)](https://github.com/RayBen445/mathguru/releases)
[![npm downloads](https://img.shields.io/npm/dm/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![CI](https://github.com/RayBen445/mathguru/actions/workflows/test.yml/badge.svg)](https://github.com/RayBen445/mathguru/actions/workflows/test.yml)
[![lint](https://github.com/RayBen445/mathguru/actions/workflows/lint.yml/badge.svg)](https://github.com/RayBen445/mathguru/actions/workflows/lint.yml)
[![license](https://img.shields.io/npm/l/mathguru.svg)](LICENSE)

MathGuru is a professionally engineered open-source Node.js ecosystem for mathematics, economics, finance, exports, session tooling, and terminal workflows.

---

## Installation

```bash
npm install mathguru
npm install -g mathguru
```

CLI aliases:

```bash
mathguru add 2 3
mg sqrt 25
```

---

## Kontyra Branding

MathGuru is maintained as a Kontyra product with consistent terminal and documentation branding:

```text
Powered by Kontyra
```

Included in startup banner, help/docs, package metadata, README, and terminal footer.

---

## CLI Examples

```bash
mathguru add 2 3
mathguru divide 10 3 --precision 2
mathguru inflation 500 700
mathguru eval "sqrt(25) + 5"
mathguru help
```

---

## Shell Examples

```bash
mathguru shell
```

Inside shell:

```text
mathguru> add 2 3
5

mathguru> inflation 500 700
40

mathguru> stats
```

---

## SDK Examples (CommonJS)

```js
const mathguru = require('mathguru');

console.log(mathguru.add(2, 3));
console.log(mathguru.sqrt(25));
console.log(mathguru.compoundInterest(1000, 5, 2, 12));
console.log(mathguru.evaluateExpression('sqrt(25) + 5'));
```

Type definitions are available via `types/index.d.ts`.

---

## Formula Engine Examples

```bash
mathguru eval "5 * (10 + 2)"
mathguru eval "sqrt(25) + 5"
mathguru eval "50% * 200"
mathguru eval "2^8"
```

---

## Export Examples

```bash
mathguru export history json
mathguru export history markdown
mathguru export result csv
```

Formats: JSON, CSV, TXT, Markdown.

---

## Session Examples

```bash
mathguru save-session
mathguru save-session sprint-review
mathguru load-session sprint-review
mathguru export-session markdown sprint-review
```

Sessions are stored in `sessions/`.

---

## Professional Engineering Workflow

### CI/CD Workflows

- `.github/workflows/test.yml` → tests + legacy tests + typings validation
- `.github/workflows/lint.yml` → lint + format checks + audit
- `.github/workflows/release.yml` → tagged release automation + release notes
- `.github/workflows/npm-publish.yml` → publish to npm on GitHub release

### Semantic Versioning

- PATCH = bug fixes
- MINOR = new features
- MAJOR = breaking changes

Helper scripts:

```bash
npm run release:patch
npm run release:minor
npm run release:major
```

### Changelog Automation

```bash
npm run changelog
```

Maintains `CHANGELOG.md` from commit history.

### Pre-publish Validation

```bash
npm run prepublish:check
```

Runs lint, formatting checks, tests, typecheck, package validation, and tarball dry-run.

---

## Documentation

See `docs/`:

- `docs/installation.md`
- `docs/cli.md`
- `docs/sdk.md`
- `docs/formulas.md`
- `docs/contributing.md`
- `docs/releases.md`

Release process details: `RELEASE.md`.

---

## Contribution Guide

Please read:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`

Branch strategy:

- `main`
- `dev`
- `feature/*`

---

## Project Structure

```text
mathguru/
├── .github/workflows/
├── bin/
├── docs/
├── src/
├── tests/
├── exports/
├── sessions/
├── types/
├── .gitignore
├── .npmignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
├── RELEASE.md
├── README.md
├── package.json
└── test.js
```

---

## License

[MIT](LICENSE)
