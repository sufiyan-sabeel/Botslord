// Central frontend configuration.
// Static GitHub Pages build: no secrets here. A real backend is attached later
// via VITE_API_URL. When empty, the UI runs in explicit Demo / Static Mode.

export const SITE = {
  name: 'Freebots',
  tagline: 'Open AI coworkers. Your tools. Your control.',
  creator: 'Umaiz Sufiyan',
  repo: 'sufiyan-sabeel/Botslord',
  githubUrl: 'https://github.com/sufiyan-sabeel/Botslord',
  pagesUrl: 'https://sufiyan-sabeel.github.io/Botslord/',
  upstreamName: 'OpenDots',
  upstreamUrl: 'https://github.com/CopilotKit/OpenDots',
  upstreamAuthor: 'CopilotKit',
} as const;

function readEnv(key: string): string {
  try {
    const v = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.[key];
    return (v ?? '').trim();
  } catch {
    return '';
  }
}

export const BACKEND_URL = readEnv('VITE_API_URL');

/** True when no backend is configured — the UI must show Demo / Static Mode. */
export const IS_DEMO_MODE = BACKEND_URL.length === 0;

/** Base path for routing (Vite `base`, e.g. `/Botslord/` on Pages, `/` locally). */
export function appBase(): string {
  try {
    const b = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.BASE_URL as
      | string
      | undefined;
    if (b && b.length > 0) return b;
  } catch {
    /* ignore */
  }
  return '/';
}
