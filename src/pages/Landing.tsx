import { ArrowRight, Bot, FileText, FolderKanban, Github, Lock, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE } from '../lib/config';
import { appHref, navigate } from '../lib/router';

const FEATURES = [
  { icon: Bot, title: 'Specialist Bots', body: 'Research, coding, writing and planning coworkers with explicit roles and instructions.' },
  { icon: FolderKanban, title: 'Persistent Workspaces', body: 'Spaces keep pages, context and approvals together across sessions.' },
  { icon: FileText, title: 'Pages & Notes', body: 'Searchable library, focused editor drafts, and page-linked conversations.' },
  { icon: ShieldCheck, title: 'Human Approval', body: 'Sensitive saves pause for Approve & save or Decline — never silent side effects.' },
  { icon: Lock, title: 'Tool Permissions', body: 'Per-bot read/write scopes for browser, files and shell. Least privilege by default.' },
  { icon: Scale, title: 'Open Source', body: 'MIT-licensed Freebots code with clear upstream attribution to OpenDots.' },
  { icon: Sparkles, title: 'Self-hostable architecture', body: 'Static frontend on Pages; server execution isolated in your own backend.' },
  { icon: ArrowRight, title: 'Model flexibility', body: 'Bring an OpenAI-compatible provider via backend config — no lock-in in the UI.' },
];

export function LandingPage() {
  return (
    <div>
      <section className="hero" aria-labelledby="hero-title">
        <span className="eyebrow">Freebots · Open-source AI workspace</span>
        <h1 id="hero-title">
          Open AI coworkers.
          <br />
          <span className="grad">Your tools. Your control.</span>
        </h1>
        <p className="lead">
          Create specialized AI coworkers for research, writing, coding, planning and other workflows — with
          persistent spaces, reviewable pages, and explicit approvals.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" type="button" onClick={() => navigate('/dashboard')}>
            Open Freebots <ArrowRight size={17} aria-hidden="true" />
          </button>
          <a className="btn" href={SITE.githubUrl} target="_blank" rel="noreferrer">
            <Github size={17} aria-hidden="true" /> View on GitHub
          </a>
        </div>
        <div className="hero-meta" aria-label="Project facts">
          <span>Creator: {SITE.creator}</span>
          <span aria-hidden="true">·</span>
          <span>
            Repository: <code className="inline">{SITE.repo}</code>
          </span>
          <span aria-hidden="true">·</span>
          <span>Static demo — no backend required to explore</span>
        </div>
      </section>

      <section className="section" aria-labelledby="features-title">
        <div className="section-head">
          <h2 id="features-title">Everything you need for supervised coworkers</h2>
          <a
            href={appHref('/bots')}
            onClick={(e) => {
              e.preventDefault();
              navigate('/bots');
            }}
          >
            Meet the demo bots →
          </a>
        </div>
        <div className="grid grid-2 grid-3">
          {FEATURES.map((f) => (
            <article className="card" key={f.title}>
              <span className="icon-chip" aria-hidden="true">
                <f.icon size={19} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="section-head">
          <h2 id="how-title">How it works in this demo</h2>
        </div>
        <div className="grid grid-2">
          <article className="card">
            <h3>1 · Pick a specialist</h3>
            <p>
              Scout, Forge, Writer and Planner ship as clearly-labelled demo agents. Each has a role, instructions,
              tool permissions and home spaces.
            </p>
          </article>
          <article className="card">
            <h3>2 · Review before anything saves</h3>
            <p>
              Drafts pause for human approval. The static site records your choice locally and never pretends a
              server-side save happened.
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="oss-title">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Open-source attribution</h3>
          <p>
            Freebots is derived from and inspired by the open-source {SITE.upstreamName} project by{' '}
            {SITE.upstreamAuthor}. See <code className="inline">NOTICE.md</code> and the upstream license for
            attribution. Freebots does not claim to be the original {SITE.upstreamName} project.
          </p>
        </div>
      </section>
    </div>
  );
}
