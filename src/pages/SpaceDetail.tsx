import { DEMO_PAGES, getBot, getSpace } from '../data/demo';
import { formatDate } from '../lib/format';
import { navigate } from '../lib/router';
import { Badge, ErrorState } from '../components/ui';

export function SpaceDetailPage({ id }: { id: string }) {
  const space = getSpace(id);
  if (!space) {
    return (
      <div>
        <div className="page-head">
          <h1>Space not found</h1>
          <p>No space matches this URL.</p>
        </div>
        <ErrorState title="Unknown space" body="Browse available demo spaces instead." />
        <p style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={() => navigate('/spaces')}>
            Back to spaces
          </button>
        </p>
      </div>
    );
  }
  const pages = DEMO_PAGES.filter((p) => p.spaceId === space.id);
  return (
    <div>
      <div className="page-head">
        <h1>{space.name}</h1>
        <p>{space.description}</p>
        <div className="row">
          <Badge tone="demo">demo space</Badge>
          <Badge tone="idle">updated {formatDate(space.updatedAt)}</Badge>
        </div>
      </div>
      <section className="section" aria-labelledby="space-pages">
        <div className="section-head">
          <h2 id="space-pages">Pages ({pages.length})</h2>
        </div>
        <div className="list">
          {pages.map((p) => (
            <button
              key={p.id}
              type="button"
              className="row-card"
              style={{ width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit', font: 'inherit', background: 'var(--bg-1)' }}
              onClick={() => navigate(`/pages/${p.id}`)}
            >
              <span style={{ flex: 1, minWidth: 0 }}>
                <strong>{p.title}</strong>
                <span className="small muted" style={{ display: 'block', marginTop: 4 }}>
                  {p.excerpt} · by {getBot(p.authorBotId)?.name ?? 'unknown'} · {formatDate(p.updatedAt)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="section" aria-labelledby="space-bots">
        <div className="section-head">
          <h2 id="space-bots">Bots with access</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {space.botIds.map((bid) => (
            <button key={bid} className="btn btn-sm" type="button" onClick={() => navigate(`/bots/${bid}`)}>
              {getBot(bid)?.name ?? bid}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
