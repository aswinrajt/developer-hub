import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  GitBranch,
  BarChart3,
  Flame,
  Trophy,
  Target,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Code2,
  Building2,
  Calendar,
  ChevronRight,
  X,
  Zap,
  TrendingUp,
  BookOpen,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/coding")({
  head: () => ({
    meta: [
      { title: "Coding Practice · DevTrack" },
      {
        name: "description",
        content:
          "Track algorithm practice across LeetCode, HackerRank, and Codeforces with deadlines, streaks, and completion analytics.",
      },
    ],
  }),
  component: CodingPage,
});

type Difficulty = "Easy" | "Medium" | "Hard";
type Status = "Backlog" | "In Progress" | "Review" | "Solved";
type Platform =
  | "LeetCode"
  | "HackerRank"
  | "Codeforces"
  | "AlgoExpert"
  | "NeetCode";

type Problem = {
  id: string;
  title: string;
  slug: string;
  platform: Platform;
  difficulty: Difficulty;
  status: Status;
  topic: string;
  languages: string[];
  companies: string[];
  deadline?: string; // ISO
  attempts: number;
  timeSpentMin: number;
  progress: number; // 0-100
  notes: string;
  starred?: boolean;
  solvedAt?: string;
};

// -------------------- Mock data --------------------
const PROBLEMS: Problem[] = [
  {
    id: "p1",
    title: "Two Sum",
    slug: "two-sum",
    platform: "LeetCode",
    difficulty: "Easy",
    status: "Solved",
    topic: "Hash Table",
    languages: ["TypeScript", "Python"],
    companies: ["Amazon", "Google", "Meta"],
    attempts: 1,
    timeSpentMin: 12,
    progress: 100,
    notes: "Hash map for O(n). Watch for duplicates in the input array.",
    starred: true,
    solvedAt: "2026-06-24",
  },
  {
    id: "p2",
    title: "LRU Cache",
    slug: "lru-cache",
    platform: "LeetCode",
    difficulty: "Medium",
    status: "In Progress",
    topic: "Design",
    languages: ["TypeScript"],
    companies: ["Stripe", "Uber", "Linear"],
    deadline: "2026-07-03",
    attempts: 2,
    timeSpentMin: 48,
    progress: 65,
    notes:
      "Doubly linked list + map. Extract move-to-front into a helper before final pass.",
    starred: true,
  },
  {
    id: "p3",
    title: "Design Rate Limiter",
    slug: "design-rate-limiter",
    platform: "AlgoExpert",
    difficulty: "Hard",
    status: "Review",
    topic: "System Design",
    languages: ["Go"],
    companies: ["Stripe", "Cloudflare"],
    deadline: "2026-07-05",
    attempts: 3,
    timeSpentMin: 92,
    progress: 80,
    notes:
      "Token bucket vs. sliding window. Draft README of tradeoffs before Stripe on-site.",
  },
  {
    id: "p4",
    title: "Word Ladder",
    slug: "word-ladder",
    platform: "LeetCode",
    difficulty: "Hard",
    status: "In Progress",
    topic: "Graphs · BFS",
    languages: ["Python"],
    companies: ["Amazon", "Meta"],
    deadline: "2026-07-08",
    attempts: 4,
    timeSpentMin: 110,
    progress: 45,
    notes: "Bidirectional BFS shaved 40% off runtime. Handle single-letter case.",
  },
  {
    id: "p5",
    title: "Median of Two Sorted Arrays",
    slug: "median-two-sorted",
    platform: "NeetCode",
    difficulty: "Hard",
    status: "Backlog",
    topic: "Binary Search",
    languages: ["TypeScript"],
    companies: ["Google", "Airbnb"],
    deadline: "2026-07-12",
    attempts: 0,
    timeSpentMin: 0,
    progress: 0,
    notes: "",
  },
  {
    id: "p6",
    title: "Number of Islands",
    slug: "number-of-islands",
    platform: "LeetCode",
    difficulty: "Medium",
    status: "Solved",
    topic: "Graphs · DFS",
    languages: ["Python", "TypeScript"],
    companies: ["Amazon", "Bloomberg"],
    attempts: 1,
    timeSpentMin: 22,
    progress: 100,
    notes: "Iterative DFS to avoid stack overflow on 1000×1000 grids.",
    solvedAt: "2026-06-22",
  },
  {
    id: "p7",
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    platform: "LeetCode",
    difficulty: "Hard",
    status: "Solved",
    topic: "Heap",
    languages: ["TypeScript"],
    companies: ["Meta", "Uber"],
    attempts: 2,
    timeSpentMin: 55,
    progress: 100,
    notes: "Min-heap with tuple comparator. Watch out for null pointers.",
    solvedAt: "2026-06-27",
    starred: true,
  },
  {
    id: "p8",
    title: "Longest Substring Without Repeating",
    slug: "longest-substring",
    platform: "LeetCode",
    difficulty: "Medium",
    status: "Solved",
    topic: "Sliding Window",
    languages: ["Python"],
    companies: ["Amazon", "Adobe"],
    attempts: 1,
    timeSpentMin: 18,
    progress: 100,
    notes: "Sliding window with last-seen index map.",
    solvedAt: "2026-06-19",
  },
  {
    id: "p9",
    title: "Coin Change",
    slug: "coin-change",
    platform: "NeetCode",
    difficulty: "Medium",
    status: "Review",
    topic: "Dynamic Programming",
    languages: ["Python"],
    companies: ["Google", "Stripe"],
    deadline: "2026-07-04",
    attempts: 2,
    timeSpentMin: 38,
    progress: 75,
    notes: "Bottom-up DP. Re-do without hints on Sunday.",
  },
  {
    id: "p10",
    title: "Redundant Connection II",
    slug: "redundant-connection-ii",
    platform: "LeetCode",
    difficulty: "Hard",
    status: "Backlog",
    topic: "Union Find",
    languages: ["TypeScript"],
    companies: ["Google"],
    deadline: "2026-07-15",
    attempts: 0,
    timeSpentMin: 0,
    progress: 0,
    notes: "",
  },
  {
    id: "p11",
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    platform: "LeetCode",
    difficulty: "Hard",
    status: "In Progress",
    topic: "Two Pointers",
    languages: ["Go"],
    companies: ["Amazon", "Meta"],
    deadline: "2026-07-06",
    attempts: 1,
    timeSpentMin: 34,
    progress: 55,
    notes: "Two-pointer trick clicks — revisit stack approach for depth.",
  },
  {
    id: "p12",
    title: "Round E — Problem C",
    slug: "round-e-c",
    platform: "Codeforces",
    difficulty: "Medium",
    status: "Solved",
    topic: "Greedy",
    languages: ["C++"],
    companies: [],
    attempts: 3,
    timeSpentMin: 65,
    progress: 100,
    notes: "Overflow bug from int → long. Div2 rating +42.",
    solvedAt: "2026-06-28",
  },
  {
    id: "p13",
    title: "Word Break II",
    slug: "word-break-ii",
    platform: "LeetCode",
    difficulty: "Hard",
    status: "Backlog",
    topic: "Backtracking",
    languages: [],
    companies: ["Meta"],
    deadline: "2026-07-18",
    attempts: 0,
    timeSpentMin: 0,
    progress: 0,
    notes: "",
  },
  {
    id: "p14",
    title: "Consistent Hashing",
    slug: "consistent-hashing",
    platform: "AlgoExpert",
    difficulty: "Hard",
    status: "Review",
    topic: "System Design",
    languages: ["Go"],
    companies: ["Vercel", "Cloudflare"],
    deadline: "2026-07-09",
    attempts: 2,
    timeSpentMin: 78,
    progress: 70,
    notes: "Draw ring + virtual nodes on whiteboard 2× before Vercel loop.",
    starred: true,
  },
  {
    id: "p15",
    title: "Kth Largest Element",
    slug: "kth-largest",
    platform: "LeetCode",
    difficulty: "Medium",
    status: "Solved",
    topic: "Heap",
    languages: ["TypeScript"],
    companies: ["Amazon", "LinkedIn"],
    attempts: 1,
    timeSpentMin: 14,
    progress: 100,
    notes: "Quickselect average O(n).",
    solvedAt: "2026-06-30",
  },
];

const PLATFORM_META: Record<Platform, { color: string; short: string }> = {
  LeetCode: { color: "#f59e0b", short: "LC" },
  HackerRank: { color: "#22c55e", short: "HR" },
  Codeforces: { color: "#ef4444", short: "CF" },
  AlgoExpert: { color: "#a855f7", short: "AE" },
  NeetCode: { color: "#38bdf8", short: "NC" },
};

const DIFFICULTY_META: Record<
  Difficulty,
  { text: string; bg: string; ring: string }
> = {
  Easy: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
  },
  Medium: {
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
  },
  Hard: {
    text: "text-rose-300",
    bg: "bg-rose-500/10",
    ring: "ring-rose-500/20",
  },
};

const STATUS_META: Record<Status, { color: string; label: string }> = {
  Backlog: { color: "#64748b", label: "Backlog" },
  "In Progress": { color: "#38bdf8", label: "In Progress" },
  Review: { color: "#a855f7", label: "Needs Review" },
  Solved: { color: "#22c55e", label: "Solved" },
};

const STATUS_ORDER: Status[] = ["Backlog", "In Progress", "Review", "Solved"];

// -------------------- Page --------------------
function CodingPage() {
  const [view, setView] = useState<"kanban" | "table" | "timeline" | "charts">(
    "kanban",
  );
  const [q, setQ] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [selected, setSelected] = useState<Problem | null>(null);

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (platform !== "All" && p.platform !== platform) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(s) &&
          !p.topic.toLowerCase().includes(s) &&
          !p.companies.some((c) => c.toLowerCase().includes(s))
        )
          return false;
      }
      return true;
    });
  }, [q, difficulty, platform]);

  const stats = useMemo(() => {
    const total = PROBLEMS.length;
    const solved = PROBLEMS.filter((p) => p.status === "Solved").length;
    const easy = PROBLEMS.filter(
      (p) => p.status === "Solved" && p.difficulty === "Easy",
    ).length;
    const medium = PROBLEMS.filter(
      (p) => p.status === "Solved" && p.difficulty === "Medium",
    ).length;
    const hard = PROBLEMS.filter(
      (p) => p.status === "Solved" && p.difficulty === "Hard",
    ).length;
    const timeMin = PROBLEMS.reduce((a, p) => a + p.timeSpentMin, 0);
    return { total, solved, easy, medium, hard, timeMin };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar active="Coding Practice" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav
          breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Coding Practice" }]}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  <Code2 className="size-3.5" /> Practice Tracker
                </div>
                <h1 className="text-page">Coding Practice</h1>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  Every problem you touch, ranked by difficulty and deadline —
                  with streaks, review queues, and company mapping baked in.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">
                  <BookOpen className="size-3.5" /> Study Plans
                </Button>
                <Button variant="brand" size="sm">
                  <Plus className="size-3.5" /> Add Problem
                </Button>
              </div>
            </div>

            {/* Stats */}
            <StatsStrip stats={stats} />

            {/* Toolbar */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search problems, topics, companies…"
                  className="h-9 w-full rounded-lg border border-white/10 bg-surface pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand/40 focus:ring-1 focus:ring-brand/30"
                />
              </div>

              <SelectPill
                icon={<Filter className="size-3.5" />}
                value={difficulty}
                options={["All", "Easy", "Medium", "Hard"]}
                onChange={(v) => setDifficulty(v as Difficulty | "All")}
              />
              <SelectPill
                icon={<Building2 className="size-3.5" />}
                value={platform}
                options={[
                  "All",
                  "LeetCode",
                  "HackerRank",
                  "Codeforces",
                  "AlgoExpert",
                  "NeetCode",
                ]}
                onChange={(v) => setPlatform(v as Platform | "All")}
              />

              <div className="ml-auto flex items-center rounded-lg border border-white/10 bg-surface p-0.5">
                {[
                  { k: "kanban", i: LayoutGrid, l: "Kanban" },
                  { k: "table", i: TableIcon, l: "Table" },
                  { k: "timeline", i: GitBranch, l: "Timeline" },
                  { k: "charts", i: BarChart3, l: "Charts" },
                ].map((v) => (
                  <button
                    key={v.k}
                    onClick={() => setView(v.k as typeof view)}
                    className={cn(
                      "flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[12px] transition-colors",
                      view === v.k
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <v.i className="size-3.5" /> {v.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Views */}
            <div className="mt-5">
              {view === "kanban" && (
                <KanbanView items={filtered} onOpen={setSelected} />
              )}
              {view === "table" && (
                <TableView items={filtered} onOpen={setSelected} />
              )}
              {view === "timeline" && (
                <TimelineView items={filtered} onOpen={setSelected} />
              )}
              {view === "charts" && <ChartsView items={PROBLEMS} />}
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selected && (
          <ProblemDrawer problem={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------- Stats --------------------
function StatsStrip({
  stats,
}: {
  stats: {
    total: number;
    solved: number;
    easy: number;
    medium: number;
    hard: number;
    timeMin: number;
  };
}) {
  const rate = Math.round((stats.solved / stats.total) * 100);
  const streak = 14;
  const week = 9;

  const cards = [
    {
      label: "Completion Rate",
      value: `${rate}%`,
      hint: `${stats.solved} of ${stats.total} problems`,
      icon: Target,
      accent: "text-brand",
      progress: rate,
    },
    {
      label: "Current Streak",
      value: `${streak} days`,
      hint: "Longest this year: 22",
      icon: Flame,
      accent: "text-amber-300",
    },
    {
      label: "This Week",
      value: `${week} solved`,
      hint: "Goal: 12 · on pace",
      icon: TrendingUp,
      accent: "text-emerald-300",
      progress: Math.round((week / 12) * 100),
    },
    {
      label: "Focus Time",
      value: `${(stats.timeMin / 60).toFixed(1)}h`,
      hint: "Across 4 platforms",
      icon: Clock,
      accent: "text-sky-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-4 transition-colors hover:border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {c.label}
            </div>
            <c.icon className={cn("size-4", c.accent)} />
          </div>
          <div className="mt-3 flex items-end gap-2">
            <div className="text-2xl font-semibold tracking-tight">{c.value}</div>
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">{c.hint}</div>
          {c.progress !== undefined && (
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-brand transition-[width] duration-500"
                style={{ width: `${c.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}

      {/* Difficulty breakdown */}
      <div className="md:col-span-4 rounded-2xl border border-white/10 bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Solved by Difficulty
          </div>
          <div className="text-[11px] text-muted-foreground">
            {stats.solved} total
          </div>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="bg-emerald-400/80"
            style={{ width: `${(stats.easy / stats.solved) * 100}%` }}
          />
          <div
            className="bg-amber-400/80"
            style={{ width: `${(stats.medium / stats.solved) * 100}%` }}
          />
          <div
            className="bg-rose-400/80"
            style={{ width: `${(stats.hard / stats.solved) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[12px]">
          <LegendDot color="bg-emerald-400" label={`Easy · ${stats.easy}`} />
          <LegendDot color="bg-amber-400" label={`Medium · ${stats.medium}`} />
          <LegendDot color="bg-rose-400" label={`Hard · ${stats.hard}`} />
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className={cn("size-2 rounded-full", color)} />
      {label}
    </div>
  );
}

// -------------------- Kanban --------------------
function KanbanView({
  items,
  onOpen,
}: {
  items: Problem[];
  onOpen: (p: Problem) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {STATUS_ORDER.map((s) => {
        const list = items.filter((i) => i.status === s);
        return (
          <div
            key={s}
            className="flex min-h-[420px] flex-col rounded-2xl border border-white/10 bg-surface/60 p-3"
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ background: STATUS_META[s].color }}
                />
                <div className="text-[13px] font-semibold">{STATUS_META[s].label}</div>
                <div className="rounded bg-white/5 px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  {list.length}
                </div>
              </div>
              <button className="grid size-6 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground">
                <Plus className="size-3.5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {list.map((p) => (
                <KanbanCard key={p.id} p={p} onClick={() => onOpen(p)} />
              ))}
              {list.length === 0 && (
                <div className="grid flex-1 place-items-center rounded-xl border border-dashed border-white/10 text-[12px] text-muted-foreground">
                  Nothing here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({ p, onClick }: { p: Problem; onClick: () => void }) {
  const dm = DIFFICULTY_META[p.difficulty];
  const pm = PLATFORM_META[p.platform];
  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="group rounded-xl border border-white/10 bg-surface p-3 text-left transition-colors hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className="grid size-4 place-items-center rounded text-[9px] font-bold text-background"
              style={{ background: pm.color }}
            >
              {pm.short}
            </span>
            <span className="truncate">{p.topic}</span>
          </div>
          <div className="mt-1 truncate text-[13.5px] font-medium">
            {p.title}
          </div>
        </div>
        {p.starred && <Star className="size-3.5 shrink-0 fill-amber-300 text-amber-300" />}
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <span
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1",
            dm.bg,
            dm.text,
            dm.ring,
          )}
        >
          {p.difficulty}
        </span>
        {p.deadline && p.status !== "Solved" && (
          <span className="flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            <Calendar className="size-3" />
            {formatShortDate(p.deadline)}
          </span>
        )}
      </div>

      {p.status !== "Solved" && p.progress > 0 && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-brand"
            style={{ width: `${p.progress}%` }}
          />
        </div>
      )}

      {p.companies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {p.companies.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
}

// -------------------- Table --------------------
function TableView({
  items,
  onOpen,
}: {
  items: Problem[];
  onOpen: (p: Problem) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">Problem</th>
              <th className="px-4 py-3 text-left font-medium">Platform</th>
              <th className="px-4 py-3 text-left font-medium">Difficulty</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Progress</th>
              <th className="px-4 py-3 text-left font-medium">Deadline</th>
              <th className="px-4 py-3 text-left font-medium">Languages</th>
              <th className="px-4 py-3 text-left font-medium">Companies</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const dm = DIFFICULTY_META[p.difficulty];
              const pm = PLATFORM_META[p.platform];
              return (
                <tr
                  key={p.id}
                  onClick={() => onOpen(p)}
                  className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {p.starred && (
                        <Star className="size-3 fill-amber-300 text-amber-300" />
                      )}
                      <div>
                        <div className="font-medium">{p.title}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {p.topic}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex w-fit items-center gap-1.5">
                      <span
                        className="grid size-4 place-items-center rounded text-[9px] font-bold text-background"
                        style={{ background: pm.color }}
                      >
                        {pm.short}
                      </span>
                      <span className="text-muted-foreground">{p.platform}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1",
                        dm.bg,
                        dm.text,
                        dm.ring,
                      )}
                    >
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: STATUS_META[p.status].color }}
                      />
                      {STATUS_META[p.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-brand"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] tabular-nums text-muted-foreground">
                        {p.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.deadline ? formatShortDate(p.deadline) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.languages.slice(0, 2).map((l) => (
                        <span
                          key={l}
                          className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {l}
                        </span>
                      ))}
                      {p.languages.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{p.languages.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.companies.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                      {p.companies.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{p.companies.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ChevronRight className="ml-auto size-3.5 text-muted-foreground" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------- Timeline --------------------
function TimelineView({
  items,
  onOpen,
}: {
  items: Problem[];
  onOpen: (p: Problem) => void;
}) {
  // Combine solvedAt + deadline into one timeline
  const events = useMemo(() => {
    type Ev = {
      key: string;
      date: string;
      type: "solved" | "deadline";
      p: Problem;
    };
    const evs: Ev[] = [];
    items.forEach((p) => {
      if (p.solvedAt) evs.push({ key: p.id + "s", date: p.solvedAt, type: "solved", p });
      if (p.deadline && p.status !== "Solved")
        evs.push({ key: p.id + "d", date: p.deadline, type: "deadline", p });
    });
    return evs.sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [items]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof events>();
    for (const e of events) {
      const list = map.get(e.date) ?? [];
      list.push(e);
      map.set(e.date, list);
    }
    return Array.from(map.entries());
  }, [events]);

  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6">
      <div className="relative pl-6">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-white/10" />
        {grouped.map(([date, evs]) => (
          <div key={date} className="mb-8 last:mb-0">
            <div className="relative -ml-6 mb-3 flex items-center gap-3">
              <div className="grid size-5 place-items-center rounded-full border border-white/10 bg-background">
                <div className="size-1.5 rounded-full bg-brand" />
              </div>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                {formatFullDate(date)}
              </div>
            </div>
            <div className="ml-1 space-y-2">
              {evs.map((e) => {
                const pm = PLATFORM_META[e.p.platform];
                const dm = DIFFICULTY_META[e.p.difficulty];
                return (
                  <button
                    key={e.key}
                    onClick={() => onOpen(e.p)}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition-colors hover:bg-white/[0.05]"
                  >
                    <div
                      className={cn(
                        "grid size-8 place-items-center rounded-lg",
                        e.type === "solved"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-amber-500/10 text-amber-300",
                      )}
                    >
                      {e.type === "solved" ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <Clock className="size-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[13.5px] font-medium">
                          {e.p.title}
                        </span>
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1",
                            dm.bg,
                            dm.text,
                            dm.ring,
                          )}
                        >
                          {e.p.difficulty}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        {e.type === "solved" ? "Solved" : "Deadline"} ·{" "}
                        {e.p.platform} · {e.p.topic}
                      </div>
                    </div>
                    <span
                      className="grid size-5 place-items-center rounded text-[9px] font-bold text-background"
                      style={{ background: pm.color }}
                    >
                      {pm.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------- Charts --------------------
function ChartsView({ items }: { items: Problem[] }) {
  // Weekly solved counts (last 8 weeks — synthetic based on solvedAt)
  const weekly = [4, 6, 3, 8, 5, 9, 7, 9];
  const maxWeekly = Math.max(...weekly);

  // Platform distribution
  const platformCounts = useMemo(() => {
    const map = new Map<Platform, number>();
    items.forEach((p) => map.set(p.platform, (map.get(p.platform) ?? 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  // Topic distribution
  const topicCounts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((p) => map.set(p.topic, (map.get(p.topic) ?? 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [items]);

  // Language usage
  const langCounts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((p) =>
      p.languages.forEach((l) => map.set(l, (map.get(l) ?? 0) + 1)),
    );
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  // Heatmap 7x14
  const heat = useMemo(() => {
    return Array.from({ length: 7 }).map(() =>
      Array.from({ length: 14 }).map(() => Math.floor(Math.random() * 5)),
    );
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {/* Weekly bar chart */}
      <ChartCard
        title="Weekly Completion"
        subtitle="Problems solved · last 8 weeks"
        icon={<BarChart3 className="size-3.5" />}
        className="md:col-span-2"
      >
        <div className="flex h-40 items-end gap-2 pt-4">
          {weekly.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="relative flex w-full flex-1 items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxWeekly) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="w-full rounded-t-md bg-gradient-brand"
                />
              </div>
              <div className="text-[10px] text-muted-foreground">W{i + 1}</div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Streak */}
      <ChartCard
        title="Momentum"
        subtitle="14-day streak · personal best"
        icon={<Flame className="size-3.5" />}
      >
        <div className="flex h-40 flex-col justify-center">
          <div className="text-5xl font-semibold tracking-tight">
            14<span className="ml-1 text-lg text-muted-foreground">days</span>
          </div>
          <div className="mt-2 text-[12px] text-muted-foreground">
            You've solved something every day since June 17.
          </div>
          <div className="mt-4 flex gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="h-6 flex-1 rounded-sm bg-gradient-brand opacity-80"
                style={{ opacity: 0.35 + (i / 14) * 0.65 }}
              />
            ))}
          </div>
        </div>
      </ChartCard>

      {/* Platform distribution */}
      <ChartCard
        title="Platform Distribution"
        subtitle={`${items.length} problems tracked`}
        icon={<Trophy className="size-3.5" />}
      >
        <div className="space-y-3 pt-2">
          {platformCounts.map(([plat, count]) => {
            const pct = Math.round((count / items.length) * 100);
            return (
              <div key={plat}>
                <div className="mb-1 flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: PLATFORM_META[plat].color }}
                    />
                    {plat}
                  </div>
                  <span className="tabular-nums text-muted-foreground">
                    {count} · {pct}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: PLATFORM_META[plat].color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>

      {/* Topics */}
      <ChartCard
        title="Top Topics"
        subtitle="Where you're spending time"
        icon={<Zap className="size-3.5" />}
      >
        <div className="space-y-3 pt-2">
          {topicCounts.map(([t, c]) => {
            const pct = Math.round((c / items.length) * 100);
            return (
              <div key={t}>
                <div className="mb-1 flex items-center justify-between text-[12px]">
                  <span>{t}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {c}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-brand"
                    style={{ width: `${Math.max(10, pct * 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>

      {/* Languages */}
      <ChartCard
        title="Languages Used"
        subtitle="Across all problems"
        icon={<Code2 className="size-3.5" />}
      >
        <div className="flex flex-wrap gap-2 pt-2">
          {langCounts.map(([l, c]) => (
            <div
              key={l}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[12px]"
            >
              <span className="font-medium">{l}</span>
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {c}
              </span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Heatmap */}
      <ChartCard
        title="Practice Heatmap"
        subtitle="Last 14 days · by day of week"
        icon={<Calendar className="size-3.5" />}
        className="md:col-span-2 xl:col-span-3"
      >
        <div className="flex flex-col gap-1 pt-2">
          {heat.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 text-right text-[10px] text-muted-foreground">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </div>
              <div className="flex flex-1 gap-1">
                {row.map((v, j) => (
                  <div
                    key={j}
                    className="h-5 flex-1 rounded-sm"
                    style={{
                      background:
                        v === 0
                          ? "rgba(255,255,255,0.04)"
                          : `oklch(0.75 0.15 195 / ${0.2 + v * 0.18})`,
                    }}
                    title={`${v} solved`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
            Less
            {[0.15, 0.35, 0.55, 0.75, 0.95].map((o) => (
              <div
                key={o}
                className="size-3 rounded-sm"
                style={{ background: `oklch(0.75 0.15 195 / ${o})` }}
              />
            ))}
            More
          </div>
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  icon,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-surface p-4",
        className,
      )}
    >
      <div className="mb-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold">
            {icon}
            {title}
          </div>
          {subtitle && (
            <div className="mt-0.5 text-[11px] text-muted-foreground">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// -------------------- Drawer --------------------
function ProblemDrawer({
  problem,
  onClose,
}: {
  problem: Problem;
  onClose: () => void;
}) {
  const dm = DIFFICULTY_META[problem.difficulty];
  const pm = PLATFORM_META[problem.platform];
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 260 }}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[520px] flex-col border-l border-white/10 bg-surface-elevated"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span
                className="grid size-4 place-items-center rounded text-[9px] font-bold text-background"
                style={{ background: pm.color }}
              >
                {pm.short}
              </span>
              {problem.platform} · {problem.topic}
            </div>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              {problem.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1",
                  dm.bg,
                  dm.text,
                  dm.ring,
                )}
              >
                {problem.difficulty}
              </span>
              <span className="flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: STATUS_META[problem.status].color }}
                />
                {STATUS_META[problem.status].label}
              </span>
              {problem.deadline && (
                <span className="flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  <Calendar className="size-3" />
                  Due {formatShortDate(problem.deadline)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Progress */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center justify-between text-[12px]">
              <span className="font-medium">Progress</span>
              <span className="tabular-nums text-muted-foreground">
                {problem.progress}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-brand"
                style={{ width: `${problem.progress}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-[12px]">
              <Metric label="Attempts" value={String(problem.attempts)} />
              <Metric
                label="Time Spent"
                value={`${problem.timeSpentMin}m`}
              />
              <Metric label="Priority" value={problem.starred ? "High" : "Normal"} />
            </div>
          </div>

          {/* Languages */}
          <Section title="Languages Used">
            {problem.languages.length ? (
              <div className="flex flex-wrap gap-1.5">
                {problem.languages.map((l) => (
                  <span
                    key={l}
                    className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-[11px]"
                  >
                    {l}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-[12px] text-muted-foreground">
                No language logged yet.
              </div>
            )}
          </Section>

          {/* Companies */}
          <Section title="Associated Companies">
            {problem.companies.length ? (
              <div className="flex flex-wrap gap-1.5">
                {problem.companies.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-[11px]"
                  >
                    <Building2 className="size-3 text-muted-foreground" />
                    {c}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-[12px] text-muted-foreground">
                Not tagged to a company yet.
              </div>
            )}
          </Section>

          {/* Notes */}
          <Section title="Notes">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[12.5px] leading-relaxed text-foreground/90">
              {problem.notes || (
                <span className="text-muted-foreground">
                  Add notes on your approach, edge cases, and complexity.
                </span>
              )}
            </div>
          </Section>

          {/* Checklist */}
          <Section title="Completion Checklist">
            <ul className="space-y-1.5">
              {[
                { t: "Brute-force draft", d: problem.progress >= 25 },
                { t: "Optimal solution", d: problem.progress >= 60 },
                { t: "Edge cases covered", d: problem.progress >= 80 },
                { t: "Explain in 60s (mock)", d: problem.progress >= 100 },
              ].map((row) => (
                <li
                  key={row.t}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-[12.5px]"
                >
                  {row.d ? (
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                  ) : (
                    <Circle className="size-3.5 text-muted-foreground" />
                  )}
                  <span className={row.d ? "" : "text-muted-foreground"}>
                    {row.t}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 border-t border-white/10 bg-surface/60 p-4">
          <Button variant="secondary" size="sm">
            <ExternalLink className="size-3.5" /> Open on {problem.platform}
          </Button>
          <Button variant="brand" size="sm" className="ml-auto">
            {problem.status === "Solved" ? "Log Review" : "Continue Session"}
            <ArrowUpRight className="size-3.5" />
          </Button>
        </div>
      </motion.aside>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-[13px] font-semibold tabular-nums">
        {value}
      </div>
    </div>
  );
}

// -------------------- Small UI helpers --------------------
function SelectPill({
  icon,
  value,
  options,
  onChange,
}: {
  icon?: React.ReactNode;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative flex items-center">
      <span className="pointer-events-none absolute left-2.5 text-muted-foreground">
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 appearance-none rounded-lg border border-white/10 bg-surface pl-8 pr-8 text-[12.5px] outline-none focus:border-brand/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

// -------------------- Formatting --------------------
function formatShortDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatFullDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
