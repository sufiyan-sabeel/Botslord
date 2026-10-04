import { DEMO_ACTIVITY, getBot } from '../data/demo';
import { formatDate } from '../lib/format';
import { Badge } from '../components/ui';

const KIND_LABEL: Record<string, string> = {
  research: 'Research',
  draft: 'Draft',
  approval: 'Approval',
  note: 'Note',
  plan: 'Plan',
};

export function ActivityPage() {
  return (
    <div>
      <div className="page-head">
        <h1>Activity / tasks</h1>
        <p>Demo timeline of what the bots did, are doing, or are waiting on. Nothing here ran on a server.</p>
        <div className="row">
          <Badge tone="demo">demo timeline</Badge>
          <Badge tone="idle">{DEMO_ACTIVITY.length} events</Badge>
        </div>
      </div>
      <ol className="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {DEMO_ACTIVITY.map((a) => (
          <li className="row-card" key={a.id}>
            <span className="avatar" aria-hidden="true">
              {(getBot(a.botId)?.name ?? '?')[0]}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <strong>{a.title}</strong>
                <Badge tone={a.status === 'pending' ? 'demo' : a.status === 'done' ? 'info' : 'idle'}>
                  {KIND_LABEL[a.kind] ?? a.kind} · {a.status}
                </Badge>
              </div>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                {getBot(a.botId)?.name} · {formatDate(a.at)}
              </p>
              <p className="small" style={{ margin: '6px 0 0', color: 'var(--text-1)' }}>
                {a.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
