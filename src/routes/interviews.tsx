import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  CalendarDays,
  List as ListIcon,
  LayoutGrid,
  Clock,
  Video,
  Phone,
  MapPin,
  Building2,
  Users,
  User,
  Bell,
  BellRing,
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Code2,
  Network,
  MessageCircle,
  Briefcase,
  Star,
  FileText,
  ArrowRight,
  Coffee,
  Sparkles,
  Copy,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interviews")({
  head: () => ({
    meta: [
      { title: "Interviews · DevTrack" },
      {
        name: "description",
        content:
          "A calm, organized way to prepare for every round — calendar, timeline, prep checklists, and interviewer context in one place.",
      },
    ],
  }),
  component: InterviewsPage,
});

type InterviewType =
  | "Technical"
  | "System Design"
  | "Behavioral"
  | "HR"
  | "Manager";

type Interview = {
  id: string;
  company: string;
  companyLogo: string;
  role: string;
  round: number;
  totalRounds: number;
  type: InterviewType;
  date: string; // ISO
  durationMin: number;
  mode: "Video" | "Phone" | "Onsite";
  location: string;
  meetingLink?: string;
  recruiter: { name: string; email: string };
  interviewers: { name: string; role: string; avatar: string }[];
  prep: { text: string; done: boolean }[];
  notes: string;
  feedback?: string;
  nextStep?: string;
  reminder: "off" | "15m" | "1h" | "1d";
  status: "upcoming" | "completed" | "cancelled";
  outcome?: "advanced" | "pending" | "rejected" | "offer";
  priority: "high" | "medium" | "low";
};

const TYPE_META: Record<
  InterviewType,
  { icon: typeof Code2; cls: string; dot: string }
> = {
  Technical: { icon: Code2, cls: "text-brand bg-brand/10 border-brand/25", dot: "bg-brand" },
  "System Design": {
    icon: Network,
    cls: "text-info bg-info/10 border-info/25",
    dot: "bg-info",
  },
  Behavioral: {
    icon: MessageCircle,
    cls: "text-warning bg-warning/10 border-warning/25",
    dot: "bg-warning",
  },
  HR: {
    icon: Coffee,
    cls: "text-success bg-success/10 border-success/25",
    dot: "bg-success",
  },
  Manager: {
    icon: Briefcase,
    cls: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/25",
    dot: "bg-fuchsia-500",
  },
};

// Build dates relative to "now" so calendar always has content
const now = new Date();
function isoOffset(days: number, hour: number, min = 0) {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
}

const INTERVIEWS: Interview[] = [
  {
    id: "linear-r2",
    company: "Linear",
    companyLogo: "from-violet-500 to-fuchsia-500",
    role: "Staff Backend Engineer",
    round: 2,
    totalRounds: 4,
    type: "Technical",
    date: isoOffset(1, 10, 30),
    durationMin: 60,
    mode: "Video",
    location: "Google Meet",
    meetingLink: "https://meet.google.com/hxg-yqrs-vzn",
    recruiter: { name: "Erin Okafor", email: "erin@linear.app" },
    interviewers: [
      { name: "Priya Natarajan", role: "Staff Engineer, Sync", avatar: "PN" },
      { name: "Marcus Held", role: "Engineering Manager", avatar: "MH" },
    ],
    prep: [
      { text: "Review Linear's public API + GraphQL schema", done: true },
      { text: "Re-read the offline-first architecture blog post", done: true },
      { text: "Practice: design an issue graph with 10M nodes", done: false },
      { text: "Prepare 3 questions on their sync engine", done: false },
      { text: "Set up a distraction-free room 15m before", done: false },
    ],
    notes:
      "Priya wrote the recent sync-engine post. Marcus prefers depth over breadth — go slow, narrate tradeoffs.",
    reminder: "1h",
    status: "upcoming",
    priority: "high",
    nextStep: "System design round on Monday",
  },
  {
    id: "stripe-r1",
    company: "Stripe",
    companyLogo: "from-indigo-500 to-blue-500",
    role: "Senior Product Engineer, DevX",
    round: 1,
    totalRounds: 5,
    type: "HR",
    date: isoOffset(0, 15, 0),
    durationMin: 30,
    mode: "Phone",
    location: "Phone screen",
    recruiter: { name: "Devon Ryan", email: "devon@stripe.com" },
    interviewers: [{ name: "Devon Ryan", role: "Tech Recruiter", avatar: "DR" }],
    prep: [
      { text: "Rehearse 2-minute intro pitch", done: true },
      { text: "Salary anchor: $245k base, $80k equity/yr", done: true },
      { text: "Confirm remote-friendly team", done: false },
    ],
    notes: "Devon flagged that Stripe is looking for someone with strong CLI/tooling background.",
    reminder: "15m",
    status: "upcoming",
    priority: "high",
    nextStep: "Coding screen if this goes well",
  },
  {
    id: "vercel-r3",
    company: "Vercel",
    companyLogo: "from-neutral-800 to-neutral-500",
    role: "Staff Platform Engineer",
    round: 3,
    totalRounds: 4,
    type: "System Design",
    date: isoOffset(3, 13, 0),
    durationMin: 75,
    mode: "Video",
    location: "Zoom",
    meetingLink: "https://vercel.zoom.us/j/8829102201",
    recruiter: { name: "Sana Yildiz", email: "sana@vercel.com" },
    interviewers: [
      { name: "Guillermo Rauch", role: "CEO", avatar: "GR" },
      { name: "Malte Ubl", role: "CTO", avatar: "MU" },
      { name: "Lee Robinson", role: "VP DevEx", avatar: "LR" },
    ],
    prep: [
      { text: "Design: multi-region edge cache invalidation", done: true },
      { text: "Whiteboard: Durable Objects vs KV tradeoffs", done: true },
      { text: "Rehearse the Cloudflare migration story", done: true },
      { text: "Prepare a strong closing question for Guillermo", done: false },
    ],
    notes: "Panel round. Malte will push on failure modes — have concrete numbers ready.",
    reminder: "1d",
    status: "upcoming",
    priority: "high",
    nextStep: "Offer discussion + team match",
  },
  {
    id: "figma-r1",
    company: "Figma",
    companyLogo: "from-rose-500 to-orange-400",
    role: "Senior Frontend Engineer",
    round: 1,
    totalRounds: 4,
    type: "Behavioral",
    date: isoOffset(4, 11, 0),
    durationMin: 45,
    mode: "Video",
    location: "Google Meet",
    meetingLink: "https://meet.google.com/rzy-nnpt-ktw",
    recruiter: { name: "Alicia Wen", email: "alicia@figma.com" },
    interviewers: [{ name: "Sho Kuwamoto", role: "Head of Product Eng", avatar: "SK" }],
    prep: [
      { text: "3 STAR stories: conflict, ambiguity, ownership", done: false },
      { text: "Read Sho's essays on design tools", done: false },
    ],
    notes: "Sho tends to ask about failure — lead with the OSS project that stalled in 2024.",
    reminder: "1h",
    status: "upcoming",
    priority: "medium",
    nextStep: "Technical screen",
  },
  {
    id: "notion-r2",
    company: "Notion",
    companyLogo: "from-neutral-700 to-neutral-400",
    role: "Staff Engineer, Sync",
    round: 2,
    totalRounds: 4,
    type: "Manager",
    date: isoOffset(7, 14, 0),
    durationMin: 45,
    mode: "Video",
    location: "Zoom",
    meetingLink: "https://notion.zoom.us/j/2201938",
    recruiter: { name: "Kwame Boateng", email: "kwame@makenotion.com" },
    interviewers: [{ name: "Ivan Zhao", role: "CEO", avatar: "IZ" }],
    prep: [
      { text: "Read: 'Notion's philosophy of the personal computer'", done: false },
      { text: "Prepare a 3-year vision answer", done: false },
    ],
    notes: "Ivan asks philosophical questions. Take the pause. Answer slowly.",
    reminder: "1d",
    status: "upcoming",
    priority: "medium",
  },
  {
    id: "linear-r1",
    company: "Linear",
    companyLogo: "from-violet-500 to-fuchsia-500",
    role: "Staff Backend Engineer",
    round: 1,
    totalRounds: 4,
    type: "HR",
    date: isoOffset(-4, 10, 0),
    durationMin: 30,
    mode: "Phone",
    location: "Phone screen",
    recruiter: { name: "Erin Okafor", email: "erin@linear.app" },
    interviewers: [{ name: "Erin Okafor", role: "Recruiter", avatar: "EO" }],
    prep: [
      { text: "Confirm comp expectations", done: true },
      { text: "Ask about interview loop shape", done: true },
    ],
    notes: "Great chat. Erin will send technical prep doc by Monday.",
    feedback: "Positive. Erin advanced me to the technical round the same day.",
    reminder: "off",
    status: "completed",
    outcome: "advanced",
    priority: "high",
    nextStep: "Technical screen scheduled",
  },
  {
    id: "stripe-r0",
    company: "Stripe",
    companyLogo: "from-indigo-500 to-blue-500",
    role: "Senior Product Engineer, DevX",
    round: 0,
    totalRounds: 5,
    type: "HR",
    date: isoOffset(-6, 16, 0),
    durationMin: 20,
    mode: "Phone",
    location: "Phone screen",
    recruiter: { name: "Devon Ryan", email: "devon@stripe.com" },
    interviewers: [{ name: "Devon Ryan", role: "Tech Recruiter", avatar: "DR" }],
    prep: [{ text: "Refresh Stripe product timeline", done: true }],
    notes: "Warm intro from a former colleague. Devon confirmed remote is fine.",
    feedback: "Advanced to full HR screen this week.",
    reminder: "off",
    status: "completed",
    outcome: "advanced",
    priority: "high",
  },
  {
    id: "railway-r2",
    company: "Railway",
    companyLogo: "from-purple-500 to-pink-500",
    role: "Founding Engineer",
    round: 2,
    totalRounds: 3,
    type: "Technical",
    date: isoOffset(-10, 13, 0),
    durationMin: 60,
    mode: "Video",
    location: "Google Meet",
    recruiter: { name: "Jake Cooper", email: "jake@railway.app" },
    interviewers: [{ name: "Jake Cooper", role: "CEO", avatar: "JC" }],
    prep: [{ text: "Live coding warm-up", done: true }],
    notes: "Great chat but I withdrew after Linear moved to onsite.",
    feedback: "Withdrew — signaled I might revisit in Q4.",
    reminder: "off",
    status: "completed",
    outcome: "rejected",
    priority: "low",
  },
  {
    id: "anthropic-r1",
    company: "Anthropic",
    companyLogo: "from-amber-500 to-orange-500",
    role: "Research Engineer, Agents",
    round: 1,
    totalRounds: 5,
    type: "Technical",
    date: isoOffset(-14, 11, 0),
    durationMin: 90,
    mode: "Video",
    location: "Zoom",
    recruiter: { name: "Nia Patel", email: "nia@anthropic.com" },
    interviewers: [
      { name: "Chen Wu", role: "Research Engineer", avatar: "CW" },
      { name: "Karim Halabi", role: "Research Lead", avatar: "KH" },
    ],
    prep: [{ text: "Review eval harness paper", done: true }],
    notes: "Went deeper on eval infra than expected. Karim seemed enthusiastic.",
    feedback: "Advanced to system design round.",
    reminder: "off",
    status: "completed",
    outcome: "advanced",
    priority: "high",
  },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
function countdown(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff < 0) return "past";
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return `${Math.floor(diff / 60_000)}m`;
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

function InterviewsPage() {
  const [view, setView] = useState<"calendar" | "timeline" | "list">("calendar");
  const [tab, setTab] = useState<"upcoming" | "completed" | "all">("upcoming");
  const [q, setQ] = useState("");
  const [types, setTypes] = useState<Set<InterviewType>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);

  const filtered = useMemo(() => {
    return INTERVIEWS.filter((i) => {
      if (tab === "upcoming" && i.status !== "upcoming") return false;
      if (tab === "completed" && i.status !== "completed") return false;
      if (types.size && !types.has(i.type)) return false;
      if (q) {
        const s = q.toLowerCase();
        return (
          i.company.toLowerCase().includes(s) ||
          i.role.toLowerCase().includes(s) ||
          i.recruiter.name.toLowerCase().includes(s) ||
          i.interviewers.some((p) => p.name.toLowerCase().includes(s))
        );
      }
      return true;
    }).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [tab, q, types]);

  const stats = useMemo(() => {
    const upcoming = INTERVIEWS.filter((i) => i.status === "upcoming");
    const completed = INTERVIEWS.filter((i) => i.status === "completed");
    const nextUp = [...upcoming].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )[0];
    const advanced = completed.filter((i) => i.outcome === "advanced").length;
    return {
      upcoming: upcoming.length,
      completed: completed.length,
      advanceRate: completed.length
        ? Math.round((advanced / completed.length) * 100)
        : 0,
      nextUp,
    };
  }, []);

  const selected = INTERVIEWS.find((i) => i.id === selectedId) ?? null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <AppSidebar active="Interviews" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-8">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-caption text-brand">Pipeline · Interviews</div>
                <h1 className="mt-1 text-page tracking-tight">Interview room</h1>
                <p className="mt-1 max-w-xl text-[13px] text-muted-foreground">
                  Every round in one calm place — with prep checklists, interviewer
                  context, and quiet reminders so nothing sneaks up on you.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Bell className="size-3.5" /> Reminders
                </Button>
                <Button variant="brand" size="sm">
                  <Plus className="size-3.5" /> Schedule interview
                </Button>
              </div>
            </div>

            {/* Stat strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatTile
                icon={CalendarDays}
                label="Upcoming"
                value={stats.upcoming.toString()}
                hint={
                  stats.nextUp
                    ? `Next: ${stats.nextUp.company} · in ${countdown(stats.nextUp.date)}`
                    : "Nothing on the books"
                }
              />
              <StatTile
                icon={CheckCircle2}
                label="Completed"
                value={stats.completed.toString()}
                hint="Last 30 days"
              />
              <StatTile
                icon={Sparkles}
                label="Advance rate"
                value={`${stats.advanceRate}%`}
                hint="Rounds moved forward"
              />
              <StatTile
                icon={BellRing}
                label="Active reminders"
                value={INTERVIEWS.filter(
                  (i) => i.status === "upcoming" && i.reminder !== "off",
                ).length.toString()}
                hint="Email + push"
              />
            </div>

            {/* Toolbar */}
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-3 shadow-card lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative max-w-md flex-1">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by company, role, or interviewer…"
                    className="h-9 w-full rounded-lg border border-white/10 bg-background pl-8 pr-3 text-[13px] outline-none placeholder:text-muted-foreground/60 focus:border-brand/50"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {(Object.keys(TYPE_META) as InterviewType[]).map((t) => {
                    const active = types.has(t);
                    const meta = TYPE_META[t];
                    const Icon = meta.icon;
                    return (
                      <button
                        key={t}
                        onClick={() => {
                          const next = new Set(types);
                          next.has(t) ? next.delete(t) : next.add(t);
                          setTypes(next);
                        }}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-medium transition",
                          active
                            ? meta.cls
                            : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <Icon className="size-3" />
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-background p-0.5">
                <ViewToggle
                  active={view === "calendar"}
                  onClick={() => setView("calendar")}
                  icon={CalendarDays}
                  label="Calendar"
                />
                <ViewToggle
                  active={view === "timeline"}
                  onClick={() => setView("timeline")}
                  icon={LayoutGrid}
                  label="Timeline"
                />
                <ViewToggle
                  active={view === "list"}
                  onClick={() => setView("list")}
                  icon={ListIcon}
                  label="List"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex items-center gap-1 border-b border-white/5">
              {[
                { k: "upcoming", l: "Upcoming" },
                { k: "completed", l: "Completed" },
                { k: "all", l: "All" },
              ].map((t) => {
                const active = tab === t.k;
                return (
                  <button
                    key={t.k}
                    onClick={() => setTab(t.k as typeof tab)}
                    className={cn(
                      "relative px-3 py-2 text-[13px] font-medium transition",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.l}
                    {active && (
                      <motion.div
                        layoutId="int-tab-underline"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-brand"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* View body */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
              <div className="min-w-0">
                {view === "calendar" && (
                  <CalendarView
                    interviews={filtered}
                    monthOffset={monthOffset}
                    onNavigate={(d) => setMonthOffset((v) => v + d)}
                    onOpen={setSelectedId}
                  />
                )}
                {view === "timeline" && (
                  <TimelineView interviews={filtered} onOpen={setSelectedId} />
                )}
                {view === "list" && (
                  <ListView interviews={filtered} onOpen={setSelectedId} />
                )}
              </div>

              <SidePanel onOpen={setSelectedId} />
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selected && (
          <InterviewDrawer
            interview={selected}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Toolbar bits ---------- */

function StatTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-4 shadow-card">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
        <Icon className="size-3.5" />
      </div>
      <div className="mt-2 text-mono text-2xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 truncate text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}

function ViewToggle({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof CalendarDays;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-muted-foreground transition",
        active && "bg-white/10 text-foreground",
      )}
    >
      <Icon className="size-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function TypeChip({ type }: { type: InterviewType }) {
  const meta = TYPE_META[type];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
        meta.cls,
      )}
    >
      <Icon className="size-2.5" /> {type}
    </span>
  );
}

/* ---------- Calendar ---------- */

function CalendarView({
  interviews,
  monthOffset,
  onNavigate,
  onOpen,
}: {
  interviews: Interview[];
  monthOffset: number;
  onNavigate: (delta: number) => void;
  onOpen: (id: string) => void;
}) {
  const base = new Date();
  base.setDate(1);
  base.setMonth(base.getMonth() + monthOffset);
  const year = base.getFullYear();
  const month = base.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7) cells.push(null);

  const byDay = new Map<string, Interview[]>();
  for (const i of interviews) {
    const d = new Date(i.date);
    if (d.getFullYear() !== year || d.getMonth() !== month) continue;
    const k = d.toDateString();
    const arr = byDay.get(k) ?? [];
    arr.push(i);
    byDay.set(k, arr);
  }

  const today = new Date();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-[15px] font-semibold">
            {first.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
          <button
            onClick={() => onNavigate(0 - monthOffset)}
            className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate(-1)}
            className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => onNavigate(1)}
            className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="px-3 py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((d, idx) => {
          const isToday =
            d &&
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
          const events = d ? byDay.get(d.toDateString()) ?? [] : [];
          return (
            <div
              key={idx}
              className={cn(
                "flex min-h-[112px] flex-col border-b border-r border-white/5 p-1.5",
                !d && "bg-white/[0.01]",
                idx % 7 === 6 && "border-r-0",
              )}
            >
              {d && (
                <>
                  <div className="mb-1 flex items-center justify-between px-1">
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-full text-[11px] font-medium",
                        isToday
                          ? "bg-brand text-brand-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {d.getDate()}
                    </span>
                    {events.length > 0 && (
                      <span className="text-mono text-[9px] text-muted-foreground">
                        {events.length}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    {events.slice(0, 3).map((e) => {
                      const meta = TYPE_META[e.type];
                      return (
                        <button
                          key={e.id}
                          onClick={() => onOpen(e.id)}
                          className={cn(
                            "group flex items-center gap-1.5 truncate rounded-md border px-1.5 py-1 text-left text-[11px] transition hover:translate-x-0.5",
                            meta.cls,
                          )}
                        >
                          <span className="text-mono text-[9px] opacity-70">
                            {fmtTime(e.date).replace(/\s/g, "")}
                          </span>
                          <span className="truncate font-medium">{e.company}</span>
                        </button>
                      );
                    })}
                    {events.length > 3 && (
                      <span className="pl-1 text-[10px] text-muted-foreground">
                        +{events.length - 3} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Timeline ---------- */

function TimelineView({
  interviews,
  onOpen,
}: {
  interviews: Interview[];
  onOpen: (id: string) => void;
}) {
  const groups = new Map<string, Interview[]>();
  for (const i of interviews) {
    const k = new Date(i.date).toDateString();
    const arr = groups.get(k) ?? [];
    arr.push(i);
    groups.set(k, arr);
  }
  const days = Array.from(groups.keys());

  if (!days.length) return <EmptyState />;

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-card">
      <ol className="relative space-y-8 border-l border-white/10 pl-6">
        {days.map((day) => {
          const d = new Date(day);
          const isToday = d.toDateString() === new Date().toDateString();
          return (
            <li key={day}>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={cn(
                    "absolute -left-[7px] grid size-3.5 place-items-center rounded-full border-2 border-background",
                    isToday ? "bg-brand" : "bg-white/20",
                  )}
                />
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {isToday ? "Today · " : ""}
                  {d.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="space-y-2">
                {(groups.get(day) ?? []).map((i) => (
                  <TimelineRow key={i.id} interview={i} onOpen={onOpen} />
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function TimelineRow({
  interview: i,
  onOpen,
}: {
  interview: Interview;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onOpen(i.id)}
      className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition hover:border-brand/30 hover:bg-white/[0.04]"
    >
      <div className="w-20 shrink-0 text-mono text-[12px] text-muted-foreground">
        {fmtTime(i.date)}
        <div className="text-[10px] opacity-70">{i.durationMin}m</div>
      </div>
      <div
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[13px] font-bold text-white",
          i.companyLogo,
        )}
      >
        {i.company[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 truncate text-[14px] font-semibold">
          {i.company}
          <span className="text-muted-foreground/40">·</span>
          <span className="truncate text-muted-foreground">{i.role}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
          <TypeChip type={i.type} />
          <span>Round {i.round} of {i.totalRounds}</span>
          <span>·</span>
          <ModeBadge mode={i.mode} />
        </div>
      </div>
      <div className="hidden items-center -space-x-1.5 md:flex">
        {i.interviewers.slice(0, 3).map((p) => (
          <Avatar key={p.name} initials={p.avatar} />
        ))}
      </div>
      <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

/* ---------- List ---------- */

function ListView({
  interviews,
  onOpen,
}: {
  interviews: Interview[];
  onOpen: (id: string) => void;
}) {
  if (!interviews.length) return <EmptyState />;
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {interviews.map((i) => (
        <motion.button
          key={i.id}
          onClick={() => onOpen(i.id)}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-4 text-left shadow-card transition hover:border-brand/30 hover:shadow-elevated"
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[13px] font-bold text-white",
                i.companyLogo,
              )}
            >
              {i.company[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 truncate">
                <span className="truncate text-[14px] font-semibold">
                  {i.company}
                </span>
                {i.priority === "high" && (
                  <Star className="size-3 fill-warning text-warning" />
                )}
              </div>
              <div className="truncate text-[12px] text-muted-foreground">
                {i.role}
              </div>
            </div>
            <CountdownPill iso={i.date} status={i.status} outcome={i.outcome} />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <TypeChip type={i.type} />
            <span className="rounded-md border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-muted-foreground">
              Round {i.round}/{i.totalRounds}
            </span>
            <ModeBadge mode={i.mode} />
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2 text-[11px]">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                When
              </div>
              <div className="mt-0.5 truncate font-medium">
                {fmtDate(i.date)} · {fmtTime(i.date)}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Recruiter
              </div>
              <div className="mt-0.5 truncate font-medium">{i.recruiter.name}</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center -space-x-1.5">
              {i.interviewers.slice(0, 3).map((p) => (
                <Avatar key={p.name} initials={p.avatar} />
              ))}
              {i.interviewers.length > 3 && (
                <div className="grid size-6 place-items-center rounded-full border-2 border-background bg-white/10 text-[9px] font-semibold">
                  +{i.interviewers.length - 3}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <PrepProgress prep={i.prep} />
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-card/40 px-6 py-16 text-center">
      <div className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground">
        <CalendarDays className="size-5" />
      </div>
      <div className="text-[14px] font-semibold">Nothing here yet</div>
      <div className="max-w-sm text-[12px] text-muted-foreground">
        You'll see interviews here as they get scheduled. Try clearing your
        filters, or add one manually.
      </div>
    </div>
  );
}

/* ---------- Side panel ---------- */

function SidePanel({ onOpen }: { onOpen: (id: string) => void }) {
  const upcoming = INTERVIEWS.filter((i) => i.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  const typeCount = Object.keys(TYPE_META).map((t) => ({
    type: t as InterviewType,
    count: INTERVIEWS.filter((i) => i.type === t).length,
  }));

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-card p-4 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Next up
          </div>
          <span className="text-mono text-[10px] text-muted-foreground">
            {upcoming.length}
          </span>
        </div>
        <div className="space-y-2">
          {upcoming.map((i) => (
            <button
              key={i.id}
              onClick={() => onOpen(i.id)}
              className="group flex w-full items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2 text-left transition hover:border-brand/30 hover:bg-white/[0.04]"
            >
              <div
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-md bg-gradient-to-br text-[12px] font-bold text-white",
                  i.companyLogo,
                )}
              >
                {i.company[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium">{i.company}</div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {fmtDate(i.date)} · {fmtTime(i.date)}
                </div>
              </div>
              <span className="rounded-full border border-brand/25 bg-brand/10 px-1.5 py-0.5 text-mono text-[10px] font-semibold text-brand">
                {countdown(i.date)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-card p-4 shadow-card">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          By type
        </div>
        <div className="space-y-1.5">
          {typeCount.map(({ type, count }) => {
            const meta = TYPE_META[type];
            const Icon = meta.icon;
            const max = Math.max(...typeCount.map((t) => t.count), 1);
            return (
              <div key={type} className="flex items-center gap-2">
                <div className="flex w-32 items-center gap-1.5 text-[12px]">
                  <span className={cn("grid size-5 place-items-center rounded-md", meta.cls)}>
                    <Icon className="size-3" />
                  </span>
                  <span className="truncate">{type}</span>
                </div>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={cn("absolute inset-y-0 left-0 rounded-full", meta.dot)}
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </div>
                <span className="text-mono w-6 text-right text-[11px] text-muted-foreground">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 to-transparent p-4 shadow-card">
        <div className="flex items-start gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-brand/15 text-brand">
            <Bell className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold">Reminders are on</div>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">
              We'll ping you before every round — email, push, or both. Choose your
              lead time per interview.
            </p>
            <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-brand hover:underline">
              Manage defaults <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Drawer ---------- */

function InterviewDrawer({
  interview: i,
  onClose,
}: {
  interview: Interview;
  onClose: () => void;
}) {
  const [prep, setPrep] = useState(i.prep);
  const [reminder, setReminder] = useState(i.reminder);
  const [notes, setNotes] = useState(i.notes);
  const done = prep.filter((p) => p.done).length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[560px] flex-col border-l border-white/10 bg-surface shadow-elevated"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/5 p-5">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[15px] font-bold text-white",
                i.companyLogo,
              )}
            >
              {i.company[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="truncate text-[16px] font-semibold">{i.company}</div>
                <TypeChip type={i.type} />
              </div>
              <div className="truncate text-[13px] text-muted-foreground">
                {i.role}
              </div>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>Round {i.round} of {i.totalRounds}</span>
                <span>·</span>
                <span className="text-mono">{i.durationMin} min</span>
                {i.status === "upcoming" && (
                  <>
                    <span>·</span>
                    <span className="text-brand">in {countdown(i.date)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Actions row */}
          {i.meetingLink && (
            <div className="border-b border-white/5 p-4">
              <a
                href={i.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-brand/25 bg-gradient-to-r from-brand/15 to-transparent p-3 transition hover:border-brand/40"
              >
                <div className="grid size-9 place-items-center rounded-lg bg-brand/20 text-brand">
                  <Video className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold">Join {i.location}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {i.meetingLink}
                  </div>
                </div>
                <ExternalLink className="size-4 text-muted-foreground group-hover:text-brand" />
              </a>
            </div>
          )}

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-px border-b border-white/5 bg-white/[0.02]">
            <MetaCell icon={CalendarDays} label="Date">
              {fmtDate(i.date)}
            </MetaCell>
            <MetaCell icon={Clock} label="Time">
              {fmtTime(i.date)} · {i.durationMin}m
            </MetaCell>
            <MetaCell icon={ModeIcon(i.mode)} label="Mode">
              {i.mode}
            </MetaCell>
            <MetaCell icon={MapPin} label="Location">
              {i.location}
            </MetaCell>
          </div>

          {/* Recruiter + interviewers */}
          <Section title="People">
            <div className="space-y-2">
              <PersonRow
                name={i.recruiter.name}
                role="Recruiter"
                initials={i.recruiter.name.split(" ").map((n) => n[0]).join("")}
                meta={i.recruiter.email}
                tone="brand"
              />
              {i.interviewers.map((p) => (
                <PersonRow
                  key={p.name}
                  name={p.name}
                  role={p.role}
                  initials={p.avatar}
                  meta="View LinkedIn"
                />
              ))}
            </div>
          </Section>

          {/* Prep */}
          <Section
            title="Preparation checklist"
            right={
              <span className="text-mono text-[11px] text-muted-foreground">
                {done}/{prep.length}
              </span>
            }
          >
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={false}
                animate={{ width: `${(done / prep.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="h-full rounded-full bg-brand"
              />
            </div>
            <ul className="space-y-1">
              {prep.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      const next = [...prep];
                      next[idx] = { ...next[idx], done: !next[idx].done };
                      setPrep(next);
                    }}
                    className={cn(
                      "group flex w-full items-start gap-2.5 rounded-lg border border-transparent p-2 text-left transition hover:border-white/10 hover:bg-white/[0.03]",
                    )}
                  >
                    {item.done ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    ) : (
                      <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        "text-[13px]",
                        item.done && "text-muted-foreground line-through",
                      )}
                    >
                      {item.text}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* Reminder */}
          <Section title="Reminder">
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { v: "off", l: "Off" },
                  { v: "15m", l: "15 min before" },
                  { v: "1h", l: "1 hour before" },
                  { v: "1d", l: "1 day before" },
                ] as { v: Interview["reminder"]; l: string }[]
              ).map((r) => {
                const active = reminder === r.v;
                return (
                  <button
                    key={r.v}
                    onClick={() => setReminder(r.v)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition",
                      active
                        ? "border-brand/40 bg-brand/10 text-brand"
                        : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {r.v === "off" ? (
                      <Bell className="size-3" />
                    ) : (
                      <BellRing className="size-3" />
                    )}
                    {r.l}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11.5px] text-muted-foreground">
              {reminder === "off"
                ? "You won't be notified before this interview."
                : `You'll get a quiet nudge ${reminder === "15m" ? "15 minutes" : reminder === "1h" ? "an hour" : "a day"} before it starts.`}
            </p>
          </Section>

          {/* Notes */}
          <Section title="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-white/10 bg-background p-3 text-[13px] leading-relaxed outline-none placeholder:text-muted-foreground/60 focus:border-brand/40"
              placeholder="Anything worth remembering before the round…"
            />
          </Section>

          {/* Feedback / next step */}
          {(i.feedback || i.nextStep) && (
            <Section title="Outcome">
              {i.feedback && (
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Feedback
                  </div>
                  <p className="text-[13px] leading-relaxed">{i.feedback}</p>
                </div>
              )}
              {i.nextStep && (
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-brand/25 bg-brand/5 p-3">
                  <ArrowRight className="size-4 text-brand" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                      Next step
                    </div>
                    <div className="text-[13px]">{i.nextStep}</div>
                  </div>
                </div>
              )}
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-white/5 bg-surface/80 p-3">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <FileText className="size-3.5" /> Notes doc
            </Button>
            <Button variant="ghost" size="sm">
              <Copy className="size-3.5" /> Duplicate
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {i.status === "upcoming" ? (
              <>
                <Button variant="ghost" size="sm">
                  Reschedule
                </Button>
                <Button variant="brand" size="sm">
                  Mark as done
                </Button>
              </>
            ) : (
              <Button variant="brand" size="sm">
                Log follow-up
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

function Section({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/5 p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function MetaCell({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3" /> {label}
      </div>
      <div className="mt-1 text-[13px] font-medium">{children}</div>
    </div>
  );
}

function PersonRow({
  name,
  role,
  initials,
  meta,
  tone,
}: {
  name: string;
  role: string;
  initials: string;
  meta: string;
  tone?: "brand";
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
      <div
        className={cn(
          "grid size-8 place-items-center rounded-full text-[11px] font-semibold",
          tone === "brand"
            ? "bg-brand/15 text-brand"
            : "bg-white/10 text-foreground",
        )}
      >
        {initials.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium">{name}</div>
        <div className="truncate text-[11px] text-muted-foreground">{role}</div>
      </div>
      <span className="hidden text-[11px] text-muted-foreground sm:inline">
        {meta}
      </span>
    </div>
  );
}

/* ---------- Small bits ---------- */

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="grid size-6 place-items-center rounded-full border-2 border-background bg-white/10 text-[9px] font-semibold">
      {initials}
    </div>
  );
}

function ModeBadge({ mode }: { mode: Interview["mode"] }) {
  const Icon = ModeIcon(mode);
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-muted-foreground">
      <Icon className="size-2.5" /> {mode}
    </span>
  );
}

function ModeIcon(mode: Interview["mode"]) {
  return mode === "Video" ? Video : mode === "Phone" ? Phone : Building2;
}

function PrepProgress({ prep }: { prep: Interview["prep"] }) {
  const done = prep.filter((p) => p.done).length;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative h-1 w-16 overflow-hidden rounded-full bg-white/5">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-brand"
          style={{ width: `${(done / prep.length) * 100}%` }}
        />
      </span>
      <span className="text-mono">
        {done}/{prep.length} prep
      </span>
    </span>
  );
}

function CountdownPill({
  iso,
  status,
  outcome,
}: {
  iso: string;
  status: Interview["status"];
  outcome?: Interview["outcome"];
}) {
  if (status === "completed") {
    const tone =
      outcome === "advanced"
        ? "border-success/30 bg-success/10 text-success"
        : outcome === "rejected"
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-white/10 bg-white/5 text-muted-foreground";
    return (
      <span
        className={cn(
          "rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize",
          tone,
        )}
      >
        {outcome ?? "done"}
      </span>
    );
  }
  const c = countdown(iso);
  return (
    <span className="rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 text-mono text-[10px] font-semibold text-brand">
      in {c}
    </span>
  );
}

// keep icons referenced for tree-shake safety
void User;
void Users;
