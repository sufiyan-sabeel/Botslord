import { useState } from 'react';
import { DEMO_PAGES, getBot, getSpace } from '../data/demo';
import { formatDate } from '../lib/format';
import { navigate } from '../lib/router';
import { Badge, EmptyState } from '../components/ui';

export function PagesPage() {
  const [q, setQ] = useState('');
  const list = DEMO_PAGES.filter(
    (p) => q.trim().length === 0 || `${p.title} ${p.excerpt}`.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <div>
      <div className="page-head">
        <h1>Pages / documents</h1>
        <p>Searchable demo library. Manual reading works offline; saving and live collaboration need a backend.</p>
        <div className="row">
          <Badge tone="demo">sample content</Badge>
          <Badge tone="idle">{DEMO_PAGES.length} pages</Badge>
        </div>
      </div>
      <div className="toolbar" role="search">
        <label className="small muted" htmlFor="page-search">
          Search pages
        </label>
        <input
          id="page-search"
          className="input"
          type="search"
          placeholder="Search titles and excerpts…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {list.length === 0 ? (
        <EmptyState title="No pages found" body="Try a different search term.">
          <button className="btn btn-sm" type="button" onClick={() => setQ('')}>
            Clear search
          </button>
        </EmptyState>
      ) : (
        <div className="list">
          {list.map((p) => (
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
                  {p.excerpt}
                </span>
                <span className="small muted" style={{ display: 'block', marginTop: 4 }}>
                  {getSpace(p.spaceId)?.name} · by {getBot(p.authorBotId)?.name} · {formatDate(p.updatedAt)}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
