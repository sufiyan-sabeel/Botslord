import { DEMO_SPACES, getBot } from '../data/demo';
import { timeAgo } from '../lib/format';
import { navigate } from '../lib/router';
import { Badge, EmptyState } from '../components/ui';

export function SpacesPage() {
  return (
    <div>
      <div className="page-head">
        <h1>Spaces</h1>
        <p>Persistent homes for pages and bot context. Demo content only — a backend would store these server-side.</p>
        <div className="row">
          <Badge tone="demo">demo data</Badge>
          <Badge tone="idle">{DEMO_SPACES.length} spaces</Badge>
        </div>
      </div>
      {DEMO_SPACES.length === 0 ? (
        <EmptyState title="No spaces yet" body="Create your first space once a backend is connected." />
      ) : (
        <div className="grid grid-2">
          {DEMO_SPACES.map((s) => (
            <article className="card" key={s.id}>
              <h3 style={{ marginTop: 0 }}>{s.name}</h3>
              <p>{s.description}</p>
              <p className="small muted">
                {s.pageIds.length} pages · {s.botIds.length} bots · updated {timeAgo(s.updatedAt)}
              </p>
              <p className="small muted">
                Bots: {s.botIds.map((id) => getBot(id)?.name ?? id).join(', ')}
              </p>
              <button className="btn btn-sm" type="button" onClick={() => navigate(`/spaces/${s.id}`)}>
                Open space
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
