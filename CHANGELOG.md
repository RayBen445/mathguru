# Changelog

## [1.2.0] - 2026-05-12

### Added
- CLI alias support (`mg`) and command aliases.
- Local calculation history with `history` and `clear-history` commands.
- Safe formula expression engine with `eval` command.
- Config system with `config`, `config get`, and `config set`.
- Export system for history/latest result to JSON/TXT/CSV.
- Shell mode (`mathguru shell`) with continuous command execution.
- Offline docs (`mathguru docs` / `mathguru help`).
- Smart unknown-command suggestions.
- Plugin architecture foundation in `src/plugins`.
- TypeScript definitions in `types/index.d.ts`.
- Jest-based automated test suite.
- Automatic npm update notifications via `update-notifier`.

### Improved
- CLI formatting with section dividers, table output, and styled success/error/info messages.
- Advanced terminal UX using `chalk`, `figlet`, `ora`, and `inquirer`.
