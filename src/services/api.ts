import { BACKEND_URL, IS_DEMO_MODE } from '../lib/config';

export type BackendStatus = 'demo' | 'live' | 'unreachable';

export interface BackendInfo {
  mode: BackendStatus;
  baseUrl: string | null;
  message: string;
}

/**
 * Frontend service boundary.
 *
 * - Demo mode (default on GitHub Pages): local sample data only. Never pretends
 *   an agent executed something. All "runs" are labelled demo responses.
 * - Live mode (future): when VITE_API_URL is set, callers should use `apiFetch`
 *   against the real backend, which enforces auth, permissions and approvals
 *   server-side. This file intentionally contains no credentials.
 */
export function getBackendInfo(): BackendInfo {
  if (IS_DEMO_MODE || !BACKEND_URL) {
    return {
      mode: 'demo',
      baseUrl: null,
      message:
        'Demo / Static Mode — no backend connected. Content on this site is sample data. Agent execution, databases, auth and model providers require a separate backend deployment.',
    };
  }
  return {
    mode: 'live',
    baseUrl: BACKEND_URL,
    message: `Backend configured at ${BACKEND_URL}. Protected actions must be authorized server-side.`,
  };
}

/** Typed fetch helper for a future backend. Throws with a clear message when in demo mode. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const info = getBackendInfo();
  if (info.mode === 'demo' || !info.baseUrl) {
    throw new Error(
      'Demo / Static Mode: no backend is connected, so live API operations are unavailable. Configure VITE_API_URL to enable this action against a real backend.',
    );
  }
  const res = await fetch(info.baseUrl.replace(/\/$/, '') + path, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    throw new Error(`Backend request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

/**
 * Demo chat responder. Canned, honest sample replies — never claims a model ran.
 * A live backend would replace this with a streamed agent call behind auth.
 */
export function demoReply(botId: string, userText: string): string {
  const t = userText.toLowerCase();
  if (t.includes('approve')) {
    return 'Recorded locally as a demo decision — nothing was saved server-side. With a backend, “Approve & save” would create the Page in an authorized Space and return a link.';
  }
  if (t.includes('run') || t.includes('execute') || t.includes('shell') || t.includes('command')) {
    return 'I can’t execute commands from this static demo. A backend would run that behind explicit tool permissions and human approval, with full isolation.';
  }
  if (t.includes('source') || t.includes('research')) {
    return 'In a live run I’d return up to five cited sources with links and report empty results honestly. This demo ships with fictional sample sources only.';
  }
  switch (botId) {
    case 'scout':
      return 'Sample Scout reply (demo): I’d research this with cited sources and save notes to your Space. No provider was contacted — connect a backend for live research.';
    case 'forge':
      return 'Sample Forge reply (demo): I’d propose a small, reviewable diff and explain trade-offs. No code was run — execution needs a backend with tool permissions.';
    case 'writer':
      return 'Sample Writer reply (demo): I’d turn your notes into a structured draft and pause for approval before saving. Nothing leaves this page in demo mode.';
    case 'planner':
      return 'Sample Planner reply (demo): I’d break this into sequenced tasks with owners and risks. This list stays local until a backend is connected.';
    default:
      return 'Sample reply (demo): this interface is a static preview. Connect a backend for live agent execution.';
  }
}
