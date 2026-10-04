import { AlertTriangle, KeyRound, Lock, Server } from 'lucide-react';
import { Badge } from '../components/ui';

export function SecurityPage() {
  return (
    <div>
      <div className="page-head">
        <h1>Security</h1>
        <p>
          How to run Freebots safely. The static demo is public by design — real protection comes from your backend
          deployment.
        </p>
        <div className="row">
          <Badge tone="demo">public demo hosting</Badge>
          <Badge tone="info">backend enforces auth</Badge>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="card">
          <span className="icon-chip" aria-hidden="true">
            <KeyRound size={19} />
          </span>
          <h3>Never commit secrets</h3>
          <p>
            API keys, tokens, cookies, credentials and databases stay outside source control. The Pages build embeds no
            secrets — <code className="inline">.env</code> files are git-ignored.
          </p>
        </section>
        <section className="card">
          <span className="icon-chip" aria-hidden="true">
            <Lock size={19} />
          </span>
          <h3>Auth lives in the backend</h3>
          <p>
            GitHub Pages cannot enforce login. Authentication, Space authorization and tool permissions must be checked
            server-side on every request.
          </p>
        </section>
        <section className="card">
          <span className="icon-chip" aria-hidden="true">
            <AlertTriangle size={19} />
          </span>
          <h3>Treat content as untrusted</h3>
          <p>
            AI output and user-provided text never grant permissions. Sensitive operations require explicit,
            reviewable approval — approve each save, don’t auto-approve.
          </p>
        </section>
        <section className="card">
          <span className="icon-chip" aria-hidden="true">
            <Server size={19} />
          </span>
          <h3>Harden the deployment</h3>
          <p>
            Run backends with HTTPS, loopback-only dev, isolated browser/computer services, scoped short-lived
            credentials, and explicit allowlists for integrations.
          </p>
        </section>
      </div>

      <section className="section card" aria-labelledby="report-title">
        <h3 id="report-title" style={{ marginTop: 0 }}>
          Reporting vulnerabilities
        </h3>
        <p className="small">
          This is open-source software with no bounty or SLA. Report issues privately via the repository’s private
          vulnerability reporting feature. Do not publish exploit details, credentials, private URLs or personal data in
          public issues. See <code className="inline">SECURITY.md</code> for the full policy.
        </p>
      </section>
    </div>
  );
}
