import { ArrowRight, Bot, FileText, FolderKanban } from 'lucide-react';
import { DEMO_ACTIVITY, DEMO_BOTS, DEMO_PAGES, DEMO_SPACES } from '../data/demo';
import { formatDate } from '../lib/format';
import { navigate } from '../lib/router';
import { Badge } from '../components/ui';

export function DashboardPage() {
  const pending = DEMO_ACTIVITY.filter((a) => a.status === 'pending');
  return (
    <div>
      <div className="page-head">
        <h1>Dashboard</h1>
        <p>
          Demo overview of your workspace. Everything here is sample data — connect a backend for live agent state,
          databases and model providers.
        </p>
      </div>

      <div className="grid grid-2 grid-3">
        <article className="card">
          <span className="icon-chip" aria-hidden="true">
            <Bot size={19} />
          </span>
          <h3>{DEMO_BOTS.length} demo bots</h3>
          <p>Scout, Forge, Writer, Planner — each with roles, tools and home spaces.</p>
          <p style={{ marginTop: 10 }}>
            <button className="btn btn-sm" type="button" onClick={() => navigate('/bots')}>
              Open directory <ArrowRight size={15} aria-hidden="true" />
            </button>
          </p>
        </article>
        <article className="card">
          <span className="icon-chip" aria-hidden="true">
            <FolderKanban size={19} />
          </span>
          <h3>{DEMO_SPACES.length} spaces</h3>
          <p>Persistent homes for pages and bot context.</p>
          <p style={{ marginTop: 10 }}>
            <button className="btn btn-sm" type="button" onClick={() => navigate('/spaces')}>
              Open spaces <ArrowRight size={15} aria-hidden="true" />
            </button>
          </p>
        </article>
        <article className="card">
          <span className="icon-chip" aria-hidden="true">
            <FileText size={19} />
          </span>
          <h3>{DEMO_PAGES.length} sample pages</h3>
          <p>Reviewable drafts with approval states.</p>
          <p style={{ marginTop: 10 }}>
            <button className="btn btn-sm" type="button" onClick={() => navigate('/pages')}>
              Open pages <ArrowRight size={15} aria-hidden="true" />
            </button>
          </p>
        </article>
      </div>

      <section className="section" aria-labelledby="pending-title">
        <div className="section-head">
          <h2 id="pending-title">Needs your approval ({pending.length})</h2>
          <button className="btn btn-sm btn-ghost" type="button" onClick={() => navigate('/activity')}>
            View activity →
          </button>
        </div>
        <div className="list">
          {pending.map((a) => (
            <div className="row-card" key={a.id}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>{a.title}</strong>
                  <Badge tone="demo">demo · pending</Badge>
                </div>
                <p className="small muted" style={{ margin: '4px 0 0' }}>
                  {a.detail} · {formatDate(a.at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="bots-title">
        <div className="section-head">
          <h2 id="bots-title">Bots at a glance</h2>
          <button className="btn btn-sm btn-ghost" type="button" onClick={() => navigate('/workspace')}>
            Open workspace →
          </button>
        </div>
        <div className="list">
          {DEMO_BOTS.map((b) => (
            <button
              key={b.id}
              type="button"
              className="row-card"
              style={{ width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit', font: 'inherit', background: 'var(--bg-1)' }}
              onClick={() => navigate(`/bots/${b.id}`)}
            >
              <span className="avatar" aria-hidden="true" style={{ borderColor: `${b.color}55` }}>
                {b.name[0]}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>{b.name}</strong>
                  <span className="small muted">{b.role}</span>
                  <Badge tone={b.status === 'needs-approval' ? 'demo' : 'idle'}>
                    {b.status === 'needs-approval' ? 'needs approval' : b.status}
                  </Badge>
                </span>
                <span className="small muted" style={{ display: 'block', marginTop: 4 }}>
                  {b.tagline}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
