import { getBot, getPage, getSpace } from '../data/demo';
import { formatDate } from '../lib/format';
import { navigate } from '../lib/router';
import { Badge, ErrorState } from '../components/ui';

function renderBody(body: string) {
  // Minimal demo markdown: headings, lists, quotes, code. Not a full parser by design.
  return body.split('\n').map((line, i) => {
    if (line.startsWith('# ')) return <h2 key={i}>{line.slice(2)}</h2>;
    if (line.startsWith('## ')) return <h3 key={i}>{line.slice(3)}</h3>;
    if (line.startsWith('- [x]')) return <p key={i}>☑ {line.slice(5)}</p>;
    if (line.startsWith('- [ ]')) return <p key={i}>☐ {line.slice(5)}</p>;
    if (line.startsWith('- ')) return <p key={i}>• {line.slice(2)}</p>;
    if (line.startsWith('> ')) return <blockquote key={i}>{line.slice(2)}</blockquote>;
    if (line.startsWith('```') || line.trim().length === 0) return null;
    // crude bold
    const parts = line.split('**');
    return (
      <p key={i}>
        {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>))}
      </p>
    );
  });
}

export function PageDetailPage({ id }: { id: string }) {
  const page = getPage(id);
  if (!page) {
    return (
      <div>
        <div className="page-head">
          <h1>Page not found</h1>
          <p>No document matches this URL.</p>
        </div>
        <ErrorState title="Unknown page" body="Browse the demo library instead." />
        <p style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={() => navigate('/pages')}>
            Back to pages
          </button>
        </p>
      </div>
    );
  }
  const space = getSpace(page.spaceId);
  const author = getBot(page.authorBotId);
  return (
    <div>
      <div className="page-head">
        <h1>{page.title}</h1>
        <p>
          {space?.name} · by {author?.name ?? 'unknown'} · {formatDate(page.updatedAt)}
        </p>
        <div className="row">
          <Badge tone="demo">demo content</Badge>
          <button className="btn btn-sm" type="button" onClick={() => navigate(`/spaces/${page.spaceId}`)}>
            Open {space?.name ?? 'space'}
          </button>
          {author ? (
            <button className="btn btn-sm" type="button" onClick={() => navigate(`/bots/${author.id}`)}>
              Ask {author.name} (demo)
            </button>
          ) : null}
        </div>
      </div>
      <article className="card prose" aria-label={page.title}>
        {renderBody(page.body)}
      </article>
      <p className="hint">Sample document. Editing, autosave and revision checks require a backend with a database.</p>
    </div>
  );
}
