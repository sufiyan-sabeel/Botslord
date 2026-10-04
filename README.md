# Freebots

**Open AI coworkers. Your tools. Your control.**

Creator: **Umaiz Sufiyan** · Repository: `sufiyan-sabeel/Botslord`

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub Pages](https://img.shields.io/badge/hosting-GitHub%20Pages-38bdf8.svg)](https://sufiyan-sabeel.github.io/Botslord/)
[![Deploy to Pages](https://github.com/sufiyan-sabeel/Botslord/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/sufiyan-sabeel/Botslord/actions/workflows/deploy-pages.yml)

Create specialized AI coworkers for research, writing, coding, planning and other workflows — with persistent
workspaces, reviewable pages, explicit tool permissions, and human approval before sensitive actions.

**Live site:** https://sufiyan-sabeel.github.io/Botslord/

> Freebots is derived from and inspired by the open-source OpenDots project by CopilotKit.
> See [NOTICE.md](./NOTICE.md) and the upstream license for attribution. Freebots does not claim to be the
> original OpenDots project.

## Overview

Freebots is a polished, mobile-first web workspace:

- **Landing / Home** — positioning, feature cards, open-source attribution
- **Dashboard** — demo overview, approvals inbox, bot status
- **Freebots / agent workspace** — the four demo specialists side by side
- **Spaces** — persistent homes for pages and bot context (demo data)
- **Pages / documents** — searchable library + focused reading view (demo content)
- **Bot directory + Bot details** — roles, instructions, tool permissions, home spaces
- **Conversation interface** — honest demo chat with canned replies + local approval recording
- **Activity / tasks** — demo timeline of research, drafts, plans and approvals
- **Settings** — local preferences + backend wiring docs (no secrets in the bundle)
- **Security** — safe-operation guidance for the demo and for future backends
- **About / Open Source** — licensing, attribution, architecture split

Design: dark graphite/charcoal interface, subtle glass surfaces, clean typography, blue/cyan accents,
restrained gradients, Lucide icons, responsive navigation, and polished empty/loading/error states.

## Features

- Specialist Bots (Scout · Forge · Writer · Planner — clearly labelled demo agents)
- Persistent Workspaces (Spaces with pages + bot access)
- Pages & Notes (search, reading view, approval states)
- Human Approval (Approve & save / Decline recorded locally in demo)
- Tool Permissions (per-bot scopes, least privilege, server-enforced when live)
- Open Source (MIT + upstream attribution preserved)
- Self-hostable architecture (static frontend now, isolated backend later)
- Model flexibility (bring an OpenAI-compatible provider via backend config)

## Architecture

```
Browser (GitHub Pages: static dist/)
  └─ React + Vite SPA (src/)
       ├─ components/  layout, nav, shared states
       ├─ pages/       12 routes (landing → about)
       ├─ data/        safe local demo content only
       ├─ services/    backend boundary (demo vs live)
       ├─ hooks/       localStorage preferences
       ├─ lib/         config, router, formatting
       └─ styles/      theme + responsive system

Future backend (NOT on Pages — deploy separately)
  ├─ agent execution, model provider calls
  ├─ databases, auth, threads/history
  ├─ tool permission enforcement + approvals
  └─ integrations (search, speech, channels, computers)
```

Upstream OpenDots runs a Node 24 server (Hono + CopilotKit runtime + TanStack AI + SQLite + browser/computer
services) that GitHub Pages **cannot** execute. Freebots therefore keeps all server-dependent behavior isolated
behind `src/services/api.ts`: with `VITE_API_URL` empty the UI shows an explicit **Demo / Static Mode** banner
and never fakes successful API operations.

Source layout:

```
src/
  components/
  pages/
  data/
  services/
  hooks/
  lib/
  styles/
```

## Static GitHub Pages demo

- Production output is `dist/` from `npm run build` with `base: '/Botslord/'`.
- SPA deep links work via `public/404.html` redirect + `?redirect=` restore in `index.html`.
- `public/.nojekyll` disables Jekyll processing.
- Workflow `.github/workflows/deploy-pages.yml` builds, typechecks, uploads `dist/`, and deploys with the
  `github-pages` environment (least-privilege `contents: read`, `pages: write`, `id-token: write`).
- **Demo honesty:** sample bots, spaces, pages and chats are fictional; approvals are recorded in localStorage;
  nothing is executed, saved server-side, or sent to a model provider.

## Local development

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/sufiyan-sabeel/Botslord.git
cd Botslord
npm ci
cp .env.example .env
npm run dev
```

Open http://127.0.0.1:5173/Botslord/.

```bash
npm run typecheck   # TypeScript check
npm run build       # typecheck + production build to dist/
npm run preview     # preview the Pages-style build locally
```

## Backend requirements

GitHub Pages hosts the static frontend/demo. Server-side agent execution, databases, authentication, model
providers and other privileged integrations require a **separate backend deployment**. The frontend attaches via
`VITE_API_URL`; when set, protected actions must be authorized server-side (never trust client-supplied IDs).

Suggested backend responsibilities (future): agent runtime + streaming, conversation threads, pages/spaces
persistence, per-bot tool permission enforcement, approval lifecycle, auth + HTTPS, isolated browser/computer
services, scoped short-lived credentials, and explicit integration allowlists.

## Environment variables

Only these frontend variables exist. Never commit real secrets; `.env` is git-ignored.

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Optional backend base URL. Empty = Demo / Static Mode. |
| `VITE_SITE_URL` | Optional canonical site URL override. |

Server credentials (model keys, DB paths, tokens) belong in the backend environment — see [SECURITY.md](./SECURITY.md)
and `.env.example`. Upstream OpenDots documents a larger server-side env surface (Intelligence, OpenAI-compatible
provider, browser/computer services, Slack, speech); none of those keys belong in this frontend.

## Security

See [SECURITY.md](./SECURITY.md). Highlights:

- Open-source software; never commit secrets; env belongs outside source control.
- Report vulnerabilities privately; no exploit details in public issues.
- Auth enforced by a real backend; demo mode holds no privileged credentials.
- Treat AI/model output and user content as untrusted; explicit permissions; sensitive ops need approval.
- GitHub Pages is public hosting — `dist/` is world-readable.

Dependency updates via Dependabot (`.github/dependabot.yml`).

## Open-source attribution

Freebots © 2026 Umaiz Sufiyan (MIT — see [LICENSE](./LICENSE)). It incorporates/adapts concepts from
**OpenDots** by CopilotKit (https://github.com/CopilotKit/OpenDots, MIT). Upstream copyright
(`Copyright (c) Atai Barkai`) is preserved in [NOTICE.md](./NOTICE.md). Do not remove third-party notices.

## License

MIT — see [LICENSE](./LICENSE).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Keep PRs small, verify
with `npm run typecheck` + `npm run build`, and review `git status` / `git diff` / `git diff --check` for secrets.

## Roadmap

- [ ] Pluggable backend adapter (`VITE_API_URL`) with auth + streaming chat
- [ ] Server-persisted Spaces/Pages with revision checks + autosave states
- [ ] Real approval lifecycle (Approve & save creates versioned pages)
- [ ] Per-bot tool permission editor + audit log UI
- [ ] Background tasks with pause/retry against live runs
- [ ] Optional integrations (search provider, speech, channels) behind explicit allowlists
