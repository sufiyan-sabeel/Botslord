import { useState } from 'react';
import {
  Activity,
  Bot,
  FolderKanban,
  Home,
  Info,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
  Shield,
  X,
} from 'lucide-react';
import { SITE } from '../lib/config';
import { navigate, useLinkProps, useRoute } from '../lib/router';

const NAV = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/workspace', label: 'Workspace', icon: FolderKanban },
  { to: '/bots', label: 'Bots', icon: Bot },
  { to: '/spaces', label: 'Spaces', icon: Newspaper },
  { to: '/pages', label: 'Pages', icon: Newspaper },
  { to: '/activity', label: 'Activity', icon: Activity },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/security', label: 'Security', icon: Shield },
  { to: '/about', label: 'About', icon: Info },
];

function NavLink({ to, label, exact }: { to: string; label: string; exact?: boolean }) {
  const route = useRoute();
  const clean = route.split('?')[0].split('#')[0];
  const active = exact ? clean === to : clean === to || clean.startsWith(to + '/');
  const base = (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL ?? '/';
  const href = (base.replace(/\/$/, '') + to).replace(/\/{2,}/g, '/') || '/';
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {label}
    </a>
  );
}

export function Topbar() {
  const [open, setOpen] = useState(false);
  const route = useRoute();
  void useLinkProps; // keep router helpers tree-shaken intentionally
  void route;

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <a
            className="brand"
            href={(import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL ?? '/'}
            aria-label="Freebots home"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              navigate('/');
            }}
          >
            <span className="brand-mark" aria-hidden="true">
              <span>F</span>
            </span>
            <span className="brand-name">Freebots</span>
            <span className="brand-tag">{SITE.tagline}</span>
          </a>
          <nav className="nav-desktop" aria-label="Primary">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/workspace" label="Workspace" />
            <NavLink to="/bots" label="Bots" />
            <NavLink to="/spaces" label="Spaces" />
            <NavLink to="/activity" label="Activity" />
            <NavLink to="/about" label="About" />
          </nav>
          <div className="topbar-actions">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => {
                setOpen(false);
                navigate('/dashboard');
              }}
            >
              Open Freebots
            </button>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} label={item.label} exact={item.exact} />
          ))}
        </nav>
      ) : null}
    </>
  );
}

export function Footer() {
  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>Freebots</strong>
          <p>{SITE.tagline}</p>
          <p>
            Creator: {SITE.creator} · Repository: <code className="inline">{SITE.repo}</code>
          </p>
          <p>
            Derived from and inspired by {SITE.upstreamName} by {SITE.upstreamAuthor}. See NOTICE.md for
            attribution.
          </p>
        </div>
        <nav aria-label="Product">
          <strong>Product</strong>
          <a href="/dashboard" onClick={go('/dashboard')}>
            Dashboard
          </a>
          <a href="/bots" onClick={go('/bots')}>
            Bot directory
          </a>
          <a href="/spaces" onClick={go('/spaces')}>
            Spaces
          </a>
          <a href="/security" onClick={go('/security')}>
            Security
          </a>
        </nav>
        <nav aria-label="Open source">
          <strong>Open source</strong>
          <a href={SITE.githubUrl} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
          <a href="/about" onClick={go('/about')}>
            About / Open Source
          </a>
          <a href="/settings" onClick={go('/settings')}>
            Settings
          </a>
        </nav>
      </div>
    </footer>
  );
}
