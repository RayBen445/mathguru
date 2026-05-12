# Release Management Guide

MathGuru is a **Kontyra** product and follows semantic versioning for stable open-source delivery.

## Semantic Versioning Rules

- **PATCH** (`x.y.Z`): bug fixes and non-breaking maintenance.
- **MINOR** (`x.Y.z`): new backward-compatible features.
- **MAJOR** (`X.y.z`): breaking API or behavior changes.

## Release Workflow

1. Ensure `main` is stable and CI is green.
2. Run release helper script:
   - `npm run release:patch`
   - `npm run release:minor`
   - `npm run release:major`
3. Push commit + tag (`git push --follow-tags`).
4. Tag push triggers `.github/workflows/release.yml`:
   - validates version/tag
   - runs tests and package validation
   - updates changelog
   - generates GitHub Release notes
5. Publish from GitHub Release event via `.github/workflows/npm-publish.yml`.

## Publishing Process

- npm publishing is automated and uses `NPM_TOKEN` from GitHub Secrets.
- Pre-publish checks run before publish:
  - Jest tests
  - legacy tests
  - package validation
  - tarball dry-run
  - version/tag correctness
- Never publish manually from unverified branches.

## Branch Strategy

- `main`: production-ready.
- `dev`: integration branch for upcoming releases.
- `feature/*`: isolated feature work (e.g. `feature/shell-mode`).
