import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  MapPin,
  Users,
  Briefcase,
  Building2,
  LayoutGrid,
  List,
  Columns3,
  Plus,
  Filter,
  ExternalLink,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Clock,
  StickyNote,
  CalendarClock,
  Globe,
  TrendingUp,
  X,
  MoreHorizontal,
  Bookmark,
  ChevronRight,
  Paperclip,
  CheckCircle2,
  Circle,
  GitBranch,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Badge } from "@/components/app/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "Companies — DevTrack" },
      {
        name: "description",
        content: "A private CRM for every company on your job search radar.",
      },
    ],
  }),
  component: CompaniesPage,
});

/* ============ Data ============ */

type AppStatus =
  | "Not started"
  | "Wishlist"
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Archived";

type Recruiter = {
  name: string;
  title: string;
  email: string;
  phone?: string;
  lastContact: string;
};

type Job = {
  title: string;
  team: string;
  location: string;
  salary: string;
  posted: string;
  saved?: boolean;
};

type TimelineEvent = {
  date: string;
  label: string;
  kind: "apply" | "interview" | "offer" | "message" | "note" | "reject";
};

type Document = { name: string; type: string; size: string; date: string };

type Company = {
  id: string;
  name: string;
  domain: string;
  logoBg: string; // gradient class
  logoText: string;
  industry: string;
  size: string;
  location: string;
  hq: string;
  founded: number;
  openRoles: number;
  favorite: boolean;
  status: AppStatus;
  hiringTimeline: string;
  fitScore: number;
  tags: string[];
  notes: string;
  recruiters: Recruiter[];
  jobs: Job[];
  timeline: TimelineEvent[];
  docs: Document[];
  interviews: {
    date: string;
    round: string;
    role: string;
    outcome: "Passed" | "Pending" | "Failed";
  }[];
};

const COMPANIES: Company[] = [
  {
    id: "stripe",
    name: "Stripe",
    domain: "stripe.com",
    logoBg: "from-indigo-500 to-violet-600",
    logoText: "St",
    industry: "Fintech / Payments",
    size: "8,000+",
    location: "San Francisco, CA",
    hq: "South San Francisco",
    founded: 2010,
    openRoles: 42,
    favorite: true,
    status: "Interviewing",
    hiringTimeline: "3–5 weeks",
    fitScore: 92,
    tags: ["Remote-friendly", "Series I", "TypeScript", "Ruby"],
    notes:
      "Referral from Priya. Team is Payments Infra, primarily Ruby/Go. Recruiter said process is 4 rounds + system design.",
    recruiters: [
      {
        name: "Priya Shah",
        title: "Staff Engineering Recruiter",
        email: "priya@stripe.com",
        phone: "+1 (415) 555-0134",
        lastContact: "2 days ago",
      },
      {
        name: "Marcus Chen",
        title: "Hiring Manager, Payments",
        email: "marcus@stripe.com",
        lastContact: "5 days ago",
      },
    ],
    jobs: [
      {
        title: "Senior Software Engineer, Payments",
        team: "Payments Infra",
        location: "Remote (US)",
        salary: "$210k – $290k",
        posted: "6d ago",
        saved: true,
      },
      {
        title: "Staff Engineer, Reliability",
        team: "Infra",
        location: "SF or Remote",
        salary: "$260k – $340k",
        posted: "12d ago",
      },
    ],
    timeline: [
      { date: "Jun 28", label: "Onsite scheduled for Jul 9", kind: "interview" },
      { date: "Jun 24", label: "Passed technical screen", kind: "interview" },
      { date: "Jun 18", label: "Recruiter intro call", kind: "message" },
      { date: "Jun 14", label: "Applied via referral", kind: "apply" },
    ],
    docs: [
      { name: "Resume_v4_Stripe.pdf", type: "PDF", size: "182 KB", date: "Jun 14" },
      { name: "Referral_email_Priya.eml", type: "Email", size: "12 KB", date: "Jun 13" },
    ],
    interviews: [
      { date: "Jun 24", round: "Technical Screen", role: "Sr. SWE", outcome: "Passed" },
      { date: "Jul 09", round: "Onsite (4 rounds)", role: "Sr. SWE", outcome: "Pending" },
    ],
  },
  {
    id: "vercel",
    name: "Vercel",
    domain: "vercel.com",
    logoBg: "from-zinc-100 to-zinc-300",
    logoText: "▲",
    industry: "Developer Tools",
    size: "500–1,000",
    location: "Remote-first",
    hq: "San Francisco, CA",
    founded: 2015,
    openRoles: 18,
    favorite: true,
    status: "Applied",
    hiringTimeline: "2–4 weeks",
    fitScore: 88,
    tags: ["Remote", "TypeScript", "Next.js", "Edge"],
    notes:
      "Cold applied through careers page. Cover letter emphasized OSS contributions to `swr` and `next-auth`.",
    recruiters: [
      {
        name: "Elena Ruiz",
        title: "Engineering Recruiter",
        email: "elena@vercel.com",
        lastContact: "1 day ago",
      },
    ],
    jobs: [
      {
        title: "Senior Frontend Engineer, Dashboard",
        team: "Product",
        location: "Remote",
        salary: "$190k – $250k",
        posted: "3d ago",
        saved: true,
      },
      {
        title: "Engineer, Edge Runtime",
        team: "Platform",
        location: "Remote",
        salary: "$210k – $270k",
        posted: "9d ago",
      },
      {
        title: "Developer Advocate",
        team: "DevRel",
        location: "Remote",
        salary: "$170k – $210k",
        posted: "1d ago",
      },
    ],
    timeline: [
      { date: "Jun 27", label: "Recruiter acknowledged application", kind: "message" },
      { date: "Jun 26", label: "Applied to Sr. Frontend Engineer", kind: "apply" },
      { date: "Jun 20", label: "Bookmarked role", kind: "note" },
    ],
    docs: [{ name: "Resume_v3_Vercel.pdf", type: "PDF", size: "176 KB", date: "Jun 26" }],
    interviews: [],
  },
  {
    id: "linear",
    name: "Linear",
    domain: "linear.app",
    logoBg: "from-violet-500 to-fuchsia-600",
    logoText: "Ln",
    industry: "Productivity SaaS",
    size: "100–250",
    location: "Remote (EU/US)",
    hq: "San Francisco, CA",
    founded: 2019,
    openRoles: 9,
    favorite: false,
    status: "Wishlist",
    hiringTimeline: "4–6 weeks",
    fitScore: 95,
    tags: ["Remote", "TypeScript", "GraphQL", "Design-forward"],
    notes:
      "Dream company. Waiting for a Sr. Product Engineer opening. Currently only hiring platform roles.",
    recruiters: [],
    jobs: [
      {
        title: "Platform Engineer, Sync",
        team: "Platform",
        location: "Remote",
        salary: "$200k – $260k",
        posted: "14d ago",
      },
    ],
    timeline: [
      { date: "Jun 12", label: "Added to wishlist", kind: "note" },
      { date: "Jun 12", label: "Bookmarked Platform Engineer role", kind: "note" },
    ],
    docs: [],
    interviews: [],
  },
  {
    id: "figma",
    name: "Figma",
    domain: "figma.com",
    logoBg: "from-rose-500 to-orange-500",
    logoText: "Fg",
    industry: "Design Tools",
    size: "1,000–5,000",
    location: "San Francisco, CA",
    hq: "San Francisco, CA",
    founded: 2012,
    openRoles: 27,
    favorite: false,
    status: "Interviewing",
    hiringTimeline: "5–7 weeks",
    fitScore: 84,
    tags: ["Hybrid", "C++", "TypeScript", "WebGL"],
    notes: "System design round scheduled. Focus areas: real-time collaboration & CRDTs.",
    recruiters: [
      {
        name: "Jordan Blake",
        title: "Senior Recruiter",
        email: "jordan@figma.com",
        lastContact: "Today",
      },
    ],
    jobs: [
      {
        title: "Senior Software Engineer, Multiplayer",
        team: "Multiplayer",
        location: "SF (Hybrid)",
        salary: "$220k – $300k",
        posted: "10d ago",
        saved: true,
      },
    ],
    timeline: [
      { date: "Jun 29", label: "System design round scheduled Jul 3", kind: "interview" },
      { date: "Jun 22", label: "Passed coding round", kind: "interview" },
      { date: "Jun 15", label: "Applied", kind: "apply" },
    ],
    docs: [{ name: "Resume_Figma.pdf", type: "PDF", size: "168 KB", date: "Jun 15" }],
    interviews: [
      { date: "Jun 22", round: "Coding", role: "Sr. SWE", outcome: "Passed" },
      { date: "Jul 03", round: "System Design", role: "Sr. SWE", outcome: "Pending" },
    ],
  },
  {
    id: "notion",
    name: "Notion",
    domain: "notion.so",
    logoBg: "from-neutral-200 to-neutral-400",
    logoText: "N",
    industry: "Productivity SaaS",
    size: "500–1,000",
    location: "San Francisco, CA",
    hq: "San Francisco, CA",
    founded: 2013,
    openRoles: 14,
    favorite: true,
    status: "Offer",
    hiringTimeline: "Closed",
    fitScore: 90,
    tags: ["Hybrid", "TypeScript", "Rust", "AI"],
    notes: "Verbal offer received Jun 28. Waiting on written. Comp: $245k base, 0.08% equity.",
    recruiters: [
      {
        name: "Sam Patel",
        title: "Head of Talent",
        email: "sam@notion.so",
        phone: "+1 (415) 555-0199",
        lastContact: "Yesterday",
      },
    ],
    jobs: [
      {
        title: "Senior Product Engineer, AI",
        team: "AI",
        location: "SF (Hybrid)",
        salary: "$220k – $290k",
        posted: "closed",
      },
    ],
    timeline: [
      { date: "Jun 28", label: "Verbal offer extended", kind: "offer" },
      { date: "Jun 25", label: "Final round complete", kind: "interview" },
      { date: "Jun 18", label: "Onsite (5 rounds)", kind: "interview" },
      { date: "Jun 04", label: "Applied via referral", kind: "apply" },
    ],
    docs: [
      { name: "Offer_Notion_verbal.md", type: "Note", size: "4 KB", date: "Jun 28" },
      { name: "Resume_Notion.pdf", type: "PDF", size: "174 KB", date: "Jun 04" },
    ],
    interviews: [
      { date: "Jun 18", round: "Onsite", role: "Sr. Product Eng", outcome: "Passed" },
      { date: "Jun 25", round: "Final / Bar Raiser", role: "Sr. Product Eng", outcome: "Passed" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    domain: "openai.com",
    logoBg: "from-emerald-500 to-teal-600",
    logoText: "Oa",
    industry: "AI Research",
    size: "1,000–5,000",
    location: "San Francisco, CA",
    hq: "San Francisco, CA",
    founded: 2015,
    openRoles: 63,
    favorite: false,
    status: "Rejected",
    hiringTimeline: "6–8 weeks",
    fitScore: 72,
    tags: ["Hybrid", "Python", "PyTorch", "Research"],
    notes: "Rejected after phone screen. Feedback: not enough distributed training experience.",
    recruiters: [
      {
        name: "Alicia Wong",
        title: "Technical Recruiter",
        email: "alicia@openai.com",
        lastContact: "1 week ago",
      },
    ],
    jobs: [
      {
        title: "Member of Technical Staff, Infrastructure",
        team: "Infra",
        location: "SF (Hybrid)",
        salary: "$300k – $450k",
        posted: "closed",
      },
    ],
    timeline: [
      { date: "Jun 21", label: "Rejected after phone screen", kind: "reject" },
      { date: "Jun 17", label: "Phone screen", kind: "interview" },
      { date: "Jun 09", label: "Applied", kind: "apply" },
    ],
    docs: [{ name: "Resume_OpenAI.pdf", type: "PDF", size: "172 KB", date: "Jun 09" }],
    interviews: [{ date: "Jun 17", round: "Phone Screen", role: "MTS Infra", outcome: "Failed" }],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    domain: "anthropic.com",
    logoBg: "from-amber-500 to-orange-600",
    logoText: "An",
    industry: "AI Safety",
    size: "500–1,000",
    location: "San Francisco, CA",
    hq: "San Francisco, CA",
    founded: 2021,
    openRoles: 34,
    favorite: true,
    status: "Wishlist",
    hiringTimeline: "6–8 weeks",
    fitScore: 81,
    tags: ["Hybrid", "Python", "Rust", "Safety"],
    notes: "Applying next week after finishing side project on model evals.",
    recruiters: [],
    jobs: [
      {
        title: "Product Engineer, Claude",
        team: "Product",
        location: "SF (Hybrid)",
        salary: "$260k – $380k",
        posted: "4d ago",
        saved: true,
      },
    ],
    timeline: [{ date: "Jun 25", label: "Added to wishlist", kind: "note" }],
    docs: [],
    interviews: [],
  },
  {
    id: "supabase",
    name: "Supabase",
    domain: "supabase.com",
    logoBg: "from-emerald-400 to-green-600",
    logoText: "Sb",
    industry: "Developer Tools",
    size: "100–250",
    location: "Fully Remote",
    hq: "Distributed",
    founded: 2020,
    openRoles: 11,
    favorite: false,
    status: "Applied",
    hiringTimeline: "2–3 weeks",
    fitScore: 86,
    tags: ["Remote-only", "TypeScript", "Postgres", "Async"],
    notes: "Async-first process. Take-home instead of live coding.",
    recruiters: [
      {
        name: "Tom Harding",
        title: "Talent Partner",
        email: "tom@supabase.com",
        lastContact: "3 days ago",
      },
    ],
    jobs: [
      {
        title: "Full-Stack Engineer, Dashboard",
        team: "Studio",
        location: "Remote",
        salary: "$140k – $200k",
        posted: "5d ago",
      },
    ],
    timeline: [
      { date: "Jun 26", label: "Take-home sent", kind: "message" },
      { date: "Jun 23", label: "Applied", kind: "apply" },
    ],
    docs: [{ name: "Resume_Supabase.pdf", type: "PDF", size: "170 KB", date: "Jun 23" }],
    interviews: [],
  },
  {
    id: "shopify",
    name: "Shopify",
    domain: "shopify.com",
    logoBg: "from-lime-500 to-green-600",
    logoText: "Sh",
    industry: "E-commerce",
    size: "10,000+",
    location: "Remote (Canada)",
    hq: "Ottawa, Canada",
    founded: 2006,
    openRoles: 88,
    favorite: false,
    status: "Not started",
    hiringTimeline: "4–6 weeks",
    fitScore: 68,
    tags: ["Remote", "Ruby", "React"],
    notes: "",
    recruiters: [],
    jobs: [
      {
        title: "Senior Developer, Checkout",
        team: "Checkout",
        location: "Remote (CA/US)",
        salary: "$180k – $240k",
        posted: "2d ago",
      },
    ],
    timeline: [],
    docs: [],
    interviews: [],
  },
];

const STATUSES: AppStatus[] = [
  "Not started",
  "Wishlist",
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
  "Archived",
];

const statusStyles: Record<AppStatus, string> = {
  "Not started": "bg-white/5 text-muted-foreground border-white/10",
  Wishlist: "bg-info/10 text-info border-info/25",
  Applied: "bg-brand/10 text-brand border-brand/25",
  Interviewing: "bg-warning/10 text-warning border-warning/25",
  Offer: "bg-success/10 text-success border-success/25",
  Rejected: "bg-destructive/10 text-destructive border-destructive/25",
  Archived: "bg-white/5 text-muted-foreground border-white/10",
};

/* ============ Page ============ */

type View = "grid" | "list" | "kanban";

function CompaniesPage() {
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");
  const [favFilter, setFavFilter] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [companies, setCompanies] = useState(COMPANIES);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter((c) => {
      if (favFilter && !c.favorite) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [companies, query, favFilter]);

  const active = companies.find((c) => c.id === activeId) ?? null;

  const toggleFav = (id: string) =>
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
    );

  const totalOpen = companies.reduce((s, c) => s + c.openRoles, 0);
  const favCount = companies.filter((c) => c.favorite).length;
  const activeCount = companies.filter(
    (c) => c.status === "Applied" || c.status === "Interviewing" || c.status === "Offer",
  ).length;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar active="Companies" className="hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <main className="flex-1 px-6 py-8">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-eyebrow text-brand">Companies · CRM</div>
              <h1 className="text-page mt-1">Your target list</h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Every company you're courting, interviewing with, or watching from a distance —
                in one place, with the context that spreadsheets forget.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-muted-foreground hover:bg-white/10">
                <Filter className="size-3.5" /> Import from LinkedIn
              </button>
              <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90">
                <Plus className="size-3.5" /> Add company
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <SummaryStat
              icon={Building2}
              label="Tracked companies"
              value={companies.length}
              hint="+4 this month"
            />
            <SummaryStat
              icon={Briefcase}
              label="Open roles"
              value={totalOpen}
              hint="across pipeline"
            />
            <SummaryStat
              icon={TrendingUp}
              label="Active pipelines"
              value={activeCount}
              hint="Applied / Interviewing"
            />
            <SummaryStat
              icon={Star}
              label="Favorited"
              value={favCount}
              hint="dream companies"
            />
          </div>

          {/* Toolbar */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[260px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies, industries, tags…"
                className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-white/20"
              />
            </div>
            <button
              onClick={() => setFavFilter((v) => !v)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-xs transition",
                favFilter
                  ? "border-warning/30 bg-warning/10 text-warning"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/5",
              )}
            >
              <Star className={cn("size-3.5", favFilter && "fill-current")} /> Favorites
            </button>
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {(
                [
                  { k: "grid", icon: LayoutGrid, label: "Grid" },
                  { k: "list", icon: List, label: "List" },
                  { k: "kanban", icon: Columns3, label: "Kanban" },
                ] as const
              ).map(({ k, icon: Icon, label }) => (
                <button
                  key={k}
                  onClick={() => setView(k)}
                  className={cn(
                    "relative inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs transition",
                    view === k ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {view === k && (
                    <motion.span
                      layoutId="viewpill"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <Icon className="relative size-3.5" />
                  <span className="relative hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {view === "grid" && (
                <GridView items={filtered} onOpen={setActiveId} onFav={toggleFav} />
              )}
              {view === "list" && (
                <ListView items={filtered} onOpen={setActiveId} onFav={toggleFav} />
              )}
              {view === "kanban" && (
                <KanbanView items={filtered} onOpen={setActiveId} onFav={toggleFav} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {active && (
          <CompanyDrawer
            company={active}
            onClose={() => setActiveId(null)}
            onFav={() => toggleFav(active.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============ Summary ============ */

function SummaryStat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="text-caption text-muted-foreground">{label}</div>
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground">
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-0.5 text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}

/* ============ Logo ============ */

function Logo({ c, size = 40 }: { c: Company; size?: number }) {
  const isLight = c.logoBg.includes("zinc-100") || c.logoBg.includes("neutral");
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-gradient-to-br font-semibold shadow-lg",
        c.logoBg,
        isLight ? "text-black" : "text-white",
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {c.logoText}
    </div>
  );
}

/* ============ Grid View ============ */

function GridView({
  items,
  onOpen,
  onFav,
}: {
  items: Company[];
  onOpen: (id: string) => void;
  onFav: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.02, duration: 0.2, ease: "easeOut" }}
        >
          <CompanyCard c={c} onOpen={() => onOpen(c.id)} onFav={() => onFav(c.id)} />
        </motion.div>
      ))}
    </div>
  );
}

function CompanyCard({
  c,
  onOpen,
  onFav,
}: {
  c: Company;
  onOpen: () => void;
  onFav: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="group relative flex cursor-pointer flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Logo c={c} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-[15px] font-semibold">{c.name}</div>
              <span className="text-[11px] text-muted-foreground">{c.domain}</span>
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">{c.industry}</div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFav();
          }}
          className="rounded-lg p-1.5 text-muted-foreground opacity-70 hover:bg-white/5 hover:text-warning group-hover:opacity-100"
        >
          <Star className={cn("size-4", c.favorite && "fill-warning text-warning")} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" /> {c.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="size-3.5" /> {c.size}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="size-3.5" /> {c.openRoles} open roles
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock className="size-3.5" /> {c.hiringTimeline}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex h-6 items-center rounded-full border px-2 text-[11px] font-medium",
            statusStyles[c.status],
          )}
        >
          {c.status}
        </span>
        {c.recruiters.length > 0 && (
          <span className="inline-flex h-6 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 text-[11px] text-muted-foreground">
            <Users className="size-3" /> {c.recruiters.length} recruiter
            {c.recruiters.length > 1 ? "s" : ""}
          </span>
        )}
        <div className="ml-auto text-[11px] text-muted-foreground">Fit {c.fitScore}</div>
      </div>

      {c.notes && (
        <div className="mt-4 line-clamp-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-[12px] text-muted-foreground">
          <StickyNote className="mr-1 inline size-3 text-warning/80" />
          {c.notes}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.tags.slice(0, 3).map((t) => (
          <Badge key={t} tone="neutral">
            {t}
          </Badge>
        ))}
        {c.tags.length > 3 && (
          <span className="text-[11px] text-muted-foreground">+{c.tags.length - 3}</span>
        )}
      </div>
    </div>
  );
}

/* ============ List View ============ */

function ListView({
  items,
  onOpen,
  onFav,
}: {
  items: Company[];
  onOpen: (id: string) => void;
  onFav: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
      <div className="grid grid-cols-[minmax(200px,2fr)_1fr_1fr_120px_100px_140px_40px] items-center gap-4 border-b border-white/8 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <div>Company</div>
        <div>Industry</div>
        <div>Location</div>
        <div>Open</div>
        <div>Fit</div>
        <div>Status</div>
        <div />
      </div>
      <div className="divide-y divide-white/5">
        {items.map((c) => (
          <div
            key={c.id}
            onClick={() => onOpen(c.id)}
            className="grid cursor-pointer grid-cols-[minmax(200px,2fr)_1fr_1fr_120px_100px_140px_40px] items-center gap-4 px-5 py-3 text-sm transition hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFav(c.id);
                }}
                className="text-muted-foreground hover:text-warning"
              >
                <Star className={cn("size-4", c.favorite && "fill-warning text-warning")} />
              </button>
              <Logo c={c} size={32} />
              <div className="min-w-0">
                <div className="truncate font-medium">{c.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{c.domain}</div>
              </div>
            </div>
            <div className="truncate text-muted-foreground">{c.industry}</div>
            <div className="truncate text-muted-foreground">{c.location}</div>
            <div className="text-muted-foreground">
              <span className="font-medium text-foreground">{c.openRoles}</span> roles
            </div>
            <div>
              <FitBar value={c.fitScore} />
            </div>
            <div>
              <span
                className={cn(
                  "inline-flex h-6 items-center rounded-full border px-2 text-[11px] font-medium",
                  statusStyles[c.status],
                )}
              >
                {c.status}
              </span>
            </div>
            <div className="text-muted-foreground">
              <ChevronRight className="size-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FitBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5">
        <div
          className={cn(
            "h-full rounded-full",
            value >= 85 ? "bg-success" : value >= 70 ? "bg-warning" : "bg-destructive",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[11px] text-muted-foreground">{value}</span>
    </div>
  );
}

/* ============ Kanban View ============ */

function KanbanView({
  items,
  onOpen,
  onFav,
}: {
  items: Company[];
  onOpen: (id: string) => void;
  onFav: (id: string) => void;
}) {
  const cols = STATUSES.filter((s) => s !== "Archived");
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {cols.map((status) => {
        const cards = items.filter((c) => c.status === status);
        return (
          <div
            key={status}
            className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-3"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded-full border px-2 text-[10px] font-medium uppercase tracking-wider",
                    statusStyles[status],
                  )}
                >
                  {status}
                </span>
                <span className="text-xs text-muted-foreground">{cards.length}</span>
              </div>
              <button className="rounded-md p-1 text-muted-foreground hover:bg-white/5">
                <Plus className="size-3.5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {cards.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onOpen(c.id)}
                  className="cursor-pointer rounded-xl border border-white/8 bg-background/60 p-3 transition hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Logo c={c} size={28} />
                      <div className="text-sm font-medium">{c.name}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFav(c.id);
                      }}
                      className="text-muted-foreground hover:text-warning"
                    >
                      <Star
                        className={cn("size-3.5", c.favorite && "fill-warning text-warning")}
                      />
                    </button>
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">{c.industry}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="size-3" /> {c.openRoles}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3" /> {c.recruiters.length}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock className="size-3" /> {c.hiringTimeline}
                    </span>
                  </div>
                </div>
              ))}
              {cards.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/10 p-3 text-center text-[11px] text-muted-foreground">
                  Nothing here yet
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============ Drawer / Details ============ */

const drawerTabs = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "jobs", label: "Saved Jobs", icon: Bookmark },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "interviews", label: "Interviews", icon: MessageSquare },
  { id: "docs", label: "Documents", icon: FileText },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "notes", label: "Notes", icon: StickyNote },
] as const;

type TabId = (typeof drawerTabs)[number]["id"];

function CompanyDrawer({
  company,
  onClose,
  onFav,
}: {
  company: Company;
  onClose: () => void;
  onFav: () => void;
}) {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[760px] flex-col border-l border-white/8 bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/8 p-6">
          <div className="flex items-start gap-4">
            <Logo c={company} size={56} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight">{company.name}</h2>
                <a
                  href={`https://${company.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  {company.domain} <ExternalLink className="size-3" />
                </a>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {company.industry} · {company.size} · Founded {company.founded}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span
                  className={cn(
                    "inline-flex h-6 items-center rounded-full border px-2 text-[11px] font-medium",
                    statusStyles[company.status],
                  )}
                >
                  {company.status}
                </span>
                {company.tags.slice(0, 4).map((t) => (
                  <Badge key={t} tone="neutral">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onFav}
              className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-warning"
            >
              <Star className={cn("size-4", company.favorite && "fill-warning text-warning")} />
            </button>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-white/5">
              <MoreHorizontal className="size-4" />
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-white/5"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-px border-b border-white/8 bg-white/5">
          <QuickStat label="Open roles" value={company.openRoles.toString()} />
          <QuickStat label="Fit score" value={`${company.fitScore}`} />
          <QuickStat label="Recruiters" value={company.recruiters.length.toString()} />
          <QuickStat label="Timeline" value={company.hiringTimeline} />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-white/8 px-4">
          {drawerTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative inline-flex h-11 items-center gap-2 px-3 text-[13px] transition",
                tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="size-3.5" />
              {t.label}
              {tab === t.id && (
                <motion.span
                  layoutId="drawer-tab"
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {tab === "overview" && <OverviewTab c={company} />}
              {tab === "jobs" && <JobsTab c={company} />}
              {tab === "contacts" && <ContactsTab c={company} />}
              {tab === "interviews" && <InterviewsTab c={company} />}
              {tab === "docs" && <DocsTab c={company} />}
              {tab === "timeline" && <TimelineTab c={company} />}
              {tab === "notes" && <NotesTab c={company} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-4">
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function OverviewTab({ c }: { c: Company }) {
  return (
    <div>
      <Section title="About">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoRow icon={Globe} label="Website" value={c.domain} />
          <InfoRow icon={MapPin} label="Headquarters" value={c.hq} />
          <InfoRow icon={Users} label="Team size" value={c.size} />
          <InfoRow icon={CalendarClock} label="Founded" value={c.founded.toString()} />
          <InfoRow icon={Briefcase} label="Open roles" value={`${c.openRoles} active`} />
          <InfoRow icon={TrendingUp} label="Fit score" value={`${c.fitScore} / 100`} />
        </div>
      </Section>
      <Section title="Hiring timeline">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <CalendarClock className="size-4" />
            </div>
            <div>
              <div className="text-sm font-medium">Typical process: {c.hiringTimeline}</div>
              <div className="text-xs text-muted-foreground">
                Application → phone screen → technical → onsite → offer
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Tags">
        <div className="flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <Badge key={t} tone="neutral">
              {t}
            </Badge>
          ))}
        </div>
      </Section>
      <Section title="Recent activity">
        <TimelineList items={c.timeline.slice(0, 4)} />
      </Section>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Icon className="size-3" /> {label}
      </div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  );
}

function JobsTab({ c }: { c: Company }) {
  if (c.jobs.length === 0) return <Empty label="No saved jobs yet" />;
  return (
    <Section
      title={`Saved & open roles (${c.jobs.length})`}
      action={
        <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground">
          <Plus className="size-3" /> Add role
        </button>
      }
    >
      <div className="space-y-2">
        {c.jobs.map((j) => (
          <div
            key={j.title}
            className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:bg-white/[0.04]"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="truncate text-sm font-medium">{j.title}</div>
                {j.saved && (
                  <Bookmark className="size-3.5 fill-warning text-warning" />
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <GitBranch className="size-3" /> {j.team}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3" /> {j.location}
                </span>
                <span>{j.salary}</span>
                <span>· {j.posted}</span>
              </div>
            </div>
            <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground">
              <ExternalLink className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ContactsTab({ c }: { c: Company }) {
  if (c.recruiters.length === 0) return <Empty label="No recruiters or contacts yet" />;
  return (
    <Section
      title={`Contacts (${c.recruiters.length})`}
      action={
        <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground">
          <Plus className="size-3" /> Add contact
        </button>
      }
    >
      <div className="space-y-2">
        {c.recruiters.map((r) => (
          <div
            key={r.email}
            className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand/30 to-info/30 text-sm font-semibold">
                  {r.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-[11px] text-muted-foreground">{r.title}</div>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground">
                Last contact · {r.lastContact}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${r.email}`}
                className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 text-[11px] hover:bg-white/10"
              >
                <Mail className="size-3" /> {r.email}
              </a>
              {r.phone && (
                <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 text-[11px]">
                  <Phone className="size-3" /> {r.phone}
                </span>
              )}
              <button className="ml-auto inline-flex h-7 items-center gap-1.5 rounded-full bg-brand/15 px-3 text-[11px] text-brand hover:bg-brand/25">
                <MessageSquare className="size-3" /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function InterviewsTab({ c }: { c: Company }) {
  if (c.interviews.length === 0) return <Empty label="No interviews on record" />;
  return (
    <Section title={`Interview history (${c.interviews.length})`}>
      <div className="space-y-2">
        {c.interviews.map((iv, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex w-14 flex-col items-center rounded-lg border border-white/8 bg-background py-1.5">
                <span className="text-[10px] uppercase text-muted-foreground">
                  {iv.date.split(" ")[0]}
                </span>
                <span className="text-sm font-semibold">{iv.date.split(" ")[1]}</span>
              </div>
              <div>
                <div className="text-sm font-medium">{iv.round}</div>
                <div className="text-[11px] text-muted-foreground">{iv.role}</div>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex h-6 items-center rounded-full border px-2 text-[11px]",
                iv.outcome === "Passed" && "border-success/25 bg-success/10 text-success",
                iv.outcome === "Pending" && "border-warning/25 bg-warning/10 text-warning",
                iv.outcome === "Failed" &&
                  "border-destructive/25 bg-destructive/10 text-destructive",
              )}
            >
              {iv.outcome === "Passed" && <CheckCircle2 className="mr-1 size-3" />}
              {iv.outcome === "Pending" && <Circle className="mr-1 size-3" />}
              {iv.outcome}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function DocsTab({ c }: { c: Company }) {
  if (c.docs.length === 0) return <Empty label="No documents attached" />;
  return (
    <Section
      title={`Documents (${c.docs.length})`}
      action={
        <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground">
          <Paperclip className="size-3" /> Attach
        </button>
      }
    >
      <div className="space-y-2">
        {c.docs.map((d) => (
          <div
            key={d.name}
            className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-white/5">
                <FileText className="size-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {d.type} · {d.size} · {d.date}
                </div>
              </div>
            </div>
            <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground">
              <ExternalLink className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TimelineTab({ c }: { c: Company }) {
  if (c.timeline.length === 0) return <Empty label="No activity yet" />;
  return (
    <Section title="Full timeline">
      <TimelineList items={c.timeline} />
    </Section>
  );
}

const timelineIcon = {
  apply: Briefcase,
  interview: MessageSquare,
  offer: CheckCircle2,
  message: Mail,
  note: StickyNote,
  reject: X,
} as const;

const timelineTone = {
  apply: "text-brand bg-brand/10",
  interview: "text-warning bg-warning/10",
  offer: "text-success bg-success/10",
  message: "text-info bg-info/10",
  note: "text-muted-foreground bg-white/5",
  reject: "text-destructive bg-destructive/10",
} as const;

function TimelineList({ items }: { items: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-3 border-l border-white/8 pl-5">
      {items.map((e, i) => {
        const Icon = timelineIcon[e.kind];
        return (
          <li key={i} className="relative">
            <span
              className={cn(
                "absolute -left-[27px] flex size-5 items-center justify-center rounded-full ring-4 ring-background",
                timelineTone[e.kind],
              )}
            >
              <Icon className="size-3" />
            </span>
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm">{e.label}</div>
                <div className="text-[11px] text-muted-foreground">{e.date}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function NotesTab({ c }: { c: Company }) {
  const [text, setText] = useState(c.notes);
  return (
    <Section
      title="Notes"
      action={
        <span className="text-[11px] text-muted-foreground">
          Autosaved · {text.length} chars
        </span>
      }
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add context, referral names, comp details, why you're excited…"
        className="min-h-[220px] w-full resize-none rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-white/20"
      />
    </Section>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
