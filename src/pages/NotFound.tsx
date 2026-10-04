import { navigate } from '../lib/router';

export function NotFoundPage() {
  return (
    <div>
      <div className="page-head">
        <h1>Page not found</h1>
        <p>This link doesn’t match anything in the Freebots demo. It may be outdated or mistyped.</p>
      </div>
      <div className="empty" role="status">
        <p style={{ margin: '0 0 6px', fontWeight: 700, color: 'var(--text-0)' }}>404 — nothing here</p>
        <p className="small" style={{ margin: 0 }}>
          Deep links work on GitHub Pages via the 404 fallback — but this path has no matching view.
        </p>
        <p style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate('/')}>
            Go home
          </button>
          <button className="btn btn-sm" type="button" onClick={() => navigate('/dashboard')}>
            Open dashboard
          </button>
        </p>
      </div>
    </div>
  );
}
