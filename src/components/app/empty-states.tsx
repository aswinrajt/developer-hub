import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Plus,
  Sparkles,
  Upload,
  Search,
  Import,
  BookOpen,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Base Empty State                                                   */
/* ------------------------------------------------------------------ */

type EmptyStateProps = {
  illustration: ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  primary: { label: string; icon?: ReactNode; onClick?: () => void };
  secondary?: { label: string; icon?: ReactNode; onClick?: () => void };
  hint?: string;
  className?: string;
};

export function EmptyState({
  illustration,
  eyebrow,
  title,
  description,
  primary,
  secondary,
  hint,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={
        "relative mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-border/60 bg-card/40 px-8 py-14 text-center backdrop-blur-sm " +
        (className ?? "")
      }
    >
      {/* soft mesh backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in oklab, var(--brand) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="mb-8">{illustration}</div>

      {eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-3 w-3 text-brand" />
          {eyebrow}
        </div>
      ) : null}

      <h3 className="max-w-md text-balance text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
        <Button variant="brand" size="lg" onClick={primary.onClick}>
          {primary.icon ?? <Plus className="h-4 w-4" />}
          {primary.label}
          <ArrowRight className="h-4 w-4 opacity-70" />
        </Button>
        {secondary ? (
          <Button variant="secondary" size="lg" onClick={secondary.onClick}>
            {secondary.icon}
            {secondary.label}
          </Button>
        ) : null}
      </div>

      {hint ? (
        <p className="mt-5 text-xs text-muted-foreground/80">{hint}</p>
      ) : null}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Illustration shell                                                 */
/* ------------------------------------------------------------------ */

function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-44 w-72 items-center justify-center">
      {/* grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 80%)",
        }}
      />
      {/* glow */}
      <div
        aria-hidden
        className="absolute inset-x-10 bottom-4 h-16 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--brand) 45%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom developer illustrations                                     */
/* ------------------------------------------------------------------ */

// Applications — terminal window with prompt cursor
export function ApplicationsIllustration() {
  return (
    <Stage>
      <motion.svg
        width="220"
        height="140"
        viewBox="0 0 220 140"
        fill="none"
        initial={{ y: 4 }}
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="app-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.22 0.02 240)" />
            <stop offset="100%" stopColor="oklch(0.14 0.01 240)" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="200" height="120" rx="12" fill="url(#app-fill)" stroke="oklch(0.4 0.02 240 / 0.4)" />
        <circle cx="26" cy="26" r="4" fill="oklch(0.7 0.18 25)" />
        <circle cx="40" cy="26" r="4" fill="oklch(0.8 0.14 85)" />
        <circle cx="54" cy="26" r="4" fill="oklch(0.75 0.16 155)" />
        <rect x="24" y="52" width="80" height="6" rx="3" fill="oklch(0.75 0.16 190)" />
        <rect x="24" y="68" width="140" height="4" rx="2" fill="oklch(0.5 0.02 240)" />
        <rect x="24" y="80" width="110" height="4" rx="2" fill="oklch(0.5 0.02 240)" />
        <rect x="24" y="92" width="60" height="4" rx="2" fill="oklch(0.5 0.02 240)" />
        <text x="24" y="116" fontFamily="ui-monospace, monospace" fontSize="10" fill="oklch(0.75 0.16 190)">
          $ devtrack add
        </text>
        <motion.rect
          x="110"
          y="108"
          width="8"
          height="12"
          fill="oklch(0.75 0.16 190)"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.svg>
    </Stage>
  );
}

// Interviews — calendar page with pulsing event dot
export function InterviewsIllustration() {
  return (
    <Stage>
      <motion.svg
        width="200"
        height="140"
        viewBox="0 0 200 140"
        fill="none"
        initial={{ y: 4 }}
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="20" y="20" width="160" height="110" rx="12" fill="oklch(0.16 0.01 240)" stroke="oklch(0.4 0.02 240 / 0.4)" />
        <rect x="20" y="20" width="160" height="28" rx="12" fill="oklch(0.22 0.02 240)" />
        <rect x="20" y="40" width="160" height="8" fill="oklch(0.22 0.02 240)" />
        <rect x="40" y="14" width="6" height="16" rx="2" fill="oklch(0.75 0.16 190)" />
        <rect x="154" y="14" width="6" height="16" rx="2" fill="oklch(0.75 0.16 190)" />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4, 5, 6].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={30 + c * 20}
              y={58 + r * 16}
              width="14"
              height="10"
              rx="2"
              fill="oklch(0.22 0.02 240)"
            />
          ))
        )}
        <motion.rect
          x={30 + 3 * 20}
          y={58 + 1 * 16}
          width="14"
          height="10"
          rx="2"
          fill="oklch(0.75 0.16 190)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx={30 + 3 * 20 + 7}
          cy={58 + 1 * 16 + 5}
          r="10"
          stroke="oklch(0.75 0.16 190)"
          strokeWidth="1.5"
          fill="none"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: `${30 + 3 * 20 + 7}px ${58 + 1 * 16 + 5}px` }}
        />
      </motion.svg>
    </Stage>
  );
}

// Companies — stacked building blocks / architecture
export function CompaniesIllustration() {
  return (
    <Stage>
      <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
        <motion.g
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <rect x="30" y="60" width="50" height="70" rx="6" fill="oklch(0.2 0.02 240)" stroke="oklch(0.4 0.02 240 / 0.5)" />
          <rect x="38" y="70" width="8" height="8" fill="oklch(0.5 0.02 240)" />
          <rect x="52" y="70" width="8" height="8" fill="oklch(0.5 0.02 240)" />
          <rect x="66" y="70" width="8" height="8" fill="oklch(0.5 0.02 240)" />
          <rect x="38" y="84" width="8" height="8" fill="oklch(0.5 0.02 240)" />
          <rect x="52" y="84" width="8" height="8" fill="oklch(0.75 0.16 190)" />
          <rect x="66" y="84" width="8" height="8" fill="oklch(0.5 0.02 240)" />
        </motion.g>
        <motion.g
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <rect x="90" y="30" width="60" height="100" rx="6" fill="oklch(0.22 0.02 240)" stroke="oklch(0.4 0.02 240 / 0.5)" />
          <polygon points="90,30 120,14 150,30" fill="oklch(0.25 0.02 240)" stroke="oklch(0.4 0.02 240 / 0.5)" />
          <rect x="100" y="46" width="10" height="10" fill="oklch(0.5 0.02 240)" />
          <rect x="118" y="46" width="10" height="10" fill="oklch(0.75 0.16 190)" />
          <rect x="136" y="46" width="10" height="10" fill="oklch(0.5 0.02 240)" />
          <rect x="100" y="64" width="10" height="10" fill="oklch(0.5 0.02 240)" />
          <rect x="118" y="64" width="10" height="10" fill="oklch(0.5 0.02 240)" />
          <rect x="136" y="64" width="10" height="10" fill="oklch(0.5 0.02 240)" />
          <rect x="114" y="100" width="16" height="30" fill="oklch(0.14 0.01 240)" />
        </motion.g>
        <motion.g
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <rect x="160" y="70" width="40" height="60" rx="6" fill="oklch(0.2 0.02 240)" stroke="oklch(0.4 0.02 240 / 0.5)" />
          <rect x="168" y="80" width="8" height="8" fill="oklch(0.5 0.02 240)" />
          <rect x="184" y="80" width="8" height="8" fill="oklch(0.5 0.02 240)" />
          <rect x="168" y="94" width="8" height="8" fill="oklch(0.5 0.02 240)" />
          <rect x="184" y="94" width="8" height="8" fill="oklch(0.5 0.02 240)" />
        </motion.g>
        <motion.circle
          cx="123"
          cy="16"
          r="3"
          fill="oklch(0.75 0.16 190)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </Stage>
  );
}

// Resumes — paper document with parsing lines
export function ResumesIllustration() {
  return (
    <Stage>
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
        <motion.g
          initial={{ rotate: -6 }}
          animate={{ rotate: [-6, -4, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "90px 70px" }}
        >
          <rect x="30" y="18" width="100" height="120" rx="6" fill="oklch(0.95 0.005 240)" stroke="oklch(0.4 0.02 240 / 0.3)" />
          <circle cx="50" cy="38" r="8" fill="oklch(0.75 0.16 190)" />
          <rect x="64" y="32" width="50" height="5" rx="2" fill="oklch(0.3 0.02 240)" />
          <rect x="64" y="41" width="34" height="4" rx="2" fill="oklch(0.6 0.02 240)" />
          <rect x="40" y="58" width="80" height="3" rx="1.5" fill="oklch(0.7 0.02 240)" />
          <rect x="40" y="66" width="70" height="3" rx="1.5" fill="oklch(0.7 0.02 240)" />
          <rect x="40" y="74" width="76" height="3" rx="1.5" fill="oklch(0.7 0.02 240)" />
          <rect x="40" y="86" width="30" height="4" rx="2" fill="oklch(0.4 0.02 240)" />
          <rect x="40" y="96" width="80" height="3" rx="1.5" fill="oklch(0.7 0.02 240)" />
          <rect x="40" y="104" width="60" height="3" rx="1.5" fill="oklch(0.7 0.02 240)" />
          <rect x="40" y="112" width="72" height="3" rx="1.5" fill="oklch(0.7 0.02 240)" />
          <rect x="40" y="120" width="50" height="3" rx="1.5" fill="oklch(0.7 0.02 240)" />
        </motion.g>
        <motion.rect
          x="24"
          y="30"
          width="130"
          height="2"
          fill="oklch(0.75 0.16 190)"
          animate={{ y: [30, 128, 30] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 6px oklch(0.75 0.16 190))" }}
        />
      </svg>
    </Stage>
  );
}

// Cover Letters — quill / cursor writing on a page
export function CoverLettersIllustration() {
  return (
    <Stage>
      <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
        <rect x="30" y="16" width="130" height="118" rx="6" fill="oklch(0.96 0.005 90)" stroke="oklch(0.4 0.02 240 / 0.3)" />
        <rect x="42" y="30" width="80" height="4" rx="2" fill="oklch(0.35 0.02 240)" />
        <rect x="42" y="42" width="106" height="3" rx="1.5" fill="oklch(0.65 0.02 240)" />
        <rect x="42" y="50" width="96" height="3" rx="1.5" fill="oklch(0.65 0.02 240)" />
        <rect x="42" y="58" width="102" height="3" rx="1.5" fill="oklch(0.65 0.02 240)" />
        <rect x="42" y="70" width="86" height="3" rx="1.5" fill="oklch(0.65 0.02 240)" />
        <rect x="42" y="78" width="70" height="3" rx="1.5" fill="oklch(0.65 0.02 240)" />
        <motion.g
          initial={{ x: 0 }}
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="42" y="94" width="60" height="3" rx="1.5" fill="oklch(0.4 0.02 240)" />
          <motion.rect
            x="104"
            y="90"
            width="2"
            height="11"
            fill="oklch(0.75 0.16 190)"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.g>
      </svg>
    </Stage>
  );
}

// Analytics — chart with rising bars
export function AnalyticsIllustration() {
  const bars = [30, 46, 22, 60, 38, 74, 54];
  return (
    <Stage>
      <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
        <rect x="14" y="12" width="192" height="116" rx="12" fill="oklch(0.16 0.01 240)" stroke="oklch(0.4 0.02 240 / 0.4)" />
        <line x1="28" y1="104" x2="196" y2="104" stroke="oklch(0.3 0.02 240)" strokeDasharray="2 4" />
        <line x1="28" y1="76" x2="196" y2="76" stroke="oklch(0.3 0.02 240)" strokeDasharray="2 4" />
        <line x1="28" y1="48" x2="196" y2="48" stroke="oklch(0.3 0.02 240)" strokeDasharray="2 4" />
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={36 + i * 22}
            width="14"
            rx="3"
            fill="oklch(0.75 0.16 190)"
            initial={{ height: 0, y: 116 }}
            animate={{ height: h, y: 116 - h }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        <motion.path
          d={`M ${36 + 7} ${116 - bars[0] + 4} ${bars
            .map((h, i) => `L ${36 + i * 22 + 7} ${116 - h - 4}`)
            .join(" ")}`}
          stroke="oklch(0.85 0.14 85)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </svg>
    </Stage>
  );
}

// Coding — code brackets with blinking cursor
export function CodingIllustration() {
  return (
    <Stage>
      <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
        <rect x="18" y="18" width="164" height="104" rx="12" fill="oklch(0.16 0.01 240)" stroke="oklch(0.4 0.02 240 / 0.4)" />
        <motion.text
          x="100"
          y="82"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="42"
          fontWeight="600"
          fill="oklch(0.75 0.16 190)"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {"< / >"}
        </motion.text>
        <motion.rect
          x="146"
          y="60"
          width="3"
          height="28"
          fill="oklch(0.85 0.14 85)"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    </Stage>
  );
}

// Search — magnifier over grid
export function SearchIllustration() {
  return (
    <Stage>
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
        <motion.g
          initial={{ x: -4, y: -4 }}
          animate={{ x: [-4, 6, -4], y: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="80" cy="66" r="34" stroke="oklch(0.75 0.16 190)" strokeWidth="4" fill="oklch(0.16 0.01 240 / 0.6)" />
          <line x1="104" y1="92" x2="128" y2="116" stroke="oklch(0.75 0.16 190)" strokeWidth="6" strokeLinecap="round" />
          <rect x="62" y="58" width="36" height="4" rx="2" fill="oklch(0.5 0.02 240)" />
          <rect x="62" y="68" width="24" height="4" rx="2" fill="oklch(0.5 0.02 240)" />
        </motion.g>
      </svg>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/*  Preset empty states                                                */
/* ------------------------------------------------------------------ */

export function NoApplicationsEmpty(props: { onAdd?: () => void; onImport?: () => void }) {
  return (
    <EmptyState
      illustration={<ApplicationsIllustration />}
      eyebrow="Pipeline is quiet"
      title="Track your first application"
      description="Log a role you're targeting and DevTrack will follow it through every stage — from wishlist to signed offer."
      primary={{ label: "Log an application", onClick: props.onAdd }}
      secondary={{ label: "Import from CSV", icon: <Import className="h-4 w-4" />, onClick: props.onImport }}
      hint="Tip: press ⌘N anywhere to open the quick-add composer."
    />
  );
}

export function NoInterviewsEmpty(props: { onSchedule?: () => void; onConnect?: () => void }) {
  return (
    <EmptyState
      illustration={<InterviewsIllustration />}
      eyebrow="Calendar's clear"
      title="No interviews on the horizon"
      description="Schedule your next round or connect Google Calendar to auto-sync every technical, system design, and behavioral loop."
      primary={{ label: "Schedule an interview", onClick: props.onSchedule }}
      secondary={{ label: "Connect calendar", onClick: props.onConnect }}
      hint="Reminders fire 1 day and 15 minutes before every round."
    />
  );
}

export function NoCompaniesEmpty(props: { onAdd?: () => void; onDiscover?: () => void }) {
  return (
    <EmptyState
      illustration={<CompaniesIllustration />}
      eyebrow="Your CRM is empty"
      title="Start tracking companies you love"
      description="Save the teams you're targeting to keep recruiters, roles, hiring timelines, and notes in one place."
      primary={{ label: "Add a company", onClick: props.onAdd }}
      secondary={{ label: "Discover companies", icon: <Search className="h-4 w-4" />, onClick: props.onDiscover }}
    />
  );
}

export function NoResumesEmpty(props: { onUpload?: () => void; onTemplate?: () => void }) {
  return (
    <EmptyState
      illustration={<ResumesIllustration />}
      eyebrow="No resumes yet"
      title="Upload a resume to unlock ATS analytics"
      description="We'll score keywords, track reply rates, and version every tailored variant so you know which one lands interviews."
      primary={{ label: "Upload resume", icon: <Upload className="h-4 w-4" />, onClick: props.onUpload }}
      secondary={{ label: "Start from a template", onClick: props.onTemplate }}
      hint="PDF, DOCX, or Markdown — up to 10 MB."
    />
  );
}

export function NoCoverLettersEmpty(props: { onCreate?: () => void; onImport?: () => void }) {
  return (
    <EmptyState
      illustration={<CoverLettersIllustration />}
      eyebrow="A blank page, on purpose"
      title="Draft your first cover letter"
      description="Write once, tailor forever. Link letters to roles and resume versions so every send stays perfectly on-brand."
      primary={{ label: "Write a letter", onClick: props.onCreate }}
      secondary={{ label: "Import a draft", icon: <Import className="h-4 w-4" />, onClick: props.onImport }}
    />
  );
}

export function NoAnalyticsEmpty(props: { onAdd?: () => void; onTour?: () => void }) {
  return (
    <EmptyState
      illustration={<AnalyticsIllustration />}
      eyebrow="Not enough signal yet"
      title="Analytics unlock after 5 applications"
      description="Log a few more roles and we'll surface response rates, funnel drop-off, and which resume gets you the most replies."
      primary={{ label: "Log an application", onClick: props.onAdd }}
      secondary={{ label: "See a sample report", icon: <BookOpen className="h-4 w-4" />, onClick: props.onTour }}
    />
  );
}

export function NoCodingEmpty(props: { onAdd?: () => void; onImport?: () => void }) {
  return (
    <EmptyState
      illustration={<CodingIllustration />}
      eyebrow="Warm up the compiler"
      title="Log your first coding problem"
      description="Track LeetCode, HackerRank, and Codeforces streaks side by side. Tag problems by topic and company to prep with intent."
      primary={{ label: "Add a problem", onClick: props.onAdd }}
      secondary={{ label: "Import from LeetCode", icon: <Import className="h-4 w-4" />, onClick: props.onImport }}
      hint="Solve a problem daily to keep your streak alive."
    />
  );
}

export function NoSearchResultsEmpty(props: { onClear?: () => void; query?: string }) {
  return (
    <EmptyState
      illustration={<SearchIllustration />}
      title={props.query ? `No matches for "${props.query}"` : "Nothing matches those filters"}
      description="Try loosening a filter, checking your spelling, or clearing the search to see everything again."
      primary={{ label: "Clear filters", onClick: props.onClear }}
    />
  );
}
