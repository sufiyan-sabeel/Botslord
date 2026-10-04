import { useState } from 'react';
import { getBackendInfo } from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Badge } from '../components/ui';

export function SettingsPage() {
  const info = getBackendInfo();
  const [backendUrl, setBackendUrl] = useLocalStorage('freebots-backend-url', '');
  const [density, setDensity] = useLocalStorage<'comfortable' | 'compact'>('freebots-density', 'comfortable');
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <div className="page-head">
        <h1>Settings</h1>
        <p>Local display preferences. Backend wiring is documented — never paste secrets into this static demo.</p>
        <div className="row">
          <Badge tone={info.mode === 'demo' ? 'demo' : 'live'}>{info.mode === 'demo' ? 'Demo / Static Mode' : 'Backend configured'}</Badge>
        </div>
      </div>

      <section className="card" aria-labelledby="backend-title">
        <h3 id="backend-title" style={{ marginTop: 0 }}>
          Backend connection (future)
        </h3>
        <p className="small muted">
          GitHub Pages hosts only the static frontend. To enable live agents, deploy the backend separately and set{' '}
          <code className="inline">VITE_API_URL</code> at build time. This field previews the value locally — it is not
          used for privileged calls from the demo.
        </p>
        <div className="field">
          <label htmlFor="backend-url">Backend base URL (local preview only)</label>
          <input
            id="backend-url"
            className="input"
            type="url"
            placeholder="https://api.example.com"
            value={backendUrl}
            onChange={(e) => {
              setBackendUrl(e.target.value);
              setSaved(false);
            }}
            inputMode="url"
          />
          <span className="hint">Stored in this browser only. Production uses build-time env, never committed secrets.</span>
        </div>
        <div className="field">
          <label htmlFor="density">Density</label>
          <select
            id="density"
            className="select"
            value={density}
            onChange={(e) => setDensity(e.target.value as 'comfortable' | 'compact')}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </div>
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={() => setSaved(true)}
        >
          Save preferences locally
        </button>
        {saved ? (
          <p className="small" role="status" style={{ color: 'var(--success)' }}>
            Saved to this browser (localStorage).
          </p>
        ) : null}
      </section>

      <section className="section card" aria-labelledby="env-title">
        <h3 id="env-title" style={{ marginTop: 0 }}>
          Environment variables (backend, not committed)
        </h3>
        <div className="table-wrap">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Variable</th>
                <th scope="col">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="inline">VITE_API_URL</code>
                </td>
                <td>Optional backend base URL. Empty = demo mode.</td>
              </tr>
              <tr>
                <td>
                  <code className="inline">VITE_SITE_URL</code>
                </td>
                <td>Optional canonical site URL override.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="hint">Server credentials (model keys, DB paths, tokens) belong outside source control — see SECURITY.md.</p>
      </section>
    </div>
  );
}
