# Changelog

## [1.2.0] - 2026-05-12

### Added
- Kontyra branding integration across startup/help/footer/package metadata/README.
- Professional startup banner with figlet + chalk styling.
- Session management commands: `save-session`, `load-session`, `export-session`.
- Session storage in `sessions/` with JSON/TXT/Markdown export support.
- Shell session statistics and colorful prompt support.
- Export system support for Markdown format (`md` / `markdown`).
- Expanded docs for shell, exports, sessions, and branding.
- Additional Jest coverage for shell stats, session manager, markdown exports, and branded help output.

### Improved
- Terminal footer now consistently displays `Powered by Kontyra`.
- Config system now supports `exportFormat: md/markdown`.
- Offline docs (`help` / `docs`) expanded with session and export details.

### Existing Features Retained
- Basic math, scientific, economics, and finance command support.
- CLI aliasing (`mathguru`, `mg`) and command aliases.
- Interactive mode and shell mode.
- History, config, exports, and update notifications.
- Plugin-ready architecture without AI implementation.
