import { MessageSquare, ShieldCheck } from 'lucide-react';
import { DEMO_BOTS } from '../data/demo';
import { navigate } from '../lib/router';
import { Badge } from '../components/ui';

export function WorkspacePage() {
  return (
    <div>
      <div className="page-head">
        <h1>Freebots workspace</h1>
        <p>
          Specialist coworkers, side by side. This static demo shows roles, permissions and status — live execution,
          threads and computers require a backend.
        </p>
        <div className="row">
          <Badge tone="demo">Demo / Static Mode</Badge>
          <Badge tone="info">4 demo specialists</Badge>
        </div>
      </div>

      <div className="grid grid-2">
        {DEMO_BOTS.map((b) => (
          <article className="card" key={b.id}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span className="avatar avatar-lg" aria-hidden="true" style={{ borderColor: `${b.color}55` }}>
                {b.name[0]}
              </span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ margin: '0 0 2px' }}>{b.name}</h3>
                <p className="small muted" style={{ margin: 0 }}>
                  {b.role}
                </p>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  <Badge tone={b.status === 'needs-approval' ? 'demo' : 'idle'}>{b.status}</Badge>
                  <Badge tone="idle">{b.tools.length} tools</Badge>
                </div>
              </div>
            </div>
            <p style={{ marginTop: 10 }}>{b.tagline}</p>
            <p className="small muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <ShieldCheck size={14} aria-hidden="true" /> {b.tools.join(' · ')}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-sm btn-primary" type="button" onClick={() => navigate(`/bots/${b.id}`)}>
                <MessageSquare size={15} aria-hidden="true" /> Open conversation
              </button>
              <button className="btn btn-sm" type="button" onClick={() => navigate(`/bots/${b.id}`)}>
                Details
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
