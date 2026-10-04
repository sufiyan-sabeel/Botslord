import { useState } from 'react';
import { DEMO_BOTS } from '../data/demo';
import { navigate } from '../lib/router';
import { Badge, EmptyState } from '../components/ui';

export function BotsPage() {
  const [q, setQ] = useState('');
  const list = DEMO_BOTS.filter(
    (b) =>
      q.trim().length === 0 ||
      `${b.name} ${b.role} ${b.tagline}`.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <div>
      <div className="page-head">
        <h1>Bot directory</h1>
        <p>Four clearly-labelled demo specialists. No live model is connected — these showcase roles and permissions.</p>
        <div className="row">
          <Badge tone="demo">demo agents</Badge>
          <Badge tone="idle">{DEMO_BOTS.length} total</Badge>
        </div>
      </div>
      <div className="toolbar" role="search">
        <label className="small muted" htmlFor="bot-search">
          Search bots
        </label>
        <input
          id="bot-search"
          className="input"
          type="search"
          placeholder="Try “research” or “code”…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {list.length === 0 ? (
        <EmptyState title="No bots match your search" body="Try a different term, or browse all four demo specialists.">
          <button className="btn btn-sm" type="button" onClick={() => setQ('')}>
            Clear search
          </button>
        </EmptyState>
      ) : (
        <div className="list">
          {list.map((b) => (
            <button
              key={b.id}
              type="button"
              className="row-card"
              style={{ width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit', font: 'inherit', background: 'var(--bg-1)' }}
              onClick={() => navigate(`/bots/${b.id}`)}
              aria-label={`Open ${b.name}, ${b.role}`}
            >
              <span className="avatar" aria-hidden="true" style={{ borderColor: `${b.color}55` }}>
                {b.name[0]}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>{b.name}</strong>
                  <span className="small muted">{b.role}</span>
                  <Badge tone="demo">demo</Badge>
                </span>
                <span className="small muted" style={{ display: 'block', marginTop: 4 }}>
                  {b.tagline}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
