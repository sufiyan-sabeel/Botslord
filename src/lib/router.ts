import { useCallback, useEffect, useState } from 'react';
import { appBase } from '../lib/config';

function basePath(): string {
  const b = appBase();
  if (!b || b === '/') return '';
  return b.replace(/\/$/, '');
}

/** Current path relative to the app base, e.g. `/bots/scout` (query/hash stripped). */
export function currentRoute(): string {
  const base = basePath();
  let p = window.location.pathname;
  if (base && p.startsWith(base)) p = p.slice(base.length);
  if (!p) p = '/';
  if (!p.startsWith('/')) p = '/' + p;
  // Treat Pages index redirect (?redirect=...) as already handled by index.html.
  return p;
}

/** Navigate within the SPA (respects the Pages base path). */
export function navigate(to: string): void {
  const base = basePath();
  const clean = to.startsWith('/') ? to : '/' + to;
  const url = (base + clean).replace(/\/{2,}/g, '/');
  window.history.pushState(null, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** Minimal client-side router state (no dependency, Pages-safe). */
export function useRoute(): string {
  const [route, setRoute] = useState<string>(() => currentRoute());
  useEffect(() => {
    const onPop = () => setRoute(currentRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return route;
}

/** Match `/bots/:id` style patterns. Returns params or null. */
export function matchRoute(pattern: string, route: string): Record<string, string> | null {
  const p = pattern.split('/').filter(Boolean);
  const r = route.split('?')[0].split('#')[0].split('/').filter(Boolean);
  if (p.length !== r.length) {
    // Allow trailing detail: pattern `/bots` matches route `/bots` only.
    return null;
  }
  const params: Record<string, string> = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(r[i]);
    else if (p[i] !== r[i]) return null;
  }
  return params;
}

export function useLinkProps(to: string, current: string): { href: string; onClick: (e: React.MouseEvent) => void; isActive: boolean } {
  const base = basePath();
  const href = (base + (to.startsWith('/') ? to : '/' + to)).replace(/\/{2,}/g, '/');
  const isActive = currentRouteMatches(current, to);
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigate(to);
    },
    [to],
  );
  return { href, onClick, isActive };
}

function currentRouteMatches(current: string, to: string): boolean {
  const clean = current.split('?')[0].split('#')[0];
  if (to === '/') return clean === '/';
  return clean === to || clean.startsWith(to + '/');
}
