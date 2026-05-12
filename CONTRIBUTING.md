# Contributing to MathGuru

Thanks for contributing to **MathGuru (Powered by Kontyra)**.

## Branching

- `main` for stable releases.
- `dev` for integration.
- `feature/*` for focused work.

## Development

1. Fork and clone.
2. Install dependencies: `npm ci`
3. Run checks:
   - `npm run lint`
   - `npm run format:check`
   - `npm test`
   - `npm run test:legacy`
4. Add/adjust tests for changes.
5. Open a pull request with clear summary.

## Commit and Release Notes

Use clear commit messages so changelog automation stays useful.

## No AI Integrations Yet

Architecture may remain AI-ready, but do not add AI API/model integrations at this time.
