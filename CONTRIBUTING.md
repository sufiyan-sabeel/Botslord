# Contributing to Freebots

Thanks for helping build Freebots — open AI coworkers, under your control.

## Ground rules

- Keep PRs small and focused; describe the **workflow they enable**.
- Distinguish **live integrations** from fixtures/demo data. Never fake successful backend operations.
- **Never commit secrets**: no `.env`, API keys, tokens, cookies, credentials, databases, or private config.
- Preserve upstream attribution (`NOTICE.md`, `LICENSE`) and third-party copyright notices.
- Prefer maintainable code over excessive abstraction; keep server code isolated for a future backend.

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm ci
cp .env.example .env
npm run dev
```

Open http://127.0.0.1:5173/Botslord/ (Vite respects the Pages `base` in dev too).

Useful commands:

```bash
npm run typecheck
npm run build
npm run preview
```

## Pull requests

1. Create a branch from `main`.
2. Run `npm run typecheck` and `npm run build` before pushing.
3. Run `git status`, `git diff`, and `git diff --check` and review for secrets or build artifacts.
4. Open a PR with: what changed, why, how you verified (commands + results), and screenshots for UI changes.

By contributing you agree your contributions are licensed under the repository's MIT license.
