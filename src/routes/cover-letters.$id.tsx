import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Copy,
  Archive,
  Download,
  Send,
  MoreHorizontal,
  Building2,
  Briefcase,
  FileText,
  Clock,
  History,
  RotateCcw,
  Type,
  AlignLeft,
  Check,
  Sparkles,
  Eye,
  Maximize2,
  ChevronRight,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COVER_LETTERS, getLetter, type CoverLetter } from "@/lib/cover-letters-data";

export const Route = createFileRoute("/cover-letters/$id")({
  head: ({ params }) => {
    const l = COVER_LETTERS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${l?.title ?? "Cover letter"} · DevTrack` },
        {
          name: "description",
          content:
            "Distraction-free cover letter editor with auto-save, version history and full context on the linked application.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const letter = getLetter(params.id);
    if (!letter) throw notFound();
    return { letter };
  },
  component: CoverLetterEditor,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Letter not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          It may have been archived or renamed.
        </p>
        <Link
          to="/cover-letters"
          className="mt-4 inline-flex items-center gap-2 text-sm text-brand hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to letters
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-semibold">Couldn't open this letter</h1>
        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  ),
});

type SaveState = "saved" | "saving" | "dirty";

function CoverLetterEditor() {
  const { letter } = Route.useLoaderData() as { letter: CoverLetter };

  const [body, setBody] = useState(letter.body);
  const [title, setTitle] = useState(letter.role);
  const [starred, setStarred] = useState(letter.starred);
  const [focus, setFocus] = useState(false);
  const [font, setFont] = useState<"serif" | "sans">("serif");
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [lastSaved, setLastSaved] = useState(letter.editedAt);
  const [activeVersion, setActiveVersion] = useState(letter.versions[0]?.id);

  // Auto-save simulation
  useEffect(() => {
    if (saveState !== "dirty") return;
    const t1 = setTimeout(() => setSaveState("saving"), 400);
    const t2 = setTimeout(() => {
      setSaveState("saved");
      setLastSaved(new Date().toISOString());
    }, 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [body, title, saveState]);

  const wordCount = useMemo(
    () => body.trim().split(/\s+/).filter(Boolean).length,
    [body],
  );
  const readMin = Math.max(1, Math.round(wordCount / 220));

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {!focus && <AppSidebar active="Cover Letters" />}
      <div className="flex min-w-0 flex-1 flex-col">
        {!focus && <TopNav />}

        {/* Editor toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-surface/60 px-6 py-2.5 backdrop-blur-xl">
          <div className="flex min-w-0 items-center gap-3 text-[12.5px] text-muted-foreground">
            <Link
              to="/cover-letters"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Letters
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/40" />
            <span className="truncate text-foreground">{letter.company}</span>
            <ChevronRight className="size-3 text-muted-foreground/40" />
            <span className="truncate">{letter.role}</span>
            <SaveIndicator state={saveState} lastSaved={lastSaved} />
          </div>

          <div className="flex items-center gap-1">
            <ToolBtn
              active={font === "serif"}
              onClick={() => setFont("serif")}
              icon={Type}
              label="Serif"
            />
            <ToolBtn
              active={font === "sans"}
              onClick={() => setFont("sans")}
              icon={AlignLeft}
              label="Sans"
            />
            <span className="mx-1 h-4 w-px bg-white/10" />
            <ToolBtn
              active={starred}
              onClick={() => setStarred((v) => !v)}
              icon={Star}
              label="Star"
              activeClass="text-warning"
            />
            <ToolBtn icon={Copy} label="Duplicate" />
            <ToolBtn icon={Archive} label="Archive" />
            <ToolBtn
              active={focus}
              onClick={() => setFocus((v) => !v)}
              icon={Maximize2}
              label="Focus mode"
            />
            <span className="mx-1 h-4 w-px bg-white/10" />
            <Button variant="ghost" size="sm">
              <Eye className="size-3.5" /> Preview
            </Button>
            <Button variant="brand" size="sm">
              <Send className="size-3.5" /> Send
            </Button>
            <button
              className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground"
              aria-label="More"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_340px]">
          {/* Canvas */}
          <main className="min-w-0 overflow-y-auto bg-gradient-to-b from-background to-surface/40">
            <div className="mx-auto w-full max-w-[760px] px-8 py-12">
              <motion.article
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "rounded-2xl border border-white/10 bg-card px-12 py-14 shadow-elevated",
                  font === "serif" ? "font-serif" : "font-sans",
                )}
              >
                {/* Letterhead */}
                <div className="mb-10 flex items-start justify-between border-b border-white/5 pb-6">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                      Cover letter
                    </div>
                    <div className="mt-2 text-[13px] text-muted-foreground">
                      Maya Chen · maya@devtrack.io
                    </div>
                  </div>
                  <div className="text-right text-[12px] text-muted-foreground">
                    {new Date(lastSaved).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    <div className="mt-1 text-mono text-[11px]">
                      To: {letter.company} · {letter.jobId}
                    </div>
                  </div>
                </div>

                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSaveState("dirty");
                  }}
                  className={cn(
                    "w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-muted-foreground/40",
                    font === "serif" ? "font-serif" : "font-sans",
                  )}
                  placeholder="Untitled letter"
                />
                <div className="mt-1 text-[12px] text-muted-foreground">
                  For {letter.company} · {letter.role}
                </div>

                <textarea
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    setSaveState("dirty");
                  }}
                  spellCheck
                  className={cn(
                    "mt-8 h-[560px] w-full resize-none bg-transparent text-[15.5px] leading-[1.85] tracking-[0.005em] text-foreground/90 outline-none placeholder:text-muted-foreground/40",
                    font === "serif" ? "font-serif" : "font-sans",
                  )}
                  placeholder="Dear hiring team,&#10;&#10;Start writing…"
                />

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-muted-foreground">
                  <span className="text-mono">
                    {wordCount} words · ~{readMin} min read
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="size-3 text-brand" />
                    Tone matches {letter.tone.toLowerCase()}
                  </span>
                </div>
              </motion.article>
            </div>
          </main>

          {/* Context sidebar */}
          {!focus && (
            <aside className="hidden min-w-0 flex-col overflow-y-auto border-l border-white/5 bg-surface/40 lg:flex">
              <ContextPanel letter={letter} />
              <VersionHistory
                versions={letter.versions}
                activeId={activeVersion}
                onSelect={setActiveVersion}
              />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function SaveIndicator({ state, lastSaved }: { state: SaveState; lastSaved: string }) {
  const label =
    state === "saving"
      ? "Saving…"
      : state === "dirty"
        ? "Unsaved changes"
        : `Saved ${new Date(lastSaved).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

  return (
    <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 3 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "size-1.5 rounded-full",
            state === "saved" && "bg-success",
            state === "saving" && "bg-brand animate-pulse",
            state === "dirty" && "bg-warning",
          )}
        />
      </AnimatePresence>
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

function ToolBtn({
  icon: Icon,
  label,
  active,
  activeClass,
  onClick,
}: {
  icon: typeof Type;
  label: string;
  active?: boolean;
  activeClass?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-8 place-items-center rounded-md text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
        active && "bg-white/10 text-foreground",
        active && activeClass,
      )}
    >
      <Icon className={cn("size-3.5", active && activeClass === "text-warning" && "fill-current")} />
    </button>
  );
}

function ContextPanel({ letter: l }: { letter: CoverLetter }) {
  return (
    <div className="border-b border-white/5 p-5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Linked to
      </div>

      <div className="mt-3 space-y-2">
        <LinkedRow
          icon={Building2}
          label="Company"
          value={l.company}
          meta="View profile"
          logo={l.companyLogo}
        />
        <LinkedRow
          icon={Briefcase}
          label="Job"
          value={l.role}
          meta={l.jobId}
        />
        <LinkedRow
          icon={FileText}
          label="Resume version"
          value={l.resumeVersion}
          meta="Open resume"
          href={`/resumes/${l.resumeId}`}
        />
        <LinkedRow
          icon={Check}
          label="Application"
          value={l.applicationId}
          meta="Open pipeline"
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
        <MiniStat label="Words" value={l.wordCount.toString()} />
        <MiniStat label="Versions" value={l.versions.length.toString()} />
        <MiniStat label="Tone" value={l.tone} />
      </div>

      {l.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {l.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-brand/25 bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function LinkedRow({
  icon: Icon,
  label,
  value,
  meta,
  logo,
  href,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
  meta: string;
  logo?: string;
  href?: string;
}) {
  const inner = (
    <div className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition hover:border-white/10 hover:bg-white/[0.03]">
      {logo ? (
        <div
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-md bg-gradient-to-br text-[12px] font-bold text-white",
            logo,
          )}
        >
          {value[0]}
        </div>
      ) : (
        <div className="grid size-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.03] text-muted-foreground">
          <Icon className="size-3.5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="truncate text-[13px] font-medium">{value}</div>
      </div>
      <span className="text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {meta}
      </span>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 truncate text-[12px] font-semibold text-foreground">{value}</div>
    </div>
  );
}

function VersionHistory({
  versions,
  activeId,
  onSelect,
}: {
  versions: CoverLetter["versions"];
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex-1 p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Version history
        </div>
        <button className="inline-flex items-center gap-1 text-[11px] text-brand hover:underline">
          <History className="size-3" /> All
        </button>
      </div>

      <ol className="relative mt-4 space-y-1 border-l border-white/10 pl-4">
        {versions.map((v) => {
          const active = v.id === activeId;
          return (
            <li key={v.id} className="relative">
              <span
                className={cn(
                  "absolute -left-[21px] top-3 size-2.5 rounded-full border-2 border-background",
                  active ? "bg-brand" : "bg-white/20",
                )}
              />
              <button
                onClick={() => onSelect(v.id)}
                className={cn(
                  "w-full rounded-lg border p-2.5 text-left transition",
                  active
                    ? "border-brand/30 bg-brand/5"
                    : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
                )}
              >
                <div className="flex items-center justify-between text-[12px] font-medium">
                  <span className="text-mono">{v.label}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(v.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-0.5 line-clamp-2 text-[11.5px] text-muted-foreground">
                  {v.note}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-2.5" /> {v.author}
                  </span>
                  <span className="text-mono">{v.wordCount}w</span>
                </div>
              </button>
              {active && !isFirst(v.id, versions) && (
                <div className="mt-1 flex justify-end pr-1">
                  <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground">
                    <RotateCcw className="size-2.5" /> Restore
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-[11px] text-muted-foreground">
        <Download className="size-3.5" />
        <span>Export as PDF, Markdown, or DOCX from the Send menu.</span>
      </div>
    </div>
  );
}

function isFirst(id: string, versions: CoverLetter["versions"]) {
  return versions[0]?.id === id;
}
