export type LetterStatus = "draft" | "sent" | "archived";

export type CoverLetter = {
  id: string;
  title: string;
  company: string;
  companyLogo: string; // gradient class or letter
  role: string;
  jobId: string;
  applicationId: string;
  resumeVersion: string;
  resumeId: string;
  status: LetterStatus;
  starred: boolean;
  wordCount: number;
  editedAt: string;
  createdAt: string;
  tone: "Confident" | "Warm" | "Direct" | "Enthusiastic";
  tags: string[];
  body: string;
  versions: {
    id: string;
    label: string;
    date: string;
    author: string;
    note: string;
    wordCount: number;
  }[];
};

const LINEAR_BODY = `Hi Erin,

Every Linear release note reads like it was written by someone who actually uses the product — and that's precisely why I want to join. I've spent the last six years building the kind of infrastructure that Linear's issue graph relies on: high-throughput event pipelines, offline-first sync, and the quiet, unglamorous work of making things feel instantaneous.

At Vercel I led the migration of our build orchestration layer to a Rust-based scheduler, cutting p95 cold-start times by 62% and freeing three engineers to focus on developer experience instead of firefighting. Before that, at Stripe, I designed the idempotency layer that now underpins Terminal payments in 47 countries.

What draws me to the Staff Backend role isn't a checklist of technologies. It's the chance to work alongside a team that treats craft as a first-class concern — where a 40ms regression is a bug, not a rounding error, and where documentation is written before the PR is opened.

I'd love to walk you through the architecture diagrams from the Vercel scheduler and hear how Linear thinks about the next phase of its sync engine.

Best,
Maya Chen`;

const STRIPE_BODY = `Hi hiring team,

I've been a Stripe user since Checkout was three fields and a submit button. What kept me building on Stripe wasn't the API — it was the sense that the people behind it understood the shape of the problem better than I did.

Now I want to help build that same feeling for the next generation of developers. As a Senior Product Engineer on the Developer Experience team, I'd bring seven years of full-stack work (most recently at Vercel), a portfolio of open-source tooling with 4.2k combined GitHub stars, and the particular obsession that comes from having debugged webhooks at 2am on a launch weekend.

I'm especially excited by the recent work on the Workbench and the direction hinted at in Sessions '26. I have concrete ideas about how the local emulator could better model idempotency edge cases — and I'd love to share them.

Warmly,
Maya Chen`;

const VERCEL_BODY = `Hi Guillermo,

I'm writing to apply for the Staff Platform Engineer role on the Edge Runtime team. I've spent the last two years running production workloads on Vercel and the last four building the kind of primitives your team ships every quarter.

At Cloudflare I owned the migration from Workers KV to Durable Objects for our largest internal tenant — 14 billion requests per month, zero downtime, and a 71% reduction in read latency. The postmortems, ADRs, and load-test harnesses are all public if you'd like to read them.

What I want from my next role: to work on primitives that thousands of teams will build on, alongside people who consider a good abstraction its own reward.

Thanks for reading,
Maya Chen`;

export const COVER_LETTERS: CoverLetter[] = [
  {
    id: "linear-staff-backend",
    title: "Linear · Staff Backend Engineer",
    company: "Linear",
    companyLogo: "from-violet-500 to-fuchsia-500",
    role: "Staff Backend Engineer",
    jobId: "LNR-4821",
    applicationId: "APP-2041",
    resumeVersion: "Backend · v4.2",
    resumeId: "backend-staff-v4",
    status: "sent",
    starred: true,
    wordCount: 214,
    editedAt: "2026-06-29T14:22:00Z",
    createdAt: "2026-06-24T09:00:00Z",
    tone: "Confident",
    tags: ["Referral", "Priority"],
    body: LINEAR_BODY,
    versions: [
      { id: "v6", label: "v1.6", date: "2026-06-29T14:22:00Z", author: "Maya", note: "Tightened opener, cut passive voice", wordCount: 214 },
      { id: "v5", label: "v1.5", date: "2026-06-28T18:03:00Z", author: "Maya", note: "Added Vercel scheduler metric", wordCount: 231 },
      { id: "v4", label: "v1.4", date: "2026-06-27T11:41:00Z", author: "Maya", note: "Reframed second paragraph around craft", wordCount: 246 },
      { id: "v3", label: "v1.3", date: "2026-06-26T22:12:00Z", author: "Maya", note: "First recruiter-reviewed draft", wordCount: 268 },
      { id: "v2", label: "v1.2", date: "2026-06-25T15:30:00Z", author: "Maya", note: "Structural rewrite", wordCount: 291 },
      { id: "v1", label: "v1.0", date: "2026-06-24T09:00:00Z", author: "Maya", note: "Initial draft", wordCount: 342 },
    ],
  },
  {
    id: "stripe-senior-devx",
    title: "Stripe · Senior Product Engineer, DevX",
    company: "Stripe",
    companyLogo: "from-indigo-500 to-blue-500",
    role: "Senior Product Engineer",
    jobId: "STR-9910",
    applicationId: "APP-2039",
    resumeVersion: "Frontend · v3.1",
    resumeId: "frontend-senior-v3",
    status: "sent",
    starred: true,
    wordCount: 186,
    editedAt: "2026-06-27T10:04:00Z",
    createdAt: "2026-06-20T09:00:00Z",
    tone: "Warm",
    tags: ["High interest"],
    body: STRIPE_BODY,
    versions: [
      { id: "v4", label: "v1.4", date: "2026-06-27T10:04:00Z", author: "Maya", note: "Trimmed 40 words", wordCount: 186 },
      { id: "v3", label: "v1.3", date: "2026-06-26T09:12:00Z", author: "Maya", note: "Added Sessions '26 reference", wordCount: 218 },
      { id: "v2", label: "v1.2", date: "2026-06-23T13:22:00Z", author: "Maya", note: "New opening hook", wordCount: 224 },
      { id: "v1", label: "v1.0", date: "2026-06-20T09:00:00Z", author: "Maya", note: "Initial draft", wordCount: 278 },
    ],
  },
  {
    id: "vercel-staff-platform",
    title: "Vercel · Staff Platform Engineer",
    company: "Vercel",
    companyLogo: "from-neutral-800 to-neutral-500",
    role: "Staff Platform Engineer",
    jobId: "VRC-3312",
    applicationId: "APP-2035",
    resumeVersion: "Backend · v4.2",
    resumeId: "backend-staff-v4",
    status: "sent",
    starred: false,
    wordCount: 168,
    editedAt: "2026-06-26T16:40:00Z",
    createdAt: "2026-06-18T09:00:00Z",
    tone: "Direct",
    tags: [],
    body: VERCEL_BODY,
    versions: [
      { id: "v3", label: "v1.3", date: "2026-06-26T16:40:00Z", author: "Maya", note: "Final polish", wordCount: 168 },
      { id: "v2", label: "v1.2", date: "2026-06-22T09:41:00Z", author: "Maya", note: "Added Cloudflare metric", wordCount: 191 },
      { id: "v1", label: "v1.0", date: "2026-06-18T09:00:00Z", author: "Maya", note: "Initial draft", wordCount: 240 },
    ],
  },
  {
    id: "figma-senior-frontend",
    title: "Figma · Senior Frontend Engineer",
    company: "Figma",
    companyLogo: "from-rose-500 to-orange-400",
    role: "Senior Frontend Engineer",
    jobId: "FIG-7788",
    applicationId: "APP-2028",
    resumeVersion: "Frontend · v3.1",
    resumeId: "frontend-senior-v3",
    status: "draft",
    starred: false,
    wordCount: 142,
    editedAt: "2026-06-30T08:12:00Z",
    createdAt: "2026-06-29T21:00:00Z",
    tone: "Enthusiastic",
    tags: ["In progress"],
    body: `Hi Figma team,\n\nI've been sketching this letter in my head for a while. The canvas engine work you shipped last quarter is the kind of thing I want to spend the next chapter of my career building.\n\n(Draft in progress — expand on rendering pipeline experience and cite the WebGPU migration.)\n\nBest,\nMaya`,
    versions: [
      { id: "v2", label: "v1.2", date: "2026-06-30T08:12:00Z", author: "Maya", note: "Added canvas engine reference", wordCount: 142 },
      { id: "v1", label: "v1.0", date: "2026-06-29T21:00:00Z", author: "Maya", note: "Initial draft", wordCount: 96 },
    ],
  },
  {
    id: "notion-staff-eng",
    title: "Notion · Staff Engineer, Sync",
    company: "Notion",
    companyLogo: "from-neutral-700 to-neutral-400",
    role: "Staff Engineer, Sync",
    jobId: "NOT-5521",
    applicationId: "APP-2019",
    resumeVersion: "Backend · v4.2",
    resumeId: "backend-staff-v4",
    status: "sent",
    starred: false,
    wordCount: 198,
    editedAt: "2026-06-15T11:03:00Z",
    createdAt: "2026-06-10T09:00:00Z",
    tone: "Confident",
    tags: [],
    body: `Hi Ivan,\n\nCRDTs are the closest thing our industry has to poetry. I'd love to help write the next verse at Notion.\n\nOver the last four years I've built two production-grade sync engines — one for a mobile collaboration app with 800k MAU, another for an internal design system that eventually shipped as open source. Both use a variant of Yjs with server-authoritative conflict resolution, and both taught me that the interesting problems in sync are almost never the algorithmic ones — they're the operational ones.\n\nI'd love to talk about what you're building next.\n\nBest,\nMaya Chen`,
    versions: [
      { id: "v2", label: "v1.2", date: "2026-06-15T11:03:00Z", author: "Maya", note: "Cut Yjs deep-dive", wordCount: 198 },
      { id: "v1", label: "v1.0", date: "2026-06-10T09:00:00Z", author: "Maya", note: "Initial draft", wordCount: 256 },
    ],
  },
  {
    id: "supabase-founding",
    title: "Supabase · Founding Platform Engineer",
    company: "Supabase",
    companyLogo: "from-emerald-500 to-teal-400",
    role: "Founding Platform Engineer",
    jobId: "SBS-1120",
    applicationId: "APP-2012",
    resumeVersion: "Backend · v4.2",
    resumeId: "backend-staff-v4",
    status: "draft",
    starred: true,
    wordCount: 176,
    editedAt: "2026-06-28T22:47:00Z",
    createdAt: "2026-06-14T09:00:00Z",
    tone: "Warm",
    tags: ["Follow-up"],
    body: `Hi Paul,\n\nI keep a running list of tools I would build if I had unlimited time — most of them are already on Supabase's roadmap. That seems like a strong signal.\n\nI'd like to be considered for the Founding Platform Engineer role. The short pitch: I've built Postgres-adjacent infrastructure at two companies (Stripe, then Vercel), I care deeply about open source, and I've been running Supabase in production for three side projects.\n\nHappy to send code samples, references, or thoughts on the current pgvector performance work.\n\nWarmly,\nMaya`,
    versions: [
      { id: "v3", label: "v1.3", date: "2026-06-28T22:47:00Z", author: "Maya", note: "Added pgvector line", wordCount: 176 },
      { id: "v2", label: "v1.2", date: "2026-06-20T14:22:00Z", author: "Maya", note: "Tightened pitch", wordCount: 194 },
      { id: "v1", label: "v1.0", date: "2026-06-14T09:00:00Z", author: "Maya", note: "Initial draft", wordCount: 232 },
    ],
  },
  {
    id: "anthropic-research-eng",
    title: "Anthropic · Research Engineer, Agents",
    company: "Anthropic",
    companyLogo: "from-amber-500 to-orange-500",
    role: "Research Engineer",
    jobId: "ANT-6640",
    applicationId: "APP-2007",
    resumeVersion: "ML · v2.0",
    resumeId: "ml-senior-v2",
    status: "sent",
    starred: false,
    wordCount: 203,
    editedAt: "2026-06-12T09:22:00Z",
    createdAt: "2026-06-05T09:00:00Z",
    tone: "Direct",
    tags: [],
    body: `Hi Anthropic team,\n\nI don't have a PhD, but I've shipped three agentic systems into production — two internal, one public — and I've read every paper on your publications page from the last eighteen months.\n\nThe reason I'm writing: I want to work on evaluation harnesses. Specifically, the gap between capability benchmarks and actual real-world reliability. I think it's the most important unsolved problem in the field, and I have concrete ideas about how to close it.\n\nI've attached a resume and a two-page technical writeup of an evaluation framework I built at Vercel. Happy to walk through either.\n\nBest,\nMaya Chen`,
    versions: [
      { id: "v3", label: "v1.3", date: "2026-06-12T09:22:00Z", author: "Maya", note: "Cut hedging", wordCount: 203 },
      { id: "v2", label: "v1.2", date: "2026-06-08T18:00:00Z", author: "Maya", note: "Added writeup reference", wordCount: 221 },
      { id: "v1", label: "v1.0", date: "2026-06-05T09:00:00Z", author: "Maya", note: "Initial draft", wordCount: 268 },
    ],
  },
  {
    id: "railway-founding",
    title: "Railway · Founding Engineer",
    company: "Railway",
    companyLogo: "from-purple-500 to-pink-500",
    role: "Founding Engineer",
    jobId: "RWY-0042",
    applicationId: "APP-1998",
    resumeVersion: "Backend · v4.2",
    resumeId: "backend-staff-v4",
    status: "archived",
    starred: false,
    wordCount: 154,
    editedAt: "2026-05-30T13:15:00Z",
    createdAt: "2026-05-22T09:00:00Z",
    tone: "Enthusiastic",
    tags: [],
    body: `Hi Jake,\n\nRailway is the tool I recommend when someone asks me how to deploy something without a Kubernetes-shaped headache. I'd love to help build what's next.\n\n(Archived: withdrew after Linear moved to onsite.)`,
    versions: [
      { id: "v2", label: "v1.2", date: "2026-05-30T13:15:00Z", author: "Maya", note: "Withdrawn", wordCount: 154 },
      { id: "v1", label: "v1.0", date: "2026-05-22T09:00:00Z", author: "Maya", note: "Initial draft", wordCount: 198 },
    ],
  },
  {
    id: "prisma-devrel-eng",
    title: "Prisma · Developer Experience Engineer",
    company: "Prisma",
    companyLogo: "from-cyan-500 to-blue-500",
    role: "Developer Experience Engineer",
    jobId: "PRI-3301",
    applicationId: "APP-2044",
    resumeVersion: "Frontend · v3.1",
    resumeId: "frontend-senior-v3",
    status: "draft",
    starred: false,
    wordCount: 128,
    editedAt: "2026-06-30T20:11:00Z",
    createdAt: "2026-06-30T15:00:00Z",
    tone: "Warm",
    tags: ["New"],
    body: `Hi Prisma team,\n\n(Just started this one — will finish tonight. Anchor on the Rust query engine work and the recent Accelerate launch.)\n\nMaya`,
    versions: [
      { id: "v1", label: "v1.0", date: "2026-06-30T20:11:00Z", author: "Maya", note: "Initial draft", wordCount: 128 },
    ],
  },
];

export function getLetter(id: string) {
  return COVER_LETTERS.find((l) => l.id === id);
}
