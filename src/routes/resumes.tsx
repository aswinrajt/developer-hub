import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  LayoutGrid,
  List as ListIcon,
  Filter,
  Star,
  Download,
  Copy,
  Archive,
  Pencil,
  MoreHorizontal,
  FileText,
  Sparkles,
  TrendingUp,
  Briefcase,
  Clock,
  History,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resumes")({
  head: () => ({
    meta: [
      { title: "Resumes · DevTrack" },
      {
        name: "description",
        content:
          "Manage every resume version, track ATS scores, downloads, and which applications used which resume.",
      },
    ],
  }),
  component: ResumesPage,
});

type Status = "active" | "draft" | "archived";

type Resume = {
  id: string;
  name: string;
  role: string;
  version: string;
  status: Status;
  ats: number;
  downloads: number;
  applications: number;
  editedAt: string; // ISO
  template: string;
  starred: boolean;
  history: number;
  keywords: string[];
};

const RESUMES: Resume[] = [
  {
    id: "backend-staff-v4",
    name: "Backend · Staff Engineer",
    role: "Staff Backend Engineer",
    version: "v4.2",
    status: "active",
    ats: 94,
    downloads: 28,
    applications: 12,
    editedAt: "2026-06-28T10:14:00Z",
    template: "Minimal Serif",
    starred: true,
    history: 14,
    keywords: ["Go", "Kubernetes", "Postgres", "gRPC", "Distributed Systems"],
  },
  {
    id: "frontend-senior-v3",
    name: "Frontend · Senior Product",
    role: "Senior Product Engineer",
    version: "v3.1",
    status: "active",
    ats: 91,
    downloads: 41,
    applications: 18,
    editedAt: "2026-06-25T16:44:00Z",
    template: "Modern Sans",
    starred: true,
    history: 9,
    keywords: ["React", "TypeScript", "Design Systems", "Next.js", "Accessibility"],
  },
  {
    id: "fullstack-founding-v2",
    name: "Full-stack · Founding Engineer",
    role: "Founding Engineer",
    version: "v2.0",
    status: "active",
    ats: 88,
    downloads: 15,
    applications: 7,
    editedAt: "2026-06-20T08:02:00Z",
    template: "Compact Grid",
    starred: false,
    history: 6,
    keywords: ["Node.js", "React", "AWS", "0→1", "SaaS", "Payments"],
  },
  {
    id: "ml-infra-v1",
    name: "ML Infrastructure",
    role: "ML Infrastructure Engineer",
    version: "v1.3",
    status: "draft",
    ats: 82,
    downloads: 4,
    applications: 2,
    editedAt: "2026-06-18T21:30:00Z",
    template: "Modern Sans",
    starred: false,
    history: 3,
    keywords: ["PyTorch", "Ray", "Kubernetes", "MLOps", "Feature Store"],
  },
  {
    id: "devrel-v2",
    name: "Developer Relations",
    role: "Senior DevRel Engineer",
    version: "v2.4",
    status: "active",
    ats: 86,
    downloads: 22,
    applications: 9,
    editedAt: "2026-06-14T12:11:00Z",
    template: "Minimal Serif",
    starred: false,
    history: 8,
    keywords: ["Public Speaking", "OSS", "Docs", "Video", "Community"],
  },
  {
    id: "eng-manager-v1",
    name: "Engineering Manager",
    role: "Engineering Manager",
    version: "v1.0",
    status: "archived",
    ats: 78,
    downloads: 6,
    applications: 3,
    editedAt: "2026-05-30T09:22:00Z",
    template: "Compact Grid",
    starred: false,
    history: 4,
    keywords: ["People Ops", "Roadmap", "Hiring", "Cross-functional"],
  },
];

const TEMPLATES = [
  {
    id: "minimal-serif",
    name: "Minimal Serif",
    description: "Editorial one-column layout for senior IC roles.",
    accent: "from-info to-brand",
  },
  {
    id: "modern-sans",
    name: "Modern Sans",
    description: "Balanced two-column with clean sans typography.",
    accent: "from-brand to-success",
  },
  {
    id: "compact-grid",
    name: "Compact Grid",
    description: "Dense grid for founding engineers with lots of shipped work.",
    accent: "from-warning to-destructive",
  },
  {
    id: "system-mono",
    name: "System Mono",
    description: "Terminal-inspired resume for infra and platform folks.",
    accent: "from-foreground/70 to-info",
  },
];

const STATUS_TABS: { id: "all" | Status; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "draft", label: "Drafts" },
  { id: "archived", label: "Archived" },
];

function relTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = new Date("2026-07-01T12:00:00Z").getTime();
  const diff = Math.max(0, now - then);
  const d = Math.floor(diff / 86400000);
  if (d < 1) return "today";
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)} weeks ago`;
  return `${Math.floor(d / 30)} months ago`;
}

function AtsPill({ score }: { score: number }) {
  const tone =
    score >= 90
      ? "text-success bg-success/10 border-success/25"
      : score >= 80
        ? "text-warning bg-warning/10 border-warning/25"
        : "text-destructive bg-destructive/10 border-destructive/25";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold",
        tone,
      )}
    >
      <Sparkles className="size-3" /> {score}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    active: "bg-brand/10 text-brand border-brand/25",
    draft: "bg-warning/10 text-warning border-warning/25",
    archived: "bg-muted text-muted-foreground border-white/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function ResumeCard({ r }: { r: Resume }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card"
    >
      {/* Preview */}
      <Link
        to="/resumes/$id"
        params={{ id: r.id }}
        className="relative block aspect-[8.5/6] overflow-hidden bg-gradient-to-br from-surface to-background"
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-4 rounded-lg bg-background/80 p-4 shadow-elevated backdrop-blur-sm">
          <MiniResumePreview name={r.name.split("·")[0].trim()} role={r.role} />
        </div>
        <div className="absolute right-3 top-3 flex gap-1.5">
          <StatusBadge status={r.status} />
          {r.starred && (
            <span className="grid size-6 place-items-center rounded-full border border-warning/30 bg-warning/10 text-warning">
              <Star className="size-3 fill-current" />
            </span>
          )}
        </div>
      </Link>

      {/* Meta */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to="/resumes/$id"
              params={{ id: r.id }}
              className="block truncate text-[14px] font-semibold hover:text-brand"
            >
              {r.name}
            </Link>
            <div className="mt-0.5 truncate text-[12px] text-muted-foreground">
              {r.template} · {r.version}
            </div>
          </div>
          <AtsPill score={r.ats} />
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <MiniStat icon={Download} label="Downloads" value={r.downloads} />
          <MiniStat icon={Briefcase} label="Uses" value={r.applications} />
          <MiniStat icon={History} label="Versions" value={r.history} />
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> Edited {relTime(r.editedAt)}
          </span>
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <IconAction icon={Pencil} label="Rename" />
            <IconAction icon={Copy} label="Duplicate" />
            <IconAction icon={Download} label="Export" />
            <IconAction icon={MoreHorizontal} label="More" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Download;
  label: string;
  value: number;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Icon className="size-3" />
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-mono text-[13px] font-semibold text-foreground">{value}</div>
    </div>
  );
}

function IconAction({
  icon: Icon,
  label,
}: {
  icon: typeof Download;
  label: string;
}) {
  return (
    <button
      className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground"
      aria-label={label}
      title={label}
    >
      <Icon className="size-3.5" />
    </button>
  );
}

function MiniResumePreview({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex h-full flex-col text-foreground/85">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
        {name}
      </div>
      <div className="mt-0.5 text-[8px] text-muted-foreground">{role}</div>
      <div className="mt-2 space-y-1">
        {[80, 60, 90, 40, 70].map((w, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full bg-foreground/15"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      <div className="mt-3 text-[7px] font-semibold uppercase tracking-widest text-brand">
        Experience
      </div>
      <div className="mt-1 space-y-1.5">
        {[95, 85, 70].map((w, i) => (
          <div key={i}>
            <div className="h-[3px] w-[40%] rounded-full bg-foreground/25" />
            <div
              className="mt-0.5 h-[2px] rounded-full bg-foreground/10"
              style={{ width: `${w}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeRow({ r }: { r: Resume }) {
  return (
    <Link
      to="/resumes/$id"
      params={{ id: r.id }}
      className="grid grid-cols-[minmax(0,2.2fr)_1fr_100px_90px_90px_120px_40px] items-center gap-4 border-t border-white/5 px-4 py-3 text-[13px] transition-colors hover:bg-white/[0.02]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.02]">
          <FileText className="size-4 text-brand" />
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium">{r.name}</div>
          <div className="truncate text-[11px] text-muted-foreground">
            {r.template} · {r.version}
          </div>
        </div>
        {r.starred && <Star className="size-3.5 fill-warning text-warning" />}
      </div>
      <StatusBadge status={r.status} />
      <AtsPill score={r.ats} />
      <span className="text-mono text-muted-foreground">{r.downloads}</span>
      <span className="text-mono text-muted-foreground">{r.applications}</span>
      <span className="text-muted-foreground">{relTime(r.editedAt)}</span>
      <ArrowUpRight className="size-4 text-muted-foreground" />
    </Link>
  );
}

function TemplateCard({ t }: { t: (typeof TEMPLATES)[number] }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card">
      <div className={cn("relative h-32 bg-gradient-to-br", t.accent)}>
        <div className="absolute inset-4 rounded-md bg-background/85 p-2 shadow-elevated">
          <div className="h-1.5 w-1/3 rounded bg-foreground/50" />
          <div className="mt-1 h-1 w-1/4 rounded bg-foreground/25" />
          <div className="mt-2 space-y-1">
            {[70, 90, 60].map((w, i) => (
              <div
                key={i}
                className="h-[2px] rounded bg-foreground/15"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-[13px] font-semibold">{t.name}</div>
        <div className="mt-0.5 text-[12px] text-muted-foreground">{t.description}</div>
        <Button variant="secondary" size="sm" className="mt-3 w-full">
          Use template
        </Button>
      </div>
    </div>
  );
}

function ResumesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [tab, setTab] = useState<"all" | Status>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return RESUMES.filter((r) => (tab === "all" ? true : r.status === tab)).filter((r) =>
      query.trim() === ""
        ? true
        : (r.name + r.role + r.keywords.join(" "))
            .toLowerCase()
            .includes(query.toLowerCase()),
    );
  }, [tab, query]);

  const stats = useMemo(() => {
    const total = RESUMES.length;
    const active = RESUMES.filter((r) => r.status === "active").length;
    const avgAts = Math.round(RESUMES.reduce((a, r) => a + r.ats, 0) / total);
    const downloads = RESUMES.reduce((a, r) => a + r.downloads, 0);
    return { total, active, avgAts, downloads };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <AppSidebar active="Resumes" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1360px] px-6 py-8">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-eyebrow">Resume Library</div>
                <h1 className="mt-2 text-page tracking-tight">Your resumes</h1>
                <p className="mt-1 max-w-xl text-subtitle">
                  Every version, every template, every application it landed. Build variants,
                  measure ATS, and keep only what performs.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">
                  <Download className="size-3.5" /> Export all
                </Button>
                <Button variant="brand" size="sm">
                  <Plus className="size-3.5" /> New resume
                </Button>
              </div>
            </div>

            {/* Stat strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatTile label="Total resumes" value={stats.total} icon={FileText} />
              <StatTile label="Active" value={stats.active} icon={CheckCircle2} tone="success" />
              <StatTile
                label="Avg ATS score"
                value={`${stats.avgAts}`}
                icon={Sparkles}
                tone="brand"
              />
              <StatTile
                label="Total downloads"
                value={stats.downloads}
                icon={TrendingUp}
                tone="info"
              />
            </div>

            {/* Toolbar */}
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-card/60 p-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <Search className="size-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, role or keyword"
                  className="w-full bg-transparent text-[13px] placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-0.5">
                {STATUS_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "relative rounded-md px-3 py-1 text-[12px] font-medium transition-colors",
                      tab === t.id
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.label}
                    <span className="ml-1.5 text-mono text-[10px] text-muted-foreground">
                      {t.id === "all"
                        ? RESUMES.length
                        : RESUMES.filter((r) => r.status === t.id).length}
                    </span>
                  </button>
                ))}
              </div>

              <Button variant="ghost" size="sm">
                <Filter className="size-3.5" /> Filter
              </Button>

              <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/[0.02] p-0.5">
                <button
                  onClick={() => setView("grid")}
                  className={cn(
                    "grid size-7 place-items-center rounded",
                    view === "grid"
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="size-3.5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "grid size-7 place-items-center rounded",
                    view === "list"
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-label="List view"
                >
                  <ListIcon className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Grid / List */}
            {view === "grid" ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((r) => (
                  <ResumeCard key={r.id} r={r} />
                ))}
              </div>
            ) : (
              <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-card">
                <div className="grid grid-cols-[minmax(0,2.2fr)_1fr_100px_90px_90px_120px_40px] gap-4 border-b border-white/5 bg-white/[0.02] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <div>Resume</div>
                  <div>Status</div>
                  <div>ATS</div>
                  <div>Downloads</div>
                  <div>Applications</div>
                  <div>Last edited</div>
                  <div />
                </div>
                {filtered.map((r) => (
                  <ResumeRow key={r.id} r={r} />
                ))}
              </div>
            )}

            {/* Templates */}
            <div className="mt-12">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-eyebrow">Resume Templates</div>
                  <h2 className="mt-2 text-section">Start from a battle-tested layout</h2>
                </div>
                <Button variant="ghost" size="sm">
                  Browse all templates
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {TEMPLATES.map((t) => (
                  <TemplateCard key={t.id} t={t} />
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-eyebrow">Version History</div>
                  <h2 className="mt-2 text-section">Recent edits</h2>
                </div>
                <Button variant="ghost" size="sm">
                  <Archive className="size-3.5" /> View all history
                </Button>
              </div>
              <ul className="mt-4 divide-y divide-white/5">
                {[
                  {
                    r: "Backend · Staff Engineer",
                    v: "v4.2",
                    msg: "Reordered leadership bullets, added distributed tracing project",
                    when: "2 hours ago",
                  },
                  {
                    r: "Frontend · Senior Product",
                    v: "v3.1",
                    msg: "Swapped design system section, tuned keyword density",
                    when: "yesterday",
                  },
                  {
                    r: "Full-stack · Founding Engineer",
                    v: "v2.0",
                    msg: "New template, condensed to one page",
                    when: "3 days ago",
                  },
                  {
                    r: "ML Infrastructure",
                    v: "v1.3",
                    msg: "Added Ray + Feature Store bullets",
                    when: "1 week ago",
                  },
                ].map((e, i) => (
                  <li key={i} className="flex items-start gap-3 py-3">
                    <div className="mt-1 size-2 rounded-full bg-brand" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px]">
                        <span className="font-medium">{e.r}</span>{" "}
                        <span className="text-muted-foreground">edited to</span>{" "}
                        <span className="text-mono text-brand">{e.v}</span>
                      </div>
                      <div className="text-[12px] text-muted-foreground">{e.msg}</div>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{e.when}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number | string;
  icon: typeof FileText;
  tone?: "default" | "brand" | "success" | "info";
}) {
  const toneMap: Record<string, string> = {
    default: "text-foreground",
    brand: "text-brand",
    success: "text-success",
    info: "text-info",
  };
  return (
    <div className="rounded-xl border border-white/10 bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-caption">{label}</span>
        <Icon className={cn("size-4", toneMap[tone])} />
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
