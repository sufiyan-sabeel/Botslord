import type { ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import { getBackendInfo } from '../services/api';

export function DemoBanner() {
  const info = getBackendInfo();
  if (info.mode !== 'demo') return null;
  return (
    <div className="demo-banner" role="status" aria-label="Demo mode notice">
      <TriangleAlert size={18} aria-hidden="true" />
      <div>
        <strong>Demo / Static Mode.</strong> This Pages site ships sample data only — bots do not execute,
        save, or contact model providers here. Connect a backend for live work.
      </div>
    </div>
  );
}

export function EmptyState({ title, body, children }: { title: string; body: string; children?: ReactNode }) {
  return (
    <div className="empty" role="status">
      <p style={{ margin: '0 0 6px', fontWeight: 700, color: 'var(--text-0)' }}>{title}</p>
      <p style={{ margin: 0 }} className="small">
        {body}
      </p>
      {children ? <div style={{ marginTop: 12 }}>{children}</div> : null}
    </div>
  );
}

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="loading" role="status" aria-live="polite" aria-label={label}>
      <div className="skeleton" aria-hidden="true">
        <span style={{ width: '60%' }} />
        <span style={{ width: '85%' }} />
        <span style={{ width: '70%' }} />
      </div>
      <p className="small" style={{ marginBottom: 0 }}>
        {label}
      </p>
    </div>
  );
}

export function ErrorState({ title, body, onRetry }: { title: string; body: string; onRetry?: () => void }) {
  return (
    <div className="error" role="alert">
      <p style={{ margin: '0 0 6px', fontWeight: 700 }}>{title}</p>
      <p className="small" style={{ margin: 0 }}>
        {body}
      </p>
      {onRetry ? (
        <p style={{ margin: '12px 0 0' }}>
          <button className="btn btn-sm" type="button" onClick={onRetry}>
            Try again
          </button>
        </p>
      ) : null}
    </div>
  );
}

export function Badge({ tone = 'idle', children }: { tone?: 'demo' | 'live' | 'idle' | 'info'; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
