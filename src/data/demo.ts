export type BotStatus = 'idle' | 'working' | 'needs-approval';

export interface Freebot {
  id: string;
  name: string;
  role: string;
  tagline: string;
  instructions: string;
  tools: string[];
  spaces: string[];
  status: BotStatus;
  lastActive: string;
  isDemo: true;
  color: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  pageIds: string[];
  botIds: string[];
  updatedAt: string;
}

export interface DocPage {
  id: string;
  spaceId: string;
  title: string;
  excerpt: string;
  body: string;
  updatedAt: string;
  authorBotId: string;
}

export interface ActivityItem {
  id: string;
  kind: 'research' | 'draft' | 'approval' | 'note' | 'plan';
  title: string;
  detail: string;
  botId: string;
  at: string;
  status: 'done' | 'pending' | 'approved';
}

export interface ChatMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
  at: string;
  needsApproval?: boolean;
}

export const DEMO_BOTS: Freebot[] = [
  {
    id: 'scout',
    name: 'Scout',
    role: 'Research specialist',
    tagline: 'Finds and summarises reliable sources before you commit.',
    instructions:
      'You are Scout, a careful research coworker. Prefer primary sources, cite links, and say when evidence is thin. Never invent citations.',
    tools: ['web.read', 'web.search', 'pages.save-draft'],
    spaces: ['launch-brief', 'field-notes'],
    status: 'working',
    lastActive: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    isDemo: true,
    color: '#38bdf8',
  },
  {
    id: 'forge',
    name: 'Forge',
    role: 'Coding specialist',
    tagline: 'Turns plans into small, reviewable code changes.',
    instructions:
      'You are Forge, a pragmatic coding coworker. Propose small diffs, explain trade-offs, and never run privileged commands without approval.',
    tools: ['repo.read', 'repo.diff', 'pages.save-draft'],
    spaces: ['launch-brief'],
    status: 'idle',
    lastActive: new Date(Date.now() - 1000 * 60 * 62).toISOString(),
    isDemo: true,
    color: '#a78bfa',
  },
  {
    id: 'writer',
    name: 'Writer',
    role: 'Documentation specialist',
    tagline: 'Turns rough findings into clear docs and changelogs.',
    instructions:
      'You are Writer, a concise documentation coworker. Keep structure scannable, preserve facts, and ask before publishing externally.',
    tools: ['pages.create', 'pages.revise'],
    spaces: ['field-notes'],
    status: 'needs-approval',
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isDemo: true,
    color: '#34d399',
  },
  {
    id: 'planner',
    name: 'Planner',
    role: 'Project planning specialist',
    tagline: 'Breaks goals into sequenced tasks with owners.',
    instructions:
      'You are Planner, a planning coworker. Break work into sequenced, testable tasks and flag risks early. No silent scope changes.',
    tools: ['tasks.plan', 'pages.save-draft'],
    spaces: ['launch-brief', 'field-notes'],
    status: 'idle',
    lastActive: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    isDemo: true,
    color: '#fbbf24',
  },
];

export const DEMO_SPACES: Space[] = [
  {
    id: 'launch-brief',
    name: 'Launch Brief',
    description: 'Demo workspace for the Freebots public launch: positioning, checklist and open questions.',
    pageIds: ['launch-positioning', 'launch-checklist'],
    botIds: ['scout', 'forge', 'planner'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 'field-notes',
    name: 'Field Notes',
    description: 'Demo research notes. Sample content only — not live provider output.',
    pageIds: ['research-sources', 'docs-style'],
    botIds: ['scout', 'writer'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
];

export const DEMO_PAGES: DocPage[] = [
  {
    id: 'launch-positioning',
    spaceId: 'launch-brief',
    title: 'Launch positioning (demo)',
    excerpt: 'Who Freebots is for, what it promises, and what it deliberately does not do.',
    body: `# Launch positioning (demo)\n\nThis is **sample content**. It was written for the static demo and is not the output of a live model.\n\n## Promise\n\n- Specialist bots for research, writing, coding and planning\n- Persistent workspaces (Spaces) with reviewable pages\n- Human approval before sensitive actions\n- Explicit tool permissions per bot\n\n## Non-goals on static hosting\n\n- No live agent execution\n- No databases or authentication\n- No model provider calls\n\nConnect a backend to replace this page with live workspace data.`,
    updatedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    authorBotId: 'writer',
  },
  {
    id: 'launch-checklist',
    spaceId: 'launch-brief',
    title: 'Launch checklist (demo)',
    excerpt: 'A short, reviewable checklist showing how approvals would work with a backend.',
    body: `# Launch checklist (demo)\n\n- [x] Confirm positioning and tagline\n- [x] Review bot roles and tool permissions\n- [ ] Approve Writer's draft before it becomes a Page\n- [ ] Connect backend for live chat\n- [ ] Enable auth + HTTPS before any shared deployment\n\nApprovals pause the workflow until a human chooses **Approve & save** or **Decline**. The demo never performs this save for real.`,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    authorBotId: 'planner',
  },
  {
    id: 'research-sources',
    spaceId: 'field-notes',
    title: 'Research sources (demo)',
    excerpt: 'Example of how Scout would present sources with links — all fictional here.',
    body: `# Research sources (demo)\n\nSample only. A live Scout run would cite real URLs and report empty results honestly.\n\n1. Example source A — why it matters, what it claims\n2. Example source B — limitations and open questions\n3. Example source C — what to verify next\n\n> Demo rule: provider errors and empty results are reported, never replaced with invented evidence.`,
    updatedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    authorBotId: 'scout',
  },
  {
    id: 'docs-style',
    spaceId: 'field-notes',
    title: 'Docs style guide (demo)',
    excerpt: 'Short style rules Writer follows in this demo workspace.',
    body: `# Docs style guide (demo)\n\n- Lead with the decision, then the reasoning\n- Keep sentences short; prefer lists\n- Preserve facts; flag uncertainty\n- Ask before publishing externally\n`,
    updatedAt: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    authorBotId: 'writer',
  },
];

export const DEMO_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    kind: 'draft',
    title: "Writer prepared a draft for review",
    detail: '“Launch positioning” is waiting for human approval before it becomes a Page.',
    botId: 'writer',
    at: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    status: 'pending',
  },
  {
    id: 'a2',
    kind: 'research',
    title: 'Scout summarised 3 sample sources',
    detail: 'Demo summary only — no provider was contacted.',
    botId: 'scout',
    at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    status: 'done',
  },
  {
    id: 'a3',
    kind: 'plan',
    title: 'Planner sequenced the launch checklist',
    detail: '5 tasks, 2 done, 1 awaiting approval.',
    botId: 'planner',
    at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    status: 'done',
  },
  {
    id: 'a4',
    kind: 'note',
    title: 'Forge proposed a small diff (demo)',
    detail: 'No code was executed. A backend would run this behind tool permissions.',
    botId: 'forge',
    at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'approved',
  },
];

export const DEMO_CHATS: Record<string, ChatMessage[]> = {
  scout: [
    {
      id: 's1',
      from: 'bot',
      text: 'Hi, I’m Scout (demo). Ask me anything — my replies here are canned sample responses, not live model output.',
      at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
      id: 's2',
      from: 'user',
      text: 'What would you do with a research question?',
      at: new Date(Date.now() - 1000 * 60 * 19).toISOString(),
    },
    {
      id: 's3',
      from: 'bot',
      text: 'With a backend I’d search up to five sources, capture links, and save notes to your Space. In this static demo I can only show you how that timeline would look.',
      at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
  ],
  writer: [
    {
      id: 'w1',
      from: 'bot',
      text: 'I’ve prepared “Launch positioning” as a draft. It needs your approval before it becomes a Page.',
      at: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
      needsApproval: true,
    },
    {
      id: 'w2',
      from: 'user',
      text: 'What happens if I approve in the demo?',
      at: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    },
    {
      id: 'w3',
      from: 'bot',
      text: 'Nothing is saved for real — the demo records your choice locally and labels it clearly. A connected backend would create the Page and return a link.',
      at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ],
  forge: [
    {
      id: 'f1',
      from: 'bot',
      text: 'I’m Forge (demo). I can explain the diff I’d propose, but I can’t run commands from GitHub Pages.',
      at: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    },
  ],
  planner: [
    {
      id: 'p1',
      from: 'bot',
      text: 'I’m Planner (demo). Give me a goal and I’ll show you a sequenced, reviewable task list — locally, without side effects.',
      at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
  ],
};

export function getBot(id: string): Freebot | undefined {
  return DEMO_BOTS.find((b) => b.id === id);
}

export function getSpace(id: string): Space | undefined {
  return DEMO_SPACES.find((s) => s.id === id);
}

export function getPage(id: string): DocPage | undefined {
  return DEMO_PAGES.find((p) => p.id === id);
}
