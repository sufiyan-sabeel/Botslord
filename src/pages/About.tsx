import { Github, Heart } from 'lucide-react';
import { SITE } from '../lib/config';
import { Badge } from '../components/ui';

export function AboutPage() {
  return (
    <div>
      <div className="page-head">
        <h1>About / Open Source</h1>
        <p>
          Freebots — {SITE.tagline} Created by {SITE.creator}. A polished static frontend derived from the{' '}
          {SITE.upstreamName} concept.
        </p>
        <div className="row">
          <Badge tone="info">MIT licensed</Badge>
          <Badge tone="demo">demo / static mode</Badge>
        </div>
      </div>

      <section className="card" aria-labelledby="attrib-title">
        <h3 id="attrib-title" style={{ marginTop: 0 }}>
          Open-source attribution
        </h3>
        <p className="small">
          <strong>Freebots</strong> © 2026 {SITE.creator}. Freebots incorporates and adapts concepts from{' '}
          <strong>{SITE.upstreamName}</strong> by {SITE.upstreamAuthor} ({' '}
          <a href={SITE.upstreamUrl} target="_blank" rel="noreferrer">
            {SITE.upstreamUrl}
          </a>{' '}
          ), licensed MIT. Upstream copyright notices are preserved in <code className="inline">NOTICE.md</code> and{' '}
          <code className="inline">LICENSE</code>.
        </p>
        <p className="small">
          Freebots does <strong>not</strong> claim to be the original {SITE.upstreamName} project. It is a distinct,
          visually rebranded frontend/demo that keeps server execution cleanly isolated for a future backend.
        </p>
        <p>
          <a className="btn btn-sm" href={SITE.githubUrl} target="_blank" rel="noreferrer">
            <Github size={15} aria-hidden="true" /> View on GitHub
          </a>
        </p>
      </section>

      <section className="section grid grid-2">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>What runs where</h3>
          <dl className="kv">
            <div>
              <dt>GitHub Pages</dt>
              <dd>static frontend + demo</dd>
            </div>
            <div>
              <dt>Your backend (future)</dt>
              <dd>agents, DB, auth, models</dd>
            </div>
            <div>
              <dt>Node.js</dt>
              <dd>not executed by Pages</dd>
            </div>
          </dl>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>
            <Heart size={16} aria-hidden="true" style={{ verticalAlign: -2 }} /> Contributing
          </h3>
          <p className="small">
            See <code className="inline">CONTRIBUTING.md</code> and <code className="inline">CODE_OF_CONDUCT.md</code>.
            Keep PRs small, describe the workflow they enable, and never include secrets or live credentials.
          </p>
        </div>
      </section>
    </div>
  );
}
