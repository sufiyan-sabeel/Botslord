import { Footer, Topbar } from './components/chrome';
import { DemoBanner } from './components/ui';
import { matchRoute, navigate, useRoute, appHref } from './lib/router';
import { AboutPage } from './pages/About';
import { ActivityPage } from './pages/Activity';
import { BotDetailPage } from './pages/BotDetail';
import { BotsPage } from './pages/Bots';
import { DashboardPage } from './pages/Dashboard';
import { LandingPage } from './pages/Landing';
import { NotFoundPage } from './pages/NotFound';
import { PageDetailPage } from './pages/PageDetail';
import { PagesPage } from './pages/Pages';
import { SecurityPage } from './pages/Security';
import { SettingsPage } from './pages/Settings';
import { SpaceDetailPage } from './pages/SpaceDetail';
import { SpacesPage } from './pages/Spaces';
import { WorkspacePage } from './pages/Workspace';

const APP_ROUTES = ['/dashboard', '/workspace', '/bots', '/spaces', '/pages', '/activity', '/settings', '/security', '/about'];

function SideNav({ current }: { current: string }) {
  const items = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/workspace', label: 'Freebots workspace' },
    { to: '/bots', label: 'Bot directory' },
    { to: '/spaces', label: 'Spaces' },
    { to: '/pages', label: 'Pages' },
    { to: '/activity', label: 'Activity' },
    { to: '/settings', label: 'Settings' },
    { to: '/security', label: 'Security' },
    { to: '/about', label: 'About / Open Source' },
  ];
  const clean = current.split('?')[0].split('#')[0];
  return (
    <aside className="side" aria-label="Workspace">
      <h2>Workspace</h2>
      {items.map((i) => {
        const active = clean === i.to || clean.startsWith(i.to + '/');
        return (
          <a
            key={i.to}
            href={appHref(i.to)}
            aria-current={active ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              navigate(i.to);
            }}
          >
            {i.label}
          </a>
        );
      })}
      <p className="collapse-note">On mobile this panel appears below the content. No horizontal scroll by design.</p>
    </aside>
  );
}

export function App() {
  const route = useRoute();
  const clean = route.split('?')[0].split('#')[0];
  const isLanding = clean === '/';
  const isApp = APP_ROUTES.some((r) => clean === r || clean.startsWith(r + '/'));

  let page: React.ReactNode = null;
  if (clean === '/') page = <LandingPage />;
  else if (clean === '/dashboard') page = <DashboardPage />;
  else if (clean === '/workspace') page = <WorkspacePage />;
  else if (clean === '/bots') page = <BotsPage />;
  else if (matchRoute('/bots/:id', clean)) page = <BotDetailPage id={matchRoute('/bots/:id', clean)!['id']} />;
  else if (clean === '/spaces') page = <SpacesPage />;
  else if (matchRoute('/spaces/:id', clean)) page = <SpaceDetailPage id={matchRoute('/spaces/:id', clean)!['id']} />;
  else if (clean === '/pages') page = <PagesPage />;
  else if (matchRoute('/pages/:id', clean)) page = <PageDetailPage id={matchRoute('/pages/:id', clean)!['id']} />;
  else if (clean === '/activity') page = <ActivityPage />;
  else if (clean === '/settings') page = <SettingsPage />;
  else if (clean === '/security') page = <SecurityPage />;
  else if (clean === '/about') page = <AboutPage />;
  else page = <NotFoundPage />;

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Topbar />
      <main className="main" id="main">
        <div className="container">
          <DemoBanner />
          {isLanding || !isApp ? (
            page
          ) : (
            <div className="app-layout">
              <SideNav current={clean} />
              <div style={{ minWidth: 0 }}>{page}</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
