import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Star,
  Copy,
  Archive,
  MoreHorizontal,
  Files,
  Clock,
  Building2,
  Briefcase,
  FileText,
  Sparkles,
  LayoutGrid,
  List as ListIcon,
  ArrowUpRight,
  Send,
  PencilLine,
  CheckCheck,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COVER_LETTERS, type CoverLetter, type LetterStatus } from "@/lib/cover-letters-data";

export const Route = createFileRoute("/cover-letters")({
  head: () => ({
    meta: [
      { title: "Cover Letters · DevTrack" },
      {
        name: "description",
        content:
          "A calm, focused workspace for drafting, versioning, and sending cover letters tailored to every application.",
      },
    ],
  }),
  component: CoverLettersPage,
});

const TABS: { key: "all" | LetterStatus | "starred"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "draft", label: "Drafts" },
  { key: "sent", label: "Sent" },
  { key: "starred", label: "Starred" },
  { key: "archived", label: "Archived" },
];

function relTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7);
  return `${w}w ago`;
}

function CoverLettersPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [tone, setTone] = useState<string>("all");
  const [resume, setResume] = useState<string>("all");

  const counts = useMemo(() => {
    return {
      all: COVER_LETTERS.length,
      draft: COVER_LETTERS.filter((l) => l.status === "draft").length,
      sent: COVER_LETTERS.filter((l) => l.status === "sent").length,
      starred: COVER_LETTERS.filter((l) => l.starred).length,
      archived: COVER_LETTERS.filter((l) => l.status === "archived").length,
    };
  }, []);

  const filtered = useMemo(() => {
    return COVER_LETTERS.filter((l) => {
      if (tab === "starred" && !l.starred) return false;
      if (tab !== "all" && tab !== "starred" && l.status !== tab) return false;
      if (tone !== "all" && l.tone !== tone) return false;
      if (resume !== "all" && l.resumeId !== resume) return false;
      if (q) {
        const s = q.toLowerCase();
        return (
          l.title.toLowerCase().includes(s) ||
          l.company.toLowerCase().includes(s) ||
          l.role.toLowerCase().includes(s) ||
          l.body.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [q, tab, tone, resume]);

  const totals = useMemo(() => {
    const words = COVER_LETTERS.reduce((s, l) => s + l.wordCount, 0);
    const versions = COVER_LETTERS.reduce((s, l) => s + l.versions.length, 0);
    return { words, versions };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <AppSidebar active="Cover Letters" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-8">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-caption text-brand">Materials · Cover Letters</div>
                <h1 className="mt-1 text-page tracking-tight">The letter room</h1>
                <p className="mt-1 max-w-xl text-[13px] text-muted-foreground">
                  Draft, version and send tailored cover letters. Each one is linked to
                  the exact job, company, resume version and application it belongs to.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Sparkles className="size-3.5" /> Generate with AI
                </Button>
                <Button variant="brand" size="sm">
                  <Plus className="size-3.5" /> New letter
                </Button>
              </div>
            </div>

            {/* Stat strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatTile
                icon={Files}
                label="Total letters"
                value={COVER_LETTERS.length.toString()}
                hint={`${counts.draft} in progress`}
              />
              <StatTile
                icon={Send}
                label="Sent this month"
                value={counts.sent.toString()}
                hint="Across 5 companies"
              />
              <StatTile
                icon={PencilLine}
                label="Words written"
                value={totals.words.toLocaleString()}
                hint="Avg 187 per letter"
              />
              <StatTile
                icon={CheckCheck}
                label="Version snapshots"
                value={totals.versions.toString()}
                hint="Auto-saved silently"
              />
            </div>

            {/* Toolbar */}
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-3 shadow-card lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by company, role, or content…"
                    className="h-9 w-full rounded-lg border border-white/10 bg-background pl-8 pr-3 text-[13px] outline-none placeholder:text-muted-foreground/60 focus:border-brand/50"
                  />
                </div>

                <SelectMini
                  icon={FileText}
                  value={resume}
                  onChange={setResume}
                  options={[
                    { v: "all", l: "All resumes" },
                    { v: "backend-staff-v4", l: "Backend · v4.2" },
                    { v: "frontend-senior-v3", l: "Frontend · v3.1" },
                    { v: "ml-senior-v2", l: "ML · v2.0" },
                  ]}
                />
                <SelectMini
                  icon={Sparkles}
                  value={tone}
                  onChange={setTone}
                  options={[
                    { v: "all", l: "Any tone" },
                    { v: "Confident", l: "Confident" },
                    { v: "Warm", l: "Warm" },
                    { v: "Direct", l: "Direct" },
                    { v: "Enthusiastic", l: "Enthusiastic" },
                  ]}
                />
                <Button variant="ghost" size="sm">
                  <Filter className="size-3.5" /> More filters
                </Button>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-background p-0.5">
                <ViewToggle
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  icon={LayoutGrid}
                  label="Grid"
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
            <div className="mt-4 flex flex-wrap items-center gap-1 border-b border-white/5">
              {TABS.map((t) => {
                const c = counts[t.key];
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={cn(
                      "relative inline-flex items-center gap-2 px-3 py-2 text-[13px] font-medium transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.label}
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-mono",
                        active
                          ? "bg-brand/15 text-brand"
                          : "bg-white/5 text-muted-foreground",
                      )}
                    >
                      {c}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="cl-tab-underline"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-brand"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Results */}
            <div className="mt-6">
              {filtered.length === 0 ? (
                <EmptyState onClear={() => { setQ(""); setTab("all"); setTone("all"); setResume("all"); }} />
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((l, i) => (
                    <motion.div
                      key={l.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.03, ease: "easeOut" }}
                    >
                      <LetterCard letter={l} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <LetterTable letters={filtered} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Files;
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
      <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}

function SelectMini({
  icon: Icon,
  value,
  onChange,
  options,
}: {
  icon: typeof Filter;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 appearance-none rounded-lg border border-white/10 bg-background pl-8 pr-8 text-[13px] outline-none focus:border-brand/50"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
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
  icon: typeof LayoutGrid;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "grid size-7 place-items-center rounded-md text-muted-foreground transition",
        active && "bg-white/10 text-foreground",
      )}
    >
      <Icon className="size-3.5" />
    </button>
  );
}

function StatusDot({ status }: { status: LetterStatus }) {
  const map: Record<LetterStatus, { label: string; cls: string }> = {
    draft: { label: "Draft", cls: "bg-warning/15 text-warning border-warning/30" },
    sent: { label: "Sent", cls: "bg-success/15 text-success border-success/30" },
    archived: { label: "Archived", cls: "bg-white/5 text-muted-foreground border-white/10" },
  };
  const m = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
        m.cls,
      )}
    >
      <span className="size-1 rounded-full bg-current" />
      {m.label}
    </span>
  );
}

function LetterCard({ letter: l }: { letter: CoverLetter }) {
  const preview = l.body.split("\n").filter(Boolean).slice(0, 3).join(" ");
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card transition hover:border-brand/30 hover:shadow-elevated">
      {/* Preview */}
      <Link
        to="/cover-letters/$id"
        params={{ id: l.id }}
        className="relative block aspect-[8.5/6] overflow-hidden border-b border-white/5 bg-gradient-to-br from-surface to-background"
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-4 rounded-md bg-background/85 p-4 backdrop-blur-sm">
          <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {l.company}
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-1 w-3/4 rounded-full bg-foreground/25" />
            <div className="h-1 w-full rounded-full bg-foreground/10" />
            <div className="h-1 w-11/12 rounded-full bg-foreground/10" />
            <div className="h-1 w-4/5 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-3 space-y-1">
            <div className="h-1 w-full rounded-full bg-foreground/10" />
            <div className="h-1 w-5/6 rounded-full bg-foreground/10" />
            <div className="h-1 w-2/3 rounded-full bg-foreground/10" />
          </div>
        </div>
        <div className="absolute right-3 top-3 flex gap-1.5">
          <StatusDot status={l.status} />
          {l.starred && (
            <span className="grid size-6 place-items-center rounded-full border border-warning/30 bg-warning/10 text-warning">
              <Star className="size-3 fill-current" />
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[13px] font-bold text-white",
              l.companyLogo,
            )}
          >
            {l.company[0]}
          </div>
          <div className="min-w-0 flex-1">
            <Link
              to="/cover-letters/$id"
              params={{ id: l.id }}
              className="block truncate text-[14px] font-semibold hover:text-brand"
            >
              {l.role}
            </Link>
            <div className="mt-0.5 flex items-center gap-1.5 truncate text-[12px] text-muted-foreground">
              <Building2 className="size-3" />
              <span className="truncate">{l.company}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-mono">{l.jobId}</span>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
          {preview}
        </p>

        <div className="mt-auto space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <LinkChip icon={FileText} label={l.resumeVersion} />
            <LinkChip icon={Briefcase} label={l.applicationId} />
            <span className="rounded-md border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {l.tone}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" /> {relTime(l.editedAt)}
            </span>
            <span className="text-mono">
              {l.wordCount} words · {l.versions.length} versions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkChip({ icon: Icon, label }: { icon: typeof FileText; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
      <Icon className="size-2.5" /> {label}
    </span>
  );
}

function LetterTable({ letters }: { letters: CoverLetter[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card">
      <div className="grid grid-cols-[minmax(0,2.5fr)_minmax(0,1.4fr)_minmax(0,1fr)_100px_100px_120px_44px] items-center gap-3 border-b border-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <div>Letter</div>
        <div>Linked resume</div>
        <div>Application</div>
        <div>Status</div>
        <div>Words</div>
        <div>Edited</div>
        <div />
      </div>
      <div className="divide-y divide-white/5">
        {letters.map((l) => (
          <Link
            key={l.id}
            to="/cover-letters/$id"
            params={{ id: l.id }}
            className="grid grid-cols-[minmax(0,2.5fr)_minmax(0,1.4fr)_minmax(0,1fr)_100px_100px_120px_44px] items-center gap-3 px-4 py-3 text-[13px] transition hover:bg-white/[0.03]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-md bg-gradient-to-br text-[12px] font-bold text-white",
                  l.companyLogo,
                )}
              >
                {l.company[0]}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 truncate font-medium">
                  {l.role}
                  {l.starred && <Star className="size-3 fill-warning text-warning" />}
                </div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {l.company} · {l.tone}
                </div>
              </div>
            </div>
            <div className="min-w-0 truncate text-[12px] text-muted-foreground">
              <FileText className="mr-1 inline size-3" /> {l.resumeVersion}
            </div>
            <div className="text-mono text-[12px] text-muted-foreground">{l.applicationId}</div>
            <div>
              <StatusDot status={l.status} />
            </div>
            <div className="text-mono text-[12px] text-muted-foreground">{l.wordCount}</div>
            <div className="text-[12px] text-muted-foreground">{relTime(l.editedAt)}</div>
            <div className="flex justify-end text-muted-foreground">
              <ArrowUpRight className="size-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-card/40 px-6 py-16 text-center">
      <div className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground">
        <Files className="size-5" />
      </div>
      <div className="text-[14px] font-semibold">No letters match those filters</div>
      <div className="max-w-sm text-[12px] text-muted-foreground">
        Try clearing filters, or start a new letter from scratch — DevTrack will link
        it to the right company and application automatically.
      </div>
      <div className="mt-2 flex gap-2">
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear filters
        </Button>
        <Button variant="brand" size="sm">
          <Plus className="size-3.5" /> New letter
        </Button>
      </div>
    </div>
  );
}

// unused imports kept intentionally light
void Copy;
void Archive;
void MoreHorizontal;
