import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  MoreHorizontal,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  User,
  Flag,
  StickyNote,
  X,
  Plus,
  Bookmark,
  BookmarkPlus,
  Download,
  Trash2,
  Archive,
  CheckSquare,
  Square,
  ExternalLink,
  Mail,
  Phone,
  Video,
  Clock,
  MessageSquare,
  Link2,
  Paperclip,
  GitBranch,
  ChevronDown,
  SlidersHorizontal,
  Edit3,
  Copy,
  Sparkles,
  TrendingUp,
  Briefcase,
  Users,
  Globe,
  CalendarClock,
  Send,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Badge } from "@/components/app/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications — DevTrack" },
      { name: "description", content: "Every application, every stage, one command center." },
    ],
  }),
  component: ApplicationsPage,
});

/* ============ Data ============ */

type Status =
  | "Wishlist"
  | "Preparing"
  | "Applied"
  | "Assessment"
  | "Interview"
  | "Final Round"
  | "Offer"
  | "Rejected"
  | "Archived";

type Priority = "P0" | "P1" | "P2" | "P3";

type Application = {
  id: string;
  company: string;
  logo: string;
  role: string;
  location: string;
  remote: "Remote" | "Hybrid" | "Onsite";
  salaryMin: number;
  salaryMax: number;
  equity?: string;
  applied: string; // ISO
  status: Status;
  stage?: string;
  resume: string;
  recruiter: {
    name: string;
    email: string;
    initials: string;
  };
  priority: Priority;
  starred: boolean;
  notes: string;
  jdUrl: string;
  tags: string[];
  timeline: { at: string; kind: string; text: string }[];
  contacts: { name: string; role: string; initials: string }[];
  interviews: { round: string; when: string; interviewer: string; type: string }[];
};

const APPS: Application[] = [
  {
    id: "APP-241",
    company: "Vercel",
    logo: "V",
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    remote: "Remote",
    salaryMin: 210,
    salaryMax: 260,
    equity: "0.05 – 0.12%",
    applied: "2026-06-14",
    status: "Final Round",
    stage: "System Design",
    resume: "Frontend — Product-focused v3.2",
    recruiter: { name: "Guillermo Rauch", email: "guillermo@vercel.com", initials: "GR" },
    priority: "P0",
    starred: true,
    notes: "Team is building the next-gen router. Focus: RSC, edge streaming, DX. Hiring manager values portfolio-quality work.",
    jdUrl: "vercel.com/careers/senior-frontend",
    tags: ["React", "Edge", "TypeScript"],
    timeline: [
      { at: "2h ago", kind: "interview", text: "Onsite scheduled for Jul 8" },
      { at: "1d ago", kind: "message", text: "Guillermo confirmed panel members" },
      { at: "5d ago", kind: "call", text: "Recruiter screen (30m) — moved forward" },
      { at: "17d ago", kind: "applied", text: "Applied via referral from @rauchg" },
    ],
    contacts: [
      { name: "Guillermo Rauch", role: "Recruiter", initials: "GR" },
      { name: "Lee Robinson", role: "Hiring Manager", initials: "LR" },
      { name: "Delba de Oliveira", role: "Peer Interviewer", initials: "DO" },
    ],
    interviews: [
      { round: "Recruiter Screen", when: "Jun 20 · Done", interviewer: "Guillermo Rauch", type: "Phone" },
      { round: "Technical Phone", when: "Jun 25 · Done", interviewer: "Lee Robinson", type: "Coding" },
      { round: "System Design", when: "Jul 2 · 2:00 PM PT", interviewer: "Delba de Oliveira", type: "Video" },
      { round: "Onsite Panel", when: "Jul 8 · 10:00 AM PT", interviewer: "4 rounds", type: "Onsite" },
    ],
  },
  {
    id: "APP-238",
    company: "Stripe",
    logo: "S",
    role: "Staff Engineer, Payments",
    location: "South San Francisco, CA",
    remote: "Hybrid",
    salaryMin: 265,
    salaryMax: 340,
    equity: "0.02 – 0.08%",
    applied: "2026-06-08",
    status: "Interview",
    stage: "Coding Round 2",
    resume: "Staff/Platform Engineer v2.7",
    recruiter: { name: "Priya Mehta", email: "priya@stripe.com", initials: "PM" },
    priority: "P0",
    starred: true,
    notes: "Payments infra team. Go + Ruby. Reliability, latency, and money-safety are the north stars. Ask about oncall load.",
    jdUrl: "stripe.com/jobs/listing/staff-eng-payments",
    tags: ["Go", "Distributed", "Payments"],
    timeline: [
      { at: "1h ago", kind: "message", text: "Priya: 'Excited to move you forward'" },
      { at: "3d ago", kind: "interview", text: "Coding round 1 — passed" },
      { at: "10d ago", kind: "call", text: "Hiring manager chat (45m)" },
    ],
    contacts: [
      { name: "Priya Mehta", role: "Recruiter", initials: "PM" },
      { name: "David Singleton", role: "Hiring Manager", initials: "DS" },
    ],
    interviews: [
      { round: "Recruiter Screen", when: "Jun 12 · Done", interviewer: "Priya Mehta", type: "Phone" },
      { round: "HM Chat", when: "Jun 18 · Done", interviewer: "David Singleton", type: "Video" },
      { round: "Coding 1", when: "Jun 26 · Done", interviewer: "Anna Patel", type: "Coding" },
      { round: "Coding 2", when: "Jul 3 · 10:00 AM PT", interviewer: "Marcus Yee", type: "Coding" },
    ],
  },
  {
    id: "APP-237",
    company: "Linear",
    logo: "L",
    role: "Product Engineer",
    location: "Remote (Americas)",
    remote: "Remote",
    salaryMin: 190,
    salaryMax: 240,
    equity: "0.08 – 0.18%",
    applied: "2026-06-05",
    status: "Interview",
    stage: "Take-home Review",
    resume: "Frontend — Product-focused v3.2",
    recruiter: { name: "Karri Saarinen", email: "karri@linear.app", initials: "KS" },
    priority: "P1",
    starred: true,
    notes: "Design-driven engineering culture. Take-home was tight — pixel-perfect issue list with realtime updates. Awaiting review.",
    jdUrl: "linear.app/careers/product-engineer",
    tags: ["React", "GraphQL", "Realtime"],
    timeline: [
      { at: "4h ago", kind: "message", text: "Karri: 'Team was impressed with take-home'" },
      { at: "2d ago", kind: "applied", text: "Submitted take-home (7h)" },
    ],
    contacts: [
      { name: "Karri Saarinen", role: "Co-founder", initials: "KS" },
      { name: "Tuomas Artman", role: "CTO", initials: "TA" },
    ],
    interviews: [
      { round: "Intro Chat", when: "Jun 10 · Done", interviewer: "Karri Saarinen", type: "Video" },
      { round: "Take-home", when: "Jun 28 · Submitted", interviewer: "Async", type: "Coding" },
      { round: "Final Panel", when: "Jul 4 · 11:30 AM PT", interviewer: "Tuomas Artman", type: "Video" },
    ],
  },
  {
    id: "APP-235",
    company: "Notion",
    logo: "N",
    role: "Senior Software Engineer",
    location: "New York, NY",
    remote: "Hybrid",
    salaryMin: 215,
    salaryMax: 270,
    equity: "0.03 – 0.09%",
    applied: "2026-05-22",
    status: "Offer",
    stage: "Verbal offer received",
    resume: "Frontend — Product-focused v3.2",
    recruiter: { name: "Ivan Zhao", email: "ivan@notion.so", initials: "IZ" },
    priority: "P0",
    starred: true,
    notes: "Offer: $215k base, $180k RSU/4y, $30k signing. Response due Jul 10. Negotiate up to $235k — Stripe as leverage.",
    jdUrl: "notion.so/careers/senior-swe",
    tags: ["React", "Rust", "Collaboration"],
    timeline: [
      { at: "1d ago", kind: "offer", text: "Verbal offer — $215k base + equity" },
      { at: "4d ago", kind: "interview", text: "Onsite complete (5 rounds)" },
    ],
    contacts: [{ name: "Ivan Zhao", role: "Recruiter", initials: "IZ" }],
    interviews: [
      { round: "Onsite Panel", when: "Jun 26 · Done", interviewer: "5 interviewers", type: "Onsite" },
      { round: "Team Match", when: "Jun 30 · Done", interviewer: "Ivan Zhao", type: "Video" },
    ],
  },
  {
    id: "APP-232",
    company: "Anthropic",
    logo: "A",
    role: "Product Engineer, Claude",
    location: "San Francisco, CA",
    remote: "Hybrid",
    salaryMin: 240,
    salaryMax: 310,
    equity: "0.02 – 0.06%",
    applied: "2026-05-18",
    status: "Assessment",
    stage: "Take-home in progress",
    resume: "Full-stack Generalist v1.9",
    recruiter: { name: "Rachel Ng", email: "rachel@anthropic.com", initials: "RN" },
    priority: "P1",
    starred: false,
    notes: "Take-home due Jul 3 — build a Claude playground with tool-use. Estimate 8 hours. Target quality > completeness.",
    jdUrl: "anthropic.com/jobs/product-eng-claude",
    tags: ["AI", "TypeScript", "Product"],
    timeline: [
      { at: "3d ago", kind: "assessment", text: "Take-home sent — due Jul 3" },
      { at: "9d ago", kind: "call", text: "Recruiter screen (30m)" },
    ],
    contacts: [{ name: "Rachel Ng", role: "Recruiter", initials: "RN" }],
    interviews: [
      { round: "Recruiter Screen", when: "Jun 22 · Done", interviewer: "Rachel Ng", type: "Phone" },
      { round: "Take-home", when: "Due Jul 3", interviewer: "Async", type: "Coding" },
    ],
  },
  {
    id: "APP-229",
    company: "Figma",
    logo: "F",
    role: "Senior Frontend Engineer, Multiplayer",
    location: "San Francisco, CA",
    remote: "Hybrid",
    salaryMin: 220,
    salaryMax: 285,
    applied: "2026-05-12",
    status: "Applied",
    resume: "Frontend — Product-focused v3.2",
    recruiter: { name: "Dylan Field", email: "dylan@figma.com", initials: "DF" },
    priority: "P1",
    starred: false,
    notes: "CRDTs, WebSockets, canvas performance. Referral from ex-colleague pending.",
    jdUrl: "figma.com/careers/senior-frontend",
    tags: ["React", "Canvas", "CRDT"],
    timeline: [{ at: "20d ago", kind: "applied", text: "Applied via careers page" }],
    contacts: [{ name: "Dylan Field", role: "Recruiter", initials: "DF" }],
    interviews: [],
  },
  {
    id: "APP-228",
    company: "Datadog",
    logo: "D",
    role: "Senior Software Engineer, APM",
    location: "New York, NY",
    remote: "Hybrid",
    salaryMin: 195,
    salaryMax: 245,
    applied: "2026-05-04",
    status: "Rejected",
    stage: "Rejected after final",
    resume: "Staff/Platform Engineer v2.7",
    recruiter: { name: "Olivier Pomel", email: "olivier@datadog.com", initials: "OP" },
    priority: "P2",
    starred: false,
    notes: "Rejection reason: 'not a fit at this level'. Feedback: strong coding, needed more distributed systems depth.",
    jdUrl: "datadog.com/careers/senior-swe-apm",
    tags: ["Go", "Observability"],
    timeline: [
      { at: "3d ago", kind: "rejected", text: "Not moving forward" },
      { at: "12d ago", kind: "interview", text: "Onsite (4 rounds)" },
    ],
    contacts: [{ name: "Olivier Pomel", role: "Recruiter", initials: "OP" }],
    interviews: [{ round: "Onsite Panel", when: "Jun 18 · Done", interviewer: "4 rounds", type: "Onsite" }],
  },
  {
    id: "APP-225",
    company: "Ramp",
    logo: "R",
    role: "Full-stack Engineer",
    location: "New York, NY",
    remote: "Hybrid",
    salaryMin: 200,
    salaryMax: 255,
    applied: "2026-04-28",
    status: "Preparing",
    resume: "Full-stack Generalist v1.9",
    recruiter: { name: "Eric Glyman", email: "eric@ramp.com", initials: "EG" },
    priority: "P2",
    starred: false,
    notes: "Referral being submitted next week. Prep: read Ramp engineering blog, review card issuance API design.",
    jdUrl: "ramp.com/careers/fullstack",
    tags: ["React", "Node", "Fintech"],
    timeline: [{ at: "5d ago", kind: "note", text: "Added to prep queue" }],
    contacts: [],
    interviews: [],
  },
  {
    id: "APP-223",
    company: "Shopify",
    logo: "S",
    role: "Senior React Native Engineer",
    location: "Remote (Global)",
    remote: "Remote",
    salaryMin: 185,
    salaryMax: 235,
    applied: "2026-04-20",
    status: "Wishlist",
    resume: "Frontend — Product-focused v3.2",
    recruiter: { name: "Tobi Lütke", email: "tobi@shopify.com", initials: "TL" },
    priority: "P3",
    starred: false,
    notes: "Interesting for mobile focus. Waiting on Q3 hiring reopen.",
    jdUrl: "shopify.com/careers/rn-eng",
    tags: ["React Native", "Ruby"],
    timeline: [{ at: "2mo ago", kind: "note", text: "Saved to wishlist" }],
    contacts: [],
    interviews: [],
  },
  {
    id: "APP-220",
    company: "OpenAI",
    logo: "O",
    role: "Member of Technical Staff, Applied",
    location: "San Francisco, CA",
    remote: "Onsite",
    salaryMin: 300,
    salaryMax: 450,
    equity: "PPU units",
    applied: "2026-04-10",
    status: "Interview",
    stage: "Coding Round",
    resume: "Staff/Platform Engineer v2.7",
    recruiter: { name: "Sam Altman", email: "sam@openai.com", initials: "SA" },
    priority: "P0",
    starred: true,
    notes: "Full onsite required. Highest comp band. Coding round focuses on eval infra.",
    jdUrl: "openai.com/careers/mts-applied",
    tags: ["Python", "AI Infra"],
    timeline: [
      { at: "1d ago", kind: "interview", text: "Coding round scheduled" },
      { at: "8d ago", kind: "call", text: "HM chat" },
    ],
    contacts: [{ name: "Sam Altman", role: "Recruiter", initials: "SA" }],
    interviews: [{ round: "Coding", when: "Jul 5 · 3:00 PM PT", interviewer: "TBD", type: "Coding" }],
  },
  {
    id: "APP-215",
    company: "Airbnb",
    logo: "A",
    role: "Senior Engineer, Trust",
    location: "Seattle, WA",
    remote: "Hybrid",
    salaryMin: 210,
    salaryMax: 265,
    applied: "2026-04-02",
    status: "Archived",
    resume: "Full-stack Generalist v1.9",
    recruiter: { name: "Brian Chesky", email: "brian@airbnb.com", initials: "BC" },
    priority: "P3",
    starred: false,
    notes: "Withdrew — team relocated to a different org.",
    jdUrl: "airbnb.com/careers/senior-trust",
    tags: ["Java", "Trust & Safety"],
    timeline: [{ at: "3w ago", kind: "note", text: "Withdrew application" }],
    contacts: [],
    interviews: [],
  },
];

/* ============ Config ============ */

const STATUS_ORDER: Status[] = [
  "Wishlist",
  "Preparing",
  "Applied",
  "Assessment",
  "Interview",
  "Final Round",
  "Offer",
  "Rejected",
  "Archived",
];

const STATUS_STYLES: Record<Status, { tone: string; dot: string }> = {
  Wishlist:     { tone: "bg-white/5 text-muted-foreground border-white/10",       dot: "bg-muted-foreground" },
  Preparing:    { tone: "bg-info/10 text-info border-info/20",                    dot: "bg-info" },
  Applied:      { tone: "bg-brand/10 text-brand border-brand/20",                 dot: "bg-brand" },
  Assessment:   { tone: "bg-warning/10 text-warning border-warning/20",           dot: "bg-warning" },
  Interview:    { tone: "bg-warning/15 text-warning border-warning/25",           dot: "bg-warning" },
  "Final Round":{ tone: "bg-brand/15 text-brand border-brand/25",                 dot: "bg-brand" },
  Offer:        { tone: "bg-success/15 text-success border-success/25",           dot: "bg-success" },
  Rejected:     { tone: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
  Archived:     { tone: "bg-white/[0.03] text-muted-foreground/70 border-white/5",  dot: "bg-muted-foreground/50" },
};

const PRIORITY_STYLES: Record<Priority, { color: string; label: string }> = {
  P0: { color: "text-destructive", label: "Urgent" },
  P1: { color: "text-warning", label: "High" },
  P2: { color: "text-info", label: "Medium" },
  P3: { color: "text-muted-foreground", label: "Low" },
};

const SAVED_FILTERS = [
  { name: "Active pipeline", icon: TrendingUp, count: 6 },
  { name: "This week's interviews", icon: CalendarClock, count: 3 },
  { name: "Remote only", icon: Globe, count: 4 },
  { name: "$250k+", icon: DollarSign, count: 5 },
  { name: "Priority P0", icon: Flag, count: 4 },
];

type SortKey = "applied" | "company" | "salary" | "priority" | "status";
type SortDir = "asc" | "desc";

/* ============ Page ============ */

function ApplicationsPage() {
  const [tab, setTab] = useState<"All" | Status>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("applied");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeSaved, setActiveSaved] = useState<string | null>("Active pipeline");
  const [filters, setFilters] = useState({
    remote: [] as string[],
    priority: [] as Priority[],
    salaryMin: 0,
  });

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: APPS.length };
    STATUS_ORDER.forEach((s) => (c[s] = APPS.filter((a) => a.status === s).length));
    return c;
  }, []);

  const filtered = useMemo(() => {
    let list = APPS.slice();
    if (tab !== "All") list = list.filter((a) => a.status === tab);
    if (activeSaved === "Active pipeline")
      list = list.filter((a) => !["Rejected", "Archived", "Wishlist"].includes(a.status));
    if (activeSaved === "Remote only") list = list.filter((a) => a.remote === "Remote");
    if (activeSaved === "$250k+") list = list.filter((a) => a.salaryMax >= 250);
    if (activeSaved === "Priority P0") list = list.filter((a) => a.priority === "P0");
    if (activeSaved === "This week's interviews")
      list = list.filter((a) => ["Interview", "Final Round"].includes(a.status));
    if (filters.remote.length) list = list.filter((a) => filters.remote.includes(a.remote));
    if (filters.priority.length) list = list.filter((a) => filters.priority.includes(a.priority));
    if (filters.salaryMin) list = list.filter((a) => a.salaryMax >= filters.salaryMin);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.recruiter.name.toLowerCase().includes(q) ||
          a.tags.join(" ").toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "applied") cmp = a.applied.localeCompare(b.applied);
      if (sortKey === "company") cmp = a.company.localeCompare(b.company);
      if (sortKey === "salary") cmp = a.salaryMax - b.salaryMax;
      if (sortKey === "priority") cmp = a.priority.localeCompare(b.priority);
      if (sortKey === "status") cmp = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [tab, query, sortKey, sortDir, filters, activeSaved]);

  const openApp = openId ? APPS.find((a) => a.id === openId) ?? null : null;

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected((prev) =>
      prev.size === filtered.length ? new Set() : new Set(filtered.map((a) => a.id)),
    );

  const setSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <AppSidebar active="Applications" className="hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-8">
            {/* Header */}
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <div className="text-caption flex items-center gap-2">
                  <Briefcase className="size-3.5 text-brand" /> Pipeline
                </div>
                <h1 className="text-page mt-1.5">Applications</h1>
                <p className="text-subtitle mt-1">
                  {APPS.length} tracked · 6 active · 2 offers · 4.3% offer rate
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium hover:bg-white/10">
                  <Download className="size-3.5" /> Export CSV
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[13px] font-medium text-background transition-transform hover:scale-[1.02]">
                  <Plus className="size-3.5" /> New application
                </button>
              </div>
            </div>

            {/* Status tabs */}
            <div className="scrollbar-none -mx-1 mb-4 flex items-center gap-1 overflow-x-auto px-1">
              <TabButton
                label="All"
                count={counts.All}
                active={tab === "All"}
                onClick={() => setTab("All")}
              />
              {STATUS_ORDER.map((s) => (
                <TabButton
                  key={s}
                  label={s}
                  count={counts[s]}
                  active={tab === s}
                  onClick={() => setTab(s)}
                  dotClass={STATUS_STYLES[s].dot}
                />
              ))}
            </div>

            {/* Toolbar */}
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by company, role, recruiter, tag…"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-16 text-[13px] placeholder:text-muted-foreground/60 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
                <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  ⌘F
                </kbd>
              </div>
              <div className="flex items-center gap-2">
                <SortMenu sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                <button
                  onClick={() => setFiltersOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors",
                    filtersOpen
                      ? "border-brand/40 bg-brand/10 text-brand"
                      : "border-white/10 bg-white/5 hover:bg-white/10",
                  )}
                >
                  <SlidersHorizontal className="size-3.5" /> Filters
                  {(filters.remote.length || filters.priority.length || filters.salaryMin) > 0 && (
                    <span className="rounded-full bg-brand px-1.5 text-[10px] font-semibold text-brand-foreground">
                      {filters.remote.length + filters.priority.length + (filters.salaryMin ? 1 : 0)}
                    </span>
                  )}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium hover:bg-white/10">
                  <BookmarkPlus className="size-3.5" /> Save view
                </button>
              </div>
            </div>

            {/* Saved filter chips */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                Saved
              </span>
              {SAVED_FILTERS.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setActiveSaved(activeSaved === f.name ? null : f.name)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition-colors",
                    activeSaved === f.name
                      ? "border-brand/40 bg-brand/10 text-brand"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06]",
                  )}
                >
                  <f.icon className="size-3" />
                  {f.name}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-[10px]",
                      activeSaved === f.name ? "bg-brand/20 text-brand" : "bg-white/5 text-muted-foreground",
                    )}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Filter panel */}
            <AnimatePresence initial={false}>
              {filtersOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4 overflow-hidden"
                >
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bulk actions bar */}
            <AnimatePresence>
              {selected.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="mb-3 flex items-center justify-between rounded-xl border border-brand/30 bg-brand/5 px-4 py-2.5"
                >
                  <div className="flex items-center gap-3 text-[13px]">
                    <CheckSquare className="size-4 text-brand" />
                    <span className="font-medium">
                      {selected.size} selected
                    </span>
                    <button
                      onClick={() => setSelected(new Set())}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <BulkBtn icon={Edit3} label="Change status" />
                    <BulkBtn icon={Flag} label="Set priority" />
                    <BulkBtn icon={Archive} label="Archive" />
                    <BulkBtn icon={Download} label="Export" />
                    <BulkBtn icon={Trash2} label="Delete" danger />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-surface/60 shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px] text-[13px]">
                  <thead className="border-b border-white/5 bg-white/[0.02]">
                    <tr className="text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      <th className="w-10 py-3 pl-4">
                        <button
                          onClick={toggleAll}
                          className="grid size-4 place-items-center text-muted-foreground hover:text-foreground"
                        >
                          {selected.size === filtered.length && filtered.length > 0 ? (
                            <CheckSquare className="size-4 text-brand" />
                          ) : (
                            <Square className="size-4" />
                          )}
                        </button>
                      </th>
                      <th className="w-8 py-3"></th>
                      <SortHeader label="Company / Role" onClick={() => setSort("company")} active={sortKey === "company"} dir={sortDir} />
                      <th className="px-3 py-3">Location</th>
                      <SortHeader label="Salary" onClick={() => setSort("salary")} active={sortKey === "salary"} dir={sortDir} />
                      <SortHeader label="Applied" onClick={() => setSort("applied")} active={sortKey === "applied"} dir={sortDir} />
                      <SortHeader label="Status" onClick={() => setSort("status")} active={sortKey === "status"} dir={sortDir} />
                      <th className="px-3 py-3">Resume</th>
                      <th className="px-3 py-3">Recruiter</th>
                      <th className="px-3 py-3">Stage</th>
                      <SortHeader label="Pri" onClick={() => setSort("priority")} active={sortKey === "priority"} dir={sortDir} />
                      <th className="px-3 py-3">Notes</th>
                      <th className="w-12 py-3 pr-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, i) => (
                      <ApplicationRow
                        key={a.id}
                        app={a}
                        selected={selected.has(a.id)}
                        onSelect={() => toggleSelect(a.id)}
                        onOpen={() => setOpenId(a.id)}
                        index={i}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="grid place-items-center py-16 text-center">
                  <div className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Search className="size-5 text-muted-foreground" />
                  </div>
                  <div className="mt-4 text-[14px] font-medium">No applications match</div>
                  <div className="text-caption mt-1">Try clearing filters or the search term</div>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-white/5 px-4 py-3 text-[12px] text-muted-foreground">
                <div>
                  Showing <span className="text-foreground">{filtered.length}</span> of {APPS.length}
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/5">Prev</button>
                  <span className="px-2">1 / 1</span>
                  <button className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/5">Next</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Drawer */}
      <ApplicationDrawer app={openApp} onClose={() => setOpenId(null)} />
    </div>
  );
}

/* ============ Row ============ */

function ApplicationRow({
  app,
  selected,
  onSelect,
  onOpen,
  index,
}: {
  app: Application;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  index: number;
}) {
  const s = STATUS_STYLES[app.status];
  const p = PRIORITY_STYLES[app.priority];
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: Math.min(index * 0.02, 0.15) }}
      className={cn(
        "group cursor-pointer border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.02]",
        selected && "bg-brand/5",
      )}
      onClick={onOpen}
    >
      <td className="w-10 py-3 pl-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onSelect} className="grid size-4 place-items-center text-muted-foreground hover:text-foreground">
          {selected ? <CheckSquare className="size-4 text-brand" /> : <Square className="size-4" />}
        </button>
      </td>
      <td className="w-8 py-3" onClick={(e) => e.stopPropagation()}>
        <button className={cn("text-muted-foreground/60 transition-colors hover:text-warning", app.starred && "text-warning")}>
          <Star className={cn("size-3.5", app.starred && "fill-warning")} />
        </button>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02] text-[13px] font-semibold">
            {app.logo}
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium">{app.role}</div>
            <div className="text-caption mt-0.5 flex items-center gap-1.5">
              {app.company}
              <span className="text-muted-foreground/40">·</span>
              <span className="inline-flex items-center gap-1 rounded border border-white/10 px-1 py-px text-[10px] text-muted-foreground">
                {app.remote}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3" /> {app.location}
        </span>
      </td>
      <td className="px-3 py-3">
        <div className="font-mono text-[12px]">
          ${app.salaryMin}k–${app.salaryMax}k
        </div>
      </td>
      <td className="px-3 py-3 text-muted-foreground">
        <span className="font-mono text-[12px]">{formatDate(app.applied)}</span>
      </td>
      <td className="px-3 py-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
            s.tone,
          )}
        >
          <span className={cn("size-1.5 rounded-full", s.dot)} />
          {app.status}
        </span>
      </td>
      <td className="px-3 py-3">
        <div className="flex max-w-[160px] items-center gap-1.5 text-muted-foreground">
          <FileText className="size-3 shrink-0 text-brand" />
          <span className="truncate text-[12px]">{app.resume}</span>
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded-full bg-gradient-brand text-[10px] font-semibold text-background">
            {app.recruiter.initials}
          </div>
          <span className="truncate text-[12px] text-muted-foreground">{app.recruiter.name}</span>
        </div>
      </td>
      <td className="px-3 py-3 text-muted-foreground">
        <span className="text-[12px]">{app.stage ?? "—"}</span>
      </td>
      <td className="px-3 py-3">
        <span className={cn("inline-flex items-center gap-1 font-mono text-[11px] font-semibold", p.color)}>
          <Flag className="size-3" fill="currentColor" /> {app.priority}
        </span>
      </td>
      <td className="max-w-[220px] px-3 py-3">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <StickyNote className="size-3 shrink-0" />
          <span className="truncate text-[12px]">{app.notes}</span>
        </div>
      </td>
      <td className="w-12 py-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
        <button className="grid size-7 place-items-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-white/10 hover:text-foreground group-hover:opacity-100">
          <MoreHorizontal className="size-4" />
        </button>
      </td>
    </motion.tr>
  );
}

/* ============ Table sub-components ============ */

function SortHeader({
  label,
  onClick,
  active,
  dir,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
  dir: SortDir;
}) {
  return (
    <th className="px-3 py-3">
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-1 uppercase tracking-wider transition-colors",
          active ? "text-foreground" : "hover:text-foreground",
        )}
      >
        {label}
        {active ? (
          dir === "asc" ? (
            <ArrowUp className="size-3" />
          ) : (
            <ArrowDown className="size-3" />
          )
        ) : (
          <ArrowUpDown className="size-3 opacity-50" />
        )}
      </button>
    </th>
  );
}

function TabButton({
  label,
  count,
  active,
  onClick,
  dotClass,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  dotClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="tab-active"
          className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]"
          transition={{ duration: 0.2 }}
        />
      )}
      {dotClass && <span className={cn("size-1.5 rounded-full", dotClass)} />}
      {label}
      <span
        className={cn(
          "rounded-md px-1.5 py-0.5 text-[10px]",
          active ? "bg-white/10 text-foreground" : "bg-white/[0.04] text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function SortMenu({
  sortKey,
  sortDir,
  setSort,
}: {
  sortKey: SortKey;
  sortDir: SortDir;
  setSort: (k: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const items: { k: SortKey; label: string }[] = [
    { k: "applied", label: "Applied date" },
    { k: "company", label: "Company" },
    { k: "salary", label: "Salary" },
    { k: "priority", label: "Priority" },
    { k: "status", label: "Status" },
  ];
  const current = items.find((i) => i.k === sortKey)?.label;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium hover:bg-white/10"
      >
        <ArrowUpDown className="size-3.5" /> {current}
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <button
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full z-50 mt-1.5 w-48 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-surface-elevated/95 p-1.5 shadow-elevated backdrop-blur-xl"
            >
              {items.map((it) => (
                <button
                  key={it.k}
                  onClick={() => {
                    setSort(it.k);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] hover:bg-white/5"
                >
                  {it.label}
                  {sortKey === it.k && (
                    <span className="text-muted-foreground">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============ Filter panel ============ */

function FilterPanel({
  filters,
  setFilters,
}: {
  filters: { remote: string[]; priority: Priority[]; salaryMin: number };
  setFilters: React.Dispatch<
    React.SetStateAction<{ remote: string[]; priority: Priority[]; salaryMin: number }>
  >;
}) {
  const toggle = <T,>(arr: T[], v: T): T[] => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="rounded-xl border border-white/10 bg-surface/60 p-4">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            Work model
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Remote", "Hybrid", "Onsite"].map((r) => {
              const active = filters.remote.includes(r);
              return (
                <button
                  key={r}
                  onClick={() => setFilters((f) => ({ ...f, remote: toggle(f.remote, r) }))}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[12px] transition-colors",
                    active
                      ? "border-brand/40 bg-brand/10 text-brand"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06]",
                  )}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            Priority
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(["P0", "P1", "P2", "P3"] as Priority[]).map((p) => {
              const active = filters.priority.includes(p);
              return (
                <button
                  key={p}
                  onClick={() => setFilters((f) => ({ ...f, priority: toggle(f.priority, p) }))}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[12px] font-mono transition-colors",
                    active
                      ? "border-brand/40 bg-brand/10 text-brand"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06]",
                  )}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            <span>Min salary</span>
            <span className="font-mono text-brand">
              {filters.salaryMin ? `$${filters.salaryMin}k` : "Any"}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={400}
            step={25}
            value={filters.salaryMin}
            onChange={(e) => setFilters((f) => ({ ...f, salaryMin: Number(e.target.value) }))}
            className="w-full accent-brand"
          />
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground/60">
            <span>$0</span>
            <span>$100k</span>
            <span>$200k</span>
            <span>$300k</span>
            <span>$400k</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-3">
        <button
          onClick={() => setFilters({ remote: [], priority: [], salaryMin: 0 })}
          className="text-[12px] text-muted-foreground hover:text-foreground"
        >
          Reset
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-medium hover:bg-white/10">
          <Bookmark className="size-3" /> Save as view
        </button>
      </div>
    </div>
  );
}

function BulkBtn({
  icon: Icon,
  label,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors",
        danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground/80 hover:bg-white/10 hover:text-foreground",
      )}
    >
      <Icon className="size-3.5" /> {label}
    </button>
  );
}

/* ============ Drawer ============ */

function ApplicationDrawer({
  app,
  onClose,
}: {
  app: Application | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {app && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[720px] flex-col border-l border-white/10 bg-surface shadow-elevated"
          >
            <DrawerContent app={app} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerContent({ app, onClose }: { app: Application; onClose: () => void }) {
  const s = STATUS_STYLES[app.status];
  const p = PRIORITY_STYLES[app.priority];
  const [tab, setTab] = useState<"Overview" | "Interviews" | "Timeline" | "Notes">("Overview");

  return (
    <>
      {/* Header */}
      <div className="border-b border-white/5 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span className="font-mono">{app.id}</span>
            <span className="text-muted-foreground/40">·</span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase",
                p.color,
              )}
            >
              <Flag className="size-2.5" fill="currentColor" /> {app.priority}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <IconBtn icon={Copy} label="Copy link" />
            <IconBtn icon={Star} label="Star" active={app.starred} />
            <IconBtn icon={MoreHorizontal} label="More" />
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="grid size-14 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] text-2xl font-semibold">
            {app.logo}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xl font-semibold tracking-tight">{app.role}</div>
            <div className="text-caption mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <Building2 className="size-3" /> {app.company}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" /> {app.location}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span>{app.remote}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                  s.tone,
                )}
              >
                <span className={cn("size-1.5 rounded-full", s.dot)} /> {app.status}
              </span>
              {app.stage && <Badge tone="brand">{app.stage}</Badge>}
              {app.tags.map((t) => (
                <Badge key={t} tone="muted">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3 border-t border-white/5 pt-4">
          <Stat icon={DollarSign} label="Salary" value={`$${app.salaryMin}k–${app.salaryMax}k`} />
          <Stat icon={Sparkles} label="Equity" value={app.equity ?? "—"} />
          <Stat icon={Calendar} label="Applied" value={formatDate(app.applied)} />
          <Stat icon={CalendarClock} label="Age" value={`${daysAgo(app.applied)}d`} />
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground py-2 text-[13px] font-medium text-background hover:bg-foreground/90">
            <Edit3 className="size-3.5" /> Update status
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-[13px] font-medium hover:bg-white/10">
            <CalendarClock className="size-3.5" /> Log interview
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-[13px] font-medium hover:bg-white/10">
            <Send className="size-3.5" /> Follow up
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-white/5 px-6">
        {(["Overview", "Interviews", "Timeline", "Notes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative py-3 text-[13px] font-medium transition-colors",
              tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              "px-3",
            )}
          >
            {t}
            {tab === t && (
              <motion.span
                layoutId="drawer-tab"
                className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand"
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {tab === "Overview" && <OverviewTab app={app} />}
        {tab === "Interviews" && <InterviewsTab app={app} />}
        {tab === "Timeline" && <TimelineTab app={app} />}
        {tab === "Notes" && <NotesTab app={app} />}
      </div>
    </>
  );
}

function OverviewTab({ app }: { app: Application }) {
  return (
    <div className="space-y-6">
      <Section title="Recruiter" icon={User}>
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="grid size-10 place-items-center rounded-full bg-gradient-brand text-[13px] font-semibold text-background">
            {app.recruiter.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-medium">{app.recruiter.name}</div>
            <div className="text-caption mt-0.5">{app.recruiter.email}</div>
          </div>
          <div className="flex items-center gap-1">
            <IconBtn icon={Mail} label="Email" />
            <IconBtn icon={Phone} label="Call" />
            <IconBtn icon={MessageSquare} label="Message" />
          </div>
        </div>
      </Section>

      <Section title="Team & Contacts" icon={Users}>
        <div className="grid grid-cols-2 gap-2">
          {app.contacts.map((c) => (
            <div key={c.name} className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
              <div className="grid size-8 place-items-center rounded-full bg-white/5 text-[11px] font-semibold">
                {c.initials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-[12px] font-medium">{c.name}</div>
                <div className="text-caption">{c.role}</div>
              </div>
            </div>
          ))}
          {!app.contacts.length && <EmptyRow text="No contacts yet — add teammates you've spoken with." />}
        </div>
      </Section>

      <Section title="Resume used" icon={FileText}>
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5">
              <FileText className="size-4 text-brand" />
            </div>
            <div>
              <div className="text-[13px] font-medium">{app.resume}</div>
              <div className="text-caption mt-0.5">PDF · 2 pages · updated 6d ago</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <IconBtn icon={ExternalLink} label="Open" />
            <IconBtn icon={Download} label="Download" />
          </div>
        </div>
      </Section>

      <Section title="Links & attachments" icon={Paperclip}>
        <div className="space-y-2">
          <LinkRow icon={Link2} label="Job description" value={app.jdUrl} />
          <LinkRow icon={GitBranch} label="Portfolio project shared" value="github.com/aditi/rt-collab" />
          <LinkRow icon={FileText} label="Cover letter — Notion-style" value="cover_letter_v2.pdf" />
        </div>
      </Section>
    </div>
  );
}

function InterviewsTab({ app }: { app: Application }) {
  if (!app.interviews.length) return <EmptyRow text="No interviews scheduled yet." />;
  return (
    <ol className="space-y-3">
      {app.interviews.map((iv, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                {iv.type === "Video" ? (
                  <Video className="size-4" />
                ) : iv.type === "Phone" ? (
                  <Phone className="size-4" />
                ) : iv.type === "Onsite" ? (
                  <Users className="size-4" />
                ) : (
                  <FileText className="size-4" />
                )}
              </div>
              <div>
                <div className="text-[13px] font-semibold">{iv.round}</div>
                <div className="text-caption mt-0.5 flex items-center gap-1.5">
                  <Clock className="size-3" /> {iv.when}
                </div>
              </div>
            </div>
            <Badge tone="info">{iv.type}</Badge>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
            <div className="text-caption flex items-center gap-1.5">
              <User className="size-3" /> {iv.interviewer}
            </div>
            <button className="text-[12px] font-medium text-brand hover:underline">Prep notes →</button>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

function TimelineTab({ app }: { app: Application }) {
  return (
    <ul className="relative space-y-4">
      <span className="absolute left-[15px] top-2 bottom-2 w-px bg-white/5" aria-hidden />
      {app.timeline.map((t, i) => {
        const icon =
          t.kind === "offer"
            ? Sparkles
            : t.kind === "interview"
              ? CalendarClock
              : t.kind === "message"
                ? MessageSquare
                : t.kind === "call"
                  ? Phone
                  : t.kind === "rejected"
                    ? X
                    : t.kind === "assessment"
                      ? FileText
                      : Briefcase;
        const tone =
          t.kind === "offer"
            ? "text-success bg-success/10 border-success/20"
            : t.kind === "rejected"
              ? "text-destructive bg-destructive/10 border-destructive/20"
              : t.kind === "interview"
                ? "text-info bg-info/10 border-info/20"
                : "text-brand bg-brand/10 border-brand/20";
        const Icon = icon;
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative flex gap-3"
          >
            <div className={cn("z-10 grid size-8 shrink-0 place-items-center rounded-full border", tone)}>
              <Icon className="size-3.5" />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <div className="text-[13px]">{t.text}</div>
              <div className="text-caption mt-0.5">{t.at}</div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}

function NotesTab({ app }: { app: Application }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="mb-2 flex items-center gap-2 text-caption">
          <StickyNote className="size-3.5 text-brand" /> Personal notes
        </div>
        <p className="text-[13px] leading-relaxed text-foreground/85">{app.notes}</p>
      </div>
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="mb-3 flex items-center gap-2 text-caption">
          <MessageSquare className="size-3.5 text-brand" /> Add a note
        </div>
        <textarea
          rows={4}
          placeholder="Log a takeaway, question to ask, or negotiation lever…"
          className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[13px] placeholder:text-muted-foreground/60 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <div className="mt-2 flex items-center justify-end gap-2">
          <button className="text-[12px] text-muted-foreground hover:text-foreground">Cancel</button>
          <button className="rounded-lg bg-foreground px-3 py-1.5 text-[12px] font-medium text-background hover:bg-foreground/90">
            Save note
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ Drawer primitives ============ */

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
        <Icon className="size-3" /> {title}
      </div>
      {children}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-1.5 text-caption">
        <Icon className="size-3" /> {label}
      </div>
      <div className="mt-1 truncate font-mono text-[13px] font-semibold">{value}</div>
    </div>
  );
}

function IconBtn({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      aria-label={label}
      className={cn(
        "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground",
        active && "text-warning",
      )}
    >
      <Icon className={cn("size-3.5", active && "fill-warning")} />
    </button>
  );
}

function LinkRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <div className="grid size-8 place-items-center rounded-md bg-white/5">
        <Icon className="size-3.5 text-brand" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-medium">{label}</div>
        <div className="text-caption truncate">{value}</div>
      </div>
      <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground">
        <ExternalLink className="size-3.5" />
      </button>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-caption">
      {text}
    </div>
  );
}

/* ============ Utils ============ */

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function daysAgo(iso: string) {
  const then = new Date(iso + "T00:00:00Z").getTime();
  const now = new Date("2026-07-01T00:00:00Z").getTime();
  return Math.max(0, Math.round((now - then) / 86400000));
}
