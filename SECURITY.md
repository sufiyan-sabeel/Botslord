# Security

Freebots is open-source software under development. The GitHub Pages deployment is a **public static
frontend/demo** — it performs no agent execution, stores no server data, and enforces no authentication.

## What this means

- **Never commit secrets.** No `.env` files, API keys, tokens, cookies, credentials, databases, or private
  configuration belong in this repository. `.env` is git-ignored; only the inert `.env.example` is committed.
- **Environment variables belong outside source control.** Production credentials live in the deployment
  environment or secret manager, never in the frontend bundle.
- **Authentication must be enforced by a real backend in production.** GitHub Pages cannot run Node.js servers,
  gate routes, or hide data. Every Space, bot, thread, and tool action must be authorized server-side.
- **Frontend/demo mode must never contain privileged credentials.** The Pages build embeds no secrets by design
  (`VITE_API_URL` empty = demo mode).
- **Treat AI/model output and user-provided content as untrusted.** Content never grants permissions. Tool
  permissions should be explicit and least-privilege; sensitive operations require human authorization/approval.
- **Server-side authorization is required for protected actions.** Never trust client-supplied IDs, display names,
  or workspace membership. Map external identities (e.g. chat integrations) explicitly on the server.
- **GitHub Pages is public hosting.** Anything in `dist/` is world-readable. Do not ship private data, internal
  URLs, or exploit details in code, issues, or demos.

## Reporting vulnerabilities

Use the repository's **private vulnerability reporting** feature when available. If unavailable, open an issue
asking for a private reporting channel **without** including exploit details, credentials, private URLs, or
personal data.

Do not post sensitive reproduction data in a public issue. This project does not currently promise a response-time
SLA and does not offer a bug bounty.

## Scope notes (inherited from the upstream security model)

- Run local development on loopback; protect remote deployments with authentication and HTTPS.
- Keep any browser/computer execution services isolated from the application host and private networks; do not
  expose their ports publicly.
- Voice, scheduling, and integration credentials (when a backend is added) stay on the server with scoped,
  short-lived tokens where applicable.
