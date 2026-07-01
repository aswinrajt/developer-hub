import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Copy,
  Archive,
  Pencil,
  Sparkles,
  Star,
  Clock,
  FileText,
  Briefcase,
  TrendingUp,
  History,
  Eye,
  ExternalLink,
  CheckCircle2,
  Circle,
  MoreHorizontal,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResumeDetail = {
  id: string;
  name: string;
  role: string;
  version: string;
  template: string;
  status: "active" | "draft" | "archived";
  ats: number;
  downloads: number;
  applications: number;
  editedAt: string;
  starred: boolean;
  summary: string;
  keywords: { word: string; strength: "strong" | "medium" | "weak" }[];
  metadata: { label: string; value: string }[];
  matchingJobs: {
    company: string;
    role: string;
    match: number;
    location: string;
  }[];
  usedIn: { company: string; role: string; status: string; date: string }[];
  history: { version: string; date: string; note: string; author: string }[];
  analytics: {
    views: number;
    replies: number;
    interviews: number;
    replyRate: number;
    trend: number[];
  };
};

const DETAILS: Record<string, ResumeDetail> = {
  "backend-staff-v4": {
    id: "backend-staff-v4",
    name: "Backend · Staff Engineer",
    role: "Staff Backend Engineer",
    version: "v4.2",
    template: "Minimal Serif",
    status: "active",
    ats: 94,
    downloads: 28,
    applications: 12,
    editedAt: "2026-06-28T10:14:00Z",
    starred: true,
    summary:
      "Staff engineer with 9 years across payments infrastructure and distributed systems. Led migration of a 4B-request/day platform to a service mesh; mentors 6 senior engineers.",
    keywords: [
      { word: "Go", strength: "strong" },
      { word: "Kubernetes", strength: "strong" },
      { word: "Distributed Systems", strength: "strong" },
      { word: "gRPC", strength: "medium" },
      { word: "Postgres", strength: "strong" },
      { word: "Observability", strength: "medium" },
      { word: "Mentorship", strength: "medium" },
      { word: "Rust", strength: "weak" },
    ],
    metadata: [
      { label: "Owner", value: "Aditi Rao" },
      { label: "Format", value: "PDF · Letter" },
      { label: "Pages", value: "2" },
      { label: "Font", value: "Newsreader / Inter" },
      { label: "Word count", value: "612" },
      { label: "Created", value: "Mar 4, 2026" },
    ],
    matchingJobs: [
      { company: "Stripe", role: "Staff Engineer, Payments Infra", match: 96, location: "Remote (US)" },
      { company: "Vercel", role: "Staff Engineer, Runtime", match: 92, location: "Remote" },
      { company: "Linear", role: "Senior Backend Engineer", match: 88, location: "Remote (EU)" },
      { company: "PlanetScale", role: "Staff Distributed Systems", match: 87, location: "Remote" },
    ],
    usedIn: [
      { company: "Stripe", role: "Staff Engineer, Payments Infra", status: "Interview", date: "Jun 24" },
      { company: "Vercel", role: "Staff Engineer, Runtime", status: "Assessment", date: "Jun 20" },
      { company: "Linear", role: "Senior Backend Engineer", status: "Applied", date: "Jun 18" },
      { company: "Datadog", role: "Staff Engineer, Metrics", status: "Rejected", date: "Jun 12" },
    ],
    history: [
      {
        version: "v4.2",
        date: "Jun 28",
        note: "Reordered leadership bullets, added distributed tracing project",
        author: "Aditi",
      },
      { version: "v4.1", date: "Jun 20", note: "Trimmed to 2 pages, tuned keyword density", author: "Aditi" },
      { version: "v4.0", date: "Jun 04", note: "Rewrote summary, new template", author: "Aditi" },
      { version: "v3.6", date: "May 22", note: "Added Payments platform migration bullet", author: "Aditi" },
    ],
    analytics: {
      views: 148,
      replies: 34,
      interviews: 9,
      replyRate: 23,
      trend: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16],
    },
  },
};

export const Route = createFileRoute("/resumes/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `${DETAILS[params.id]?.name ?? "Resume"} · DevTrack` },
      {
        name: "description",
        content: "Resume details, ATS analytics, matching jobs and version history.",
      },
    ],
  }),
  loader: ({ params }) => {
    const detail = DETAILS[params.id];
    if (!detail) throw notFound();
    return { detail };
  },
  component: ResumeDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Resume not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The resume you're looking for may have been archived.
        </p>
        <Link
          to="/resumes"
          className="mt-4 inline-flex items-center gap-2 text-sm text-brand hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to library
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-semibold">Couldn't open this resume</h1>
        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  ),
});

function ResumeDetailPage() {
  const { detail: r } = Route.useLoaderData();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <AppSidebar active="Resumes" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-8">
            {/* Breadcrumb + actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Link to="/resumes" className="hover:text-foreground">
                  Resumes
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-foreground">{r.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Pencil className="size-3.5" /> Rename
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy className="size-3.5" /> Duplicate
                </Button>
                <Button variant="ghost" size="sm">
                  <Archive className="size-3.5" /> Archive
                </Button>
                <Button variant="brand" size="sm">
                  <Download className="size-3.5" /> Export PDF
                </Button>
                <button
                  className="grid size-8 place-items-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  aria-label="More"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-page tracking-tight">{r.name}</h1>
                  {r.starred && <Star className="size-5 fill-warning text-warning" />}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="size-3.5" /> {r.template}
                  </span>
                  <span className="text-mono text-brand">{r.version}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" /> Edited{" "}
                    {new Date(r.editedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <StatusPill status={r.status} />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <MicroStat icon={Sparkles} label="ATS" value={r.ats} tone="brand" />
                <MicroStat icon={Download} label="Downloads" value={r.downloads} />
                <MicroStat icon={Briefcase} label="Uses" value={r.applications} />
                <MicroStat icon={Eye} label="Views" value={r.analytics.views} tone="info" />
              </div>
            </div>

            {/* Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
              {/* Live preview */}
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-card p-4 shadow-elevated"
              >
                <div className="mb-3 flex items-center justify-between px-2">
                  <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Live preview
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span className="text-mono">{r.version}</span>
                    <span>·</span>
                    <span>Letter · 2 pages</span>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-10 text-neutral-900 shadow-inner">
                  <ResumeBody detail={r} />
                </div>
              </motion.section>

              {/* Side rail */}
              <div className="space-y-6">
                <Panel title="Summary" icon={FileText}>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {r.summary}
                  </p>
                </Panel>

                <Panel title="Metadata" icon={FileText}>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12px]">
                    {r.metadata.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <dt className="text-muted-foreground">{m.label}</dt>
                        <dd className="font-medium">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Panel>

                <Panel title="Keywords" icon={Sparkles}>
                  <div className="flex flex-wrap gap-1.5">
                    {r.keywords.map((k) => (
                      <KeywordChip key={k.word} word={k.word} strength={k.strength} />
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    Signal strength based on frequency & JD alignment across matched roles.
                  </p>
                </Panel>

                <Panel title="Analytics" icon={TrendingUp}>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <MiniMetric label="Reply rate" value={`${r.analytics.replyRate}%`} tone="success" />
                    <MiniMetric label="Replies" value={r.analytics.replies} />
                    <MiniMetric label="Interviews" value={r.analytics.interviews} tone="brand" />
                  </div>
                  <Sparkline data={r.analytics.trend} className="mt-3" />
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>12-week trend</span>
                    <span className="inline-flex items-center gap-1 text-success">
                      <TrendingUp className="size-3" /> +34%
                    </span>
                  </div>
                </Panel>
              </div>
            </div>

            {/* Matching jobs */}
            <section className="mt-10">
              <SectionTitle
                eyebrow="Matching Jobs"
                title="Roles this resume fits well"
                action="Browse all jobs"
              />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {r.matchingJobs.map((j) => (
                  <MatchCard key={j.company + j.role} job={j} />
                ))}
              </div>
            </section>

            {/* Applications using this resume */}
            <section className="mt-10">
              <SectionTitle
                eyebrow="Applications Using Resume"
                title="Where this version is in the pipeline"
                action="Open Applications"
              />
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-card">
                <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_140px_100px] gap-4 border-b border-white/5 bg-white/[0.02] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <div>Company</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>
                {r.usedIn.map((u) => (
                  <div
                    key={u.company + u.role}
                    className="grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_140px_100px] items-center gap-4 border-t border-white/5 px-4 py-3 text-[13px] hover:bg-white/[0.02]"
                  >
                    <div className="font-medium">{u.company}</div>
                    <div className="truncate text-muted-foreground">{u.role}</div>
                    <div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                          u.status === "Interview"
                            ? "border-brand/25 bg-brand/10 text-brand"
                            : u.status === "Assessment"
                              ? "border-info/25 bg-info/10 text-info"
                              : u.status === "Rejected"
                                ? "border-destructive/25 bg-destructive/10 text-destructive"
                                : "border-white/10 bg-white/5 text-muted-foreground",
                        )}
                      >
                        {u.status}
                      </span>
                    </div>
                    <div className="text-muted-foreground">{u.date}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Version history */}
            <section className="mt-10">
              <SectionTitle
                eyebrow="Version History"
                title="Every save, every diff"
                action="View diff timeline"
              />
              <div className="mt-4 rounded-2xl border border-white/10 bg-card">
                <ol className="relative divide-y divide-white/5">
                  {r.history.map((h, i) => (
                    <li key={h.version} className="flex items-start gap-4 p-4">
                      <div className="mt-0.5 flex flex-col items-center">
                        {i === 0 ? (
                          <CheckCircle2 className="size-4 text-brand" />
                        ) : (
                          <Circle className="size-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-mono text-[12px] font-semibold text-brand">
                            {h.version}
                          </span>
                          {i === 0 && (
                            <span className="rounded-full border border-brand/25 bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                              Current
                            </span>
                          )}
                          <span className="text-[11px] text-muted-foreground">
                            · {h.author} · {h.date}
                          </span>
                        </div>
                        <div className="mt-1 text-[13px] text-foreground/85">{h.note}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <History className="size-3.5" /> Restore
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="size-3.5" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <div className="h-12" />
          </div>
        </main>
      </div>
    </div>
  );
}

function ResumeBody({ detail }: { detail: ResumeDetail }) {
  return (
    <div className="font-serif">
      <div className="border-b border-neutral-200 pb-4">
        <div className="text-2xl font-semibold tracking-tight">Aditi Rao</div>
        <div className="mt-1 text-[13px] text-neutral-600">
          {detail.role} · San Francisco, CA · aditi@devtrack.io · github.com/aditirao
        </div>
      </div>

      <section className="mt-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
          Summary
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed">{detail.summary}</p>
      </section>

      <section className="mt-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
          Experience
        </div>
        <div className="mt-3 space-y-4">
          {[
            {
              title: "Senior Staff Engineer",
              org: "Ledgerloop",
              period: "2023 — Present",
              bullets: [
                "Led migration of a 4B-req/day payments platform onto Envoy-based service mesh, cutting p99 latency 42%.",
                "Designed and shipped multi-region write path with per-tenant sharding on Postgres + Vitess.",
                "Mentors 6 senior engineers; drove architecture review process now used org-wide.",
              ],
            },
            {
              title: "Senior Backend Engineer",
              org: "Northwind",
              period: "2020 — 2023",
              bullets: [
                "Built Go microservices for fraud scoring processing 900M events/day with 99.995% uptime.",
                "Rewrote job scheduler in Rust; reduced cluster spend $2.1M annually.",
              ],
            },
            {
              title: "Backend Engineer",
              org: "Halcyon",
              period: "2017 — 2020",
              bullets: [
                "Owned auth platform serving 12M monthly actives; shipped WebAuthn passkeys.",
              ],
            },
          ].map((role) => (
            <div key={role.org}>
              <div className="flex items-baseline justify-between text-[13px]">
                <div>
                  <span className="font-semibold">{role.title}</span>
                  <span className="text-neutral-500"> · {role.org}</span>
                </div>
                <div className="text-[11px] text-neutral-500">{role.period}</div>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[12px] leading-relaxed">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
            Skills
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
            {detail.keywords.slice(0, 8).map((k) => (
              <span
                key={k.word}
                className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5"
              >
                {k.word}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
            Education
          </div>
          <div className="mt-2 text-[12px]">
            <div className="font-medium">B.S. Computer Science</div>
            <div className="text-neutral-500">Carnegie Mellon University · 2013 — 2017</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: ResumeDetail["status"] }) {
  const map: Record<ResumeDetail["status"], string> = {
    active: "border-brand/25 bg-brand/10 text-brand",
    draft: "border-warning/25 bg-warning/10 text-warning",
    archived: "border-white/10 bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function MicroStat({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof Sparkles;
  label: string;
  value: number | string;
  tone?: "default" | "brand" | "info";
}) {
  const toneMap: Record<string, string> = {
    default: "text-foreground",
    brand: "text-brand",
    info: "text-info",
  };
  return (
    <div className="rounded-xl border border-white/10 bg-card px-3 py-2">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className={cn("size-3", toneMap[tone])} />
        {label}
      </div>
      <div className="mt-0.5 text-mono text-[15px] font-semibold">{value}</div>
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof FileText;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3.5" />
        {title}
      </div>
      {children}
    </section>
  );
}

function KeywordChip({
  word,
  strength,
}: {
  word: string;
  strength: "strong" | "medium" | "weak";
}) {
  const map = {
    strong: "border-success/25 bg-success/10 text-success",
    medium: "border-brand/20 bg-brand/10 text-brand",
    weak: "border-white/10 bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[11px] font-medium",
        map[strength],
      )}
    >
      {word}
    </span>
  );
}

function MiniMetric({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number | string;
  tone?: "default" | "brand" | "success";
}) {
  const toneMap: Record<string, string> = {
    default: "text-foreground",
    brand: "text-brand",
    success: "text-success",
  };
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
      <div className={cn("text-mono text-[15px] font-semibold", toneMap[tone])}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 260;
  const h = 44;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)}>
      <defs>
        <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark)" />
      <polyline
        points={pts}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="text-eyebrow">{eyebrow}</div>
        <h2 className="mt-2 text-section">{title}</h2>
      </div>
      {action && (
        <Button variant="ghost" size="sm">
          {action} <ExternalLink className="size-3.5" />
        </Button>
      )}
    </div>
  );
}

function MatchCard({
  job,
}: {
  job: { company: string; role: string; match: number; location: string };
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-card p-4 transition-colors hover:border-brand/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-brand text-[11px] font-bold text-background">
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">{job.role}</div>
              <div className="truncate text-[12px] text-muted-foreground">
                {job.company} · {job.location}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-mono text-[14px] font-semibold text-brand">{job.match}%</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Match
          </div>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-brand"
          style={{ width: `${job.match}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-end">
        <Button variant="ghost" size="sm">
          View role <ExternalLink className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
