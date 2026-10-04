import { useMemo, useState } from 'react';
import { Check, Send, ShieldCheck, X } from 'lucide-react';
import { DEMO_CHATS, getBot, getSpace } from '../data/demo';
import type { ChatMessage } from '../data/demo';
import { formatDate } from '../lib/format';
import { navigate } from '../lib/router';
import { demoReply } from '../services/api';
import { Badge, ErrorState } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function BotDetailPage({ id }: { id: string }) {
  const bot = getBot(id);
  const [input, setInput] = useState('');
  const [decisions, setDecisions] = useLocalStorage<Record<string, string>>('freebots-demo-decisions', {});
  const [extra, setExtra] = useState<ChatMessage[]>([]);

  const seed = useMemo<ChatMessage[]>(() => DEMO_CHATS[id] ?? [], [id]);
  const messages = useMemo(() => [...seed, ...extra], [seed, extra]);

  if (!bot) {
    return (
      <div>
        <div className="page-head">
          <h1>Bot not found</h1>
          <p>No demo bot matches this URL.</p>
        </div>
        <ErrorState title="Unknown bot" body="This link may be outdated. Browse the directory instead." />
        <p style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={() => navigate('/bots')}>
            Back to directory
          </button>
        </p>
      </div>
    );
  }

  const pending = messages.find((m) => m.needsApproval && !decisions[m.id]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const user: ChatMessage = { id: `u-${Date.now()}`, from: 'user', text, at: new Date().toISOString() };
    const reply: ChatMessage = {
      id: `b-${Date.now()}`,
      from: 'bot',
      text: demoReply(bot!.id, text),
      at: new Date().toISOString(),
    };
    setExtra((prev) => [...prev, user, reply]);
    setInput('');
  }

  function decide(mid: string, choice: 'approved' | 'declined') {
    setDecisions((d) => ({ ...d, [mid]: choice }));
  }

  return (
    <div>
      <div className="page-head">
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span className="avatar avatar-lg" aria-hidden="true" style={{ borderColor: `${bot.color}55` }}>
            {bot.name[0]}
          </span>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ marginBottom: 2 }}>{bot.name}</h1>
            <p style={{ margin: 0 }}>{bot.role} — {bot.tagline}</p>
          </div>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <Badge tone="demo">demo agent</Badge>
          <Badge tone={bot.status === 'needs-approval' ? 'demo' : 'idle'}>{bot.status}</Badge>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="card" aria-labelledby="bot-instructions">
          <h3 id="bot-instructions" style={{ marginTop: 0 }}>
            Role & instructions
          </h3>
          <p className="small">{bot.instructions}</p>
          <p className="small muted" style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 10 }}>
            <ShieldCheck size={14} aria-hidden="true" /> Tools: {bot.tools.join(' · ')}
          </p>
          <h3>Home spaces</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {bot.spaces.map((sid) => {
              const s = getSpace(sid);
              return (
                <button key={sid} className="btn btn-sm" type="button" onClick={() => navigate(`/spaces/${sid}`)}>
                  {s ? s.name : sid}
                </button>
              );
            })}
          </div>
        </section>
        <section className="card" aria-labelledby="bot-perms">
          <h3 id="bot-perms" style={{ marginTop: 0 }}>
            Permissions (demo)
          </h3>
          <dl className="kv">
            <div>
              <dt>Browser</dt>
              <dd>read-only sample</dd>
            </div>
            <div>
              <dt>Files</dt>
              <dd>drafts need approval</dd>
            </div>
            <div>
              <dt>Shell</dt>
              <dd>disabled in demo</dd>
            </div>
            <div>
              <dt>Execution</dt>
              <dd>not performed here</dd>
            </div>
          </dl>
          <p className="hint" style={{ marginBottom: 0 }}>
            A backend would enforce these server-side. The static site never runs tools.
          </p>
        </section>
      </div>

      <section className="section" aria-labelledby="chat-title">
        <div className="section-head">
          <h2 id="chat-title">Conversation (demo interface)</h2>
          <Badge tone="demo">canned replies</Badge>
        </div>
        <div className="chat">
          <div className="chat-head">
            <span className="avatar" aria-hidden="true">
              {bot.name[0]}
            </span>
            <div style={{ minWidth: 0 }}>
              <strong>{bot.name}</strong>
              <div className="small muted">
                <span className="dot dot-amber" aria-hidden="true" /> demo · replies are samples, not model output
              </div>
            </div>
          </div>
          <div className="chat-body" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id}>
                <div className={`msg ${m.from === 'bot' ? 'msg-bot' : 'msg-user'}`}>
                  <div className="msg-meta">
                    {m.from === 'bot' ? bot.name : 'You'} · {formatDate(m.at)}
                  </div>
                  <div>{m.text}</div>
                </div>
                {m.needsApproval ? (
                  <div className="approval" style={{ marginTop: 8 }}>
                    <strong>Approval requested (demo).</strong> This draft would become a Page only after you approve —
                    on a real backend.
                    {decisions[m.id] ? (
                      <p className="small" style={{ margin: '8px 0 0' }}>
                        You chose <strong>{decisions[m.id]}</strong> (stored locally, demo only).
                      </p>
                    ) : (
                      <div className="row">
                        <button className="btn btn-sm btn-primary" type="button" onClick={() => decide(m.id, 'approved')}>
                          <Check size={15} aria-hidden="true" /> Approve & save (demo)
                        </button>
                        <button className="btn btn-sm" type="button" onClick={() => decide(m.id, 'declined')}>
                          <X size={15} aria-hidden="true" /> Decline (demo)
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
            {pending ? null : null}
          </div>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <label className="small muted" htmlFor="chat-box" style={{ position: 'absolute', left: -9999 }}>
              Message {bot.name} (demo)
            </label>
            <input
              id="chat-box"
              className="input"
              type="text"
              placeholder={`Message ${bot.name} (demo — no model connected)…`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button className="btn btn-primary" type="submit" aria-label="Send message">
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </div>
        <p className="hint">Demo honesty: sent messages stay in this browser session. Nothing is executed or persisted server-side.</p>
      </section>
    </div>
  );
}
