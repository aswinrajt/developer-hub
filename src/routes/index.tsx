import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Users,
  Building2,
  FileText,
  Files,
  CalendarClock,
  Code2,
  Target,
  BarChart3,
  FolderOpen,
  Bell,
  Check,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Sparkles,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <Showcase />
        <Features />
        <Workflow />
        <Screenshots />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2">
            <Logo />
            <span className="text-[15px] font-semibold tracking-tight">DevTrack</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {["Product", "Features", "Workflow", "Pricing", "FAQ"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-block"
            >
              Sign in
            </a>
            <Button
              size="sm"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              Start free
              <ArrowRight className="ml-1 size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative flex size-7 items-center justify-center rounded-lg bg-gradient-brand shadow-glow">
      <div className="absolute inset-[2px] rounded-[7px] bg-background/70" />
      <div className="relative size-2.5 rounded-sm bg-gradient-brand" />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative pt-24 pb-32">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-x-0 top-0 h-[600px] grid-bg" />
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.72 0.16 250 / 0.35), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.a
            variants={fadeUp}
            href="#"
            className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-brand" />
            Now in public beta — invite friends, unlock Pro
            <ArrowRight className="size-3" />
          </motion.a>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient-brand">The career OS</span>
            <br />
            built for developers.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground"
          >
            DevTrack replaces the spreadsheet, the notes app and the reminders you keep
            forgetting. One workspace to run your job search like you'd run a well-scoped
            engineering project.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              className="h-12 rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
            >
              Start tracking free
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 rounded-full border border-white/10 px-6 hover:bg-white/5"
            >
              <Command className="mr-2 size-4" />
              See it in action
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-xs text-muted-foreground">
            Free forever for personal use · No credit card · Import from CSV in one click
          </motion.p>
        </motion.div>

        {/* Product frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />
          <AppMockup />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- APP MOCKUP ---------------- */
function AppMockup() {
  const rows = [
    { co: "Vercel", role: "Senior Frontend Engineer", stage: "Onsite", stageColor: "brand", days: "2d" },
    { co: "Linear", role: "Product Engineer", stage: "Technical", stageColor: "violet", days: "5d" },
    { co: "Stripe", role: "Infrastructure Engineer", stage: "Applied", stageColor: "muted", days: "6d" },
    { co: "Notion", role: "Full-stack Engineer", stage: "Recruiter Call", stageColor: "amber", days: "1w" },
    { co: "Framer", role: "Design Engineer", stage: "Offer", stageColor: "emerald", days: "1w" },
    { co: "Supabase", role: "Backend Engineer", stage: "Applied", stageColor: "muted", days: "2w" },
  ];
  return (
    <div className="shadow-elevated overflow-hidden rounded-2xl border border-white/10 bg-surface">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-surface-elevated/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-brand" />
          app.devtrack.io / pipeline
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-3 hidden border-r border-white/5 p-4 md:block">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            Workspace
          </div>
          <ul className="mt-3 space-y-0.5 text-sm">
            {[
              { i: Briefcase, l: "Applications", n: 47, active: true },
              { i: Users, l: "Recruiters", n: 12 },
              { i: Building2, l: "Companies", n: 84 },
              { i: FileText, l: "Resumes", n: 6 },
              { i: Files, l: "Cover Letters", n: 9 },
              { i: CalendarClock, l: "Interviews", n: 4 },
              { i: Code2, l: "Coding Practice", n: 128 },
              { i: Target, l: "Goals", n: 3 },
            ].map((it) => (
              <li
                key={it.l}
                className={cn(
                  "flex items-center justify-between rounded-md px-2.5 py-1.5",
                  it.active
                    ? "bg-white/5 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-2">
                  <it.i className="size-3.5" />
                  {it.l}
                </span>
                <span className="text-[11px] text-muted-foreground/70">{it.n}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="col-span-12 md:col-span-9">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
            <div>
              <div className="text-sm font-medium">Active pipeline</div>
              <div className="text-xs text-muted-foreground">
                47 applications · 4 interviews this week
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                All stages
              </div>
              <div className="rounded-md bg-brand/15 px-2.5 py-1 text-xs text-brand">
                + New application
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="divide-y divide-white/5">
            <div className="grid grid-cols-12 gap-3 px-5 py-2 text-[11px] uppercase tracking-wider text-muted-foreground/60">
              <div className="col-span-4">Company</div>
              <div className="col-span-4">Role</div>
              <div className="col-span-3">Stage</div>
              <div className="col-span-1 text-right">Updated</div>
            </div>
            {rows.map((r) => (
              <div
                key={r.co}
                className="grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/[0.02]"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-md bg-white/5 text-[11px] font-semibold">
                    {r.co[0]}
                  </div>
                  <span className="font-medium">{r.co}</span>
                </div>
                <div className="col-span-4 text-muted-foreground">{r.role}</div>
                <div className="col-span-3">
                  <StageBadge stage={r.stage} tone={r.stageColor} />
                </div>
                <div className="col-span-1 text-right text-xs text-muted-foreground">
                  {r.days}
                </div>
              </div>
            ))}
          </div>

          {/* Footer stats */}
          <div className="grid grid-cols-3 gap-px border-t border-white/5 bg-white/5 text-sm">
            {[
              { k: "Response rate", v: "34%", t: "+6% this month" },
              { k: "Avg. time to reply", v: "3.2d", t: "Down from 5.1d" },
              { k: "Interviews scheduled", v: "4", t: "Next: Vercel · Tue" },
            ].map((s) => (
              <div key={s.k} className="bg-surface p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground/70">
                  {s.k}
                </div>
                <div className="mt-1 text-xl font-semibold">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StageBadge({ stage, tone }: { stage: string; tone: string }) {
  const map: Record<string, string> = {
    brand: "bg-brand/15 text-brand",
    violet: "bg-[oklch(0.72_0.16_290/0.15)] text-[oklch(0.85_0.14_290)]",
    amber: "bg-[oklch(0.78_0.14_75/0.15)] text-[oklch(0.85_0.14_75)]",
    emerald: "bg-[oklch(0.72_0.16_160/0.15)] text-[oklch(0.85_0.14_160)]",
    muted: "bg-white/5 text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        map[tone],
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {stage}
    </span>
  );
}

/* ---------------- LOGO STRIP ---------------- */
function LogoStrip() {
  const logos = ["Vercel", "Linear", "Stripe", "Notion", "Framer", "Supabase", "Raycast"];
  return (
    <section className="border-y border-white/5 bg-surface/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
          Trusted by engineers hired at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((l) => (
            <span
              key={l}
              className="text-lg font-semibold tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SHOWCASE ---------------- */
function Showcase() {
  return (
    <section id="product" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow>Why DevTrack exists</SectionEyebrow>
        <SectionTitle>
          Job hunting is a system.
          <br />
          <span className="text-muted-foreground">Treat it like one.</span>
        </SectionTitle>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground">
          Spreadsheets forget. Sticky notes get lost. Reminders don't know the difference
          between a recruiter ping and a take-home deadline. DevTrack keeps every signal
          in one place — so you can spend your energy on the interview, not the admin.
        </p>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <SplitCard
            title="Spreadsheets"
            body="Rows and columns, no context. No reminders, no history, no way to know what's actually moving."
            dim
          />
          <SplitCard
            title="Notes + Reminders"
            body="Scattered across four apps. You forget the recruiter's name and the deadline you promised."
            dim
          />
          <SplitCard
            title="DevTrack"
            body="One workspace with structure. Applications, recruiters, interviews and prep — connected."
            highlight
          />
        </div>
      </div>
    </section>
  );
}

function SplitCard({
  title,
  body,
  dim,
  highlight,
}: {
  title: string;
  body: string;
  dim?: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-2xl border p-8",
        highlight
          ? "border-brand/30 bg-gradient-to-b from-brand/10 to-transparent shadow-glow"
          : "border-white/10 bg-surface",
        dim && "opacity-70",
      )}
    >
      <div className="text-sm font-medium">{title}</div>
      <p className="mt-3 text-base text-muted-foreground">{body}</p>
    </motion.div>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const items = [
    {
      icon: Briefcase,
      title: "Application pipeline",
      body: "Kanban and table views of every role you're chasing, with stage, priority and last-touch history.",
    },
    {
      icon: Users,
      title: "Recruiter CRM",
      body: "Every recruiter, their company, the roles they pitch and the last conversation you had. Never blank on a name again.",
    },
    {
      icon: Building2,
      title: "Company research",
      body: "Save companies you want to work at. Attach notes, funding, tech stack and open roles as you learn them.",
    },
    {
      icon: FileText,
      title: "Resume versions",
      body: "Keep tailored resumes side by side. Duplicate, tweak for the role, and know which version you sent where.",
    },
    {
      icon: Files,
      title: "Cover letter library",
      body: "Reusable snippets and full letters, versioned per company. Ship a strong intro in under a minute.",
    },
    {
      icon: CalendarClock,
      title: "Interview scheduling",
      body: "Timezone-aware, links attached, prep notes on the same card. Nothing lives in three places anymore.",
    },
    {
      icon: Code2,
      title: "Coding challenge log",
      body: "Track LeetCode, system design and take-homes. Tag by pattern, revisit what you actually got wrong.",
    },
    {
      icon: Target,
      title: "Career goals",
      body: "Set the role, the level and the compensation you're aiming for. Every action rolls up to the goal.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      body: "Response rate, funnel conversion, time-to-offer. See what's working before your job hunt drags into month three.",
    },
    {
      icon: FolderOpen,
      title: "Document vault",
      body: "Offer letters, NDAs, references, transcripts. Encrypted, searchable, and out of your inbox.",
    },
    {
      icon: Bell,
      title: "Smart reminders",
      body: "Follow up on day 5. Send a thank-you within 24 hours. DevTrack nudges when it actually matters.",
    },
    {
      icon: Command,
      title: "Command bar",
      body: "Everything is one keystroke away. Log an application, open a company, jump to prep notes.",
    },
  ];

  return (
    <section id="features" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow>Everything in one workspace</SectionEyebrow>
        <SectionTitle>
          Twelve features. <span className="text-muted-foreground">Zero tab-switching.</span>
        </SectionTitle>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
              className="group relative bg-surface p-8 transition-colors hover:bg-surface-elevated"
            >
              <div className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-brand transition-transform group-hover:scale-105">
                <it.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WORKFLOW ---------------- */
function Workflow() {
  const steps = [
    {
      n: "01",
      title: "Capture the role",
      body: "Paste a job posting or import from your inbox. DevTrack parses the company, role, location and comp automatically.",
    },
    {
      n: "02",
      title: "Tailor and apply",
      body: "Pick the resume version, drop in a cover letter from your library, and log the send. All linked to the role.",
    },
    {
      n: "03",
      title: "Prep and interview",
      body: "Track the loop, keep prep notes on the same card, and get reminded to follow up on the days that actually convert.",
    },
    {
      n: "04",
      title: "Decide with data",
      body: "See offers, timelines and comp bands side by side. Negotiate from a spreadsheet you didn't have to build.",
    },
  ];
  return (
    <section id="workflow" className="border-y border-white/5 bg-surface/30 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow>How it works</SectionEyebrow>
        <SectionTitle>
          From first application <br />
          <span className="text-muted-foreground">to signed offer.</span>
        </SectionTitle>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-surface p-6"
            >
              <div className="text-sm font-mono text-brand">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCREENSHOTS ---------------- */
function Screenshots() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6 space-y-32">
        <FeatureRow
          eyebrow="Interviews"
          title="Every loop, on one card."
          body="Rounds, interviewers, links, prep notes and outcomes — all attached to the role. Open one card and you're ready. No hunting through email threads at 8:59am."
          reverse={false}
          panel={<InterviewPanel />}
        />
        <FeatureRow
          eyebrow="Coding practice"
          title="Practice with intent, not vibes."
          body="Log the problem, tag the pattern, note where you got stuck. DevTrack surfaces the ones you keep missing — right before your next onsite."
          reverse={true}
          panel={<CodingPanel />}
        />
        <FeatureRow
          eyebrow="Analytics"
          title="Know what's actually working."
          body="Response rate by resume version. Funnel conversion by source. Time to offer. The numbers your gut usually gets wrong."
          reverse={false}
          panel={<AnalyticsPanel />}
        />
      </div>
    </section>
  );
}

function FeatureRow({
  eyebrow,
  title,
  body,
  panel,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  panel: React.ReactNode;
  reverse: boolean;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(reverse && "lg:order-2")}
      >
        <div className="text-xs uppercase tracking-[0.18em] text-brand">{eyebrow}</div>
        <h3 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h3>
        <p className="mt-5 max-w-lg text-lg text-muted-foreground">{body}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={cn("relative", reverse && "lg:order-1")}
      >
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand opacity-10 blur-2xl" />
        {panel}
      </motion.div>
    </div>
  );
}

function InterviewPanel() {
  return (
    <div className="shadow-card overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Vercel · Senior Frontend</div>
          <div className="text-xs text-muted-foreground">Onsite loop · 4 rounds · Tue Nov 12</div>
        </div>
        <span className="rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">
          In progress
        </span>
      </div>
      <ul className="divide-y divide-white/5">
        {[
          { r: "Recruiter screen", who: "Priya Shah", t: "45m", done: true },
          { r: "Technical — Systems", who: "Marcus Lin", t: "60m", done: true },
          { r: "Take-home review", who: "Elena Ruiz", t: "45m", done: false, next: true },
          { r: "Bar raiser", who: "Sam Okafor", t: "45m", done: false },
        ].map((row) => (
          <li key={row.r} className="flex items-center gap-3 px-5 py-3.5 text-sm">
            <span
              className={cn(
                "grid size-5 place-items-center rounded-full border",
                row.done
                  ? "border-brand/40 bg-brand/20 text-brand"
                  : row.next
                    ? "border-brand/40 text-brand"
                    : "border-white/10 text-muted-foreground/40",
              )}
            >
              {row.done ? <Check className="size-3" /> : ""}
            </span>
            <span className={cn("flex-1", !row.done && !row.next && "text-muted-foreground")}>
              {row.r}
            </span>
            <span className="text-xs text-muted-foreground">{row.who}</span>
            <span className="w-10 text-right text-xs text-muted-foreground">{row.t}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-white/5 bg-surface-elevated/40 p-5">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground/70">
          Prep notes
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Rehearse edge-cache invalidation story. Bring the streaming SSR benchmark.
          Question for Elena: how does the team think about DX metrics?
        </p>
      </div>
    </div>
  );
}

function CodingPanel() {
  const items = [
    { name: "LRU Cache", tag: "Design", s: "Solved", tone: "emerald" },
    { name: "Word Ladder II", tag: "BFS", s: "Retry", tone: "amber" },
    { name: "Median of Streams", tag: "Heap", s: "Solved", tone: "emerald" },
    { name: "Serialize BTree", tag: "Trees", s: "Stuck", tone: "brand" },
    { name: "K-th Smallest Pair", tag: "Binary Search", s: "Retry", tone: "amber" },
  ];
  return (
    <div className="shadow-card overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Practice log</div>
          <div className="text-xs text-muted-foreground">128 problems · 14-day streak</div>
        </div>
        <div className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
          This week
        </div>
      </div>
      <ul className="divide-y divide-white/5">
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-3 px-5 py-3 text-sm">
            <Code2 className="size-4 text-muted-foreground/60" />
            <span className="flex-1 font-medium">{it.name}</span>
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground">
              {it.tag}
            </span>
            <StageBadge stage={it.s} tone={it.tone} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnalyticsPanel() {
  const bars = [30, 55, 42, 68, 78, 60, 88, 72, 95, 80];
  return (
    <div className="shadow-card overflow-hidden rounded-2xl border border-white/10 bg-surface p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground/70">
            Response rate
          </div>
          <div className="mt-1 text-4xl font-semibold tracking-tight">34.2%</div>
          <div className="text-xs text-brand">↑ 6.1% vs. last month</div>
        </div>
        <div className="flex gap-1 rounded-md bg-white/5 p-1 text-xs">
          <span className="rounded bg-white/10 px-2 py-1">30d</span>
          <span className="px-2 py-1 text-muted-foreground">90d</span>
          <span className="px-2 py-1 text-muted-foreground">All</span>
        </div>
      </div>
      <div className="mt-8 flex h-40 items-end gap-2">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand/40 to-brand/80" style={{ height: `${b}%` }} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-5 text-sm">
        {[
          { k: "Applied", v: "47" },
          { k: "Interviewed", v: "16" },
          { k: "Offers", v: "3" },
        ].map((s) => (
          <div key={s.k}>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground/70">
              {s.k}
            </div>
            <div className="mt-0.5 text-lg font-semibold">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- BENEFITS ---------------- */
function Benefits() {
  const items = [
    {
      k: "Ship the search in weeks, not months",
      v: "Developers on DevTrack sign offers 38% faster than those tracking in spreadsheets.",
    },
    {
      k: "Never miss a follow-up",
      v: "Automated nudges at day 5 and day 10 — the two windows that actually convert.",
    },
    {
      k: "Own your history",
      v: "Every application, every recruiter, every offer — exportable to CSV or JSON, anytime.",
    },
    {
      k: "Built for keyboard-first devs",
      v: "Command bar, vim-style navigation, zero mouse required. Made by engineers who care.",
    },
  ];
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionEyebrow className="text-left">The payoff</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Structure compounds.
              <br />
              <span className="text-muted-foreground">So does momentum.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              You don't need a bigger to-do list. You need a workspace that quietly does
              the tracking for you, so the only thing left is the work that actually moves
              the needle.
            </p>
          </div>
          <ul className="space-y-8">
            {items.map((b, i) => (
              <motion.li
                key={b.k}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="border-t border-white/10 pt-6"
              >
                <h3 className="text-lg font-semibold tracking-tight">{b.k}</h3>
                <p className="mt-2 text-muted-foreground">{b.v}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    {
      q: "I stopped losing threads with recruiters within a week. Signed at Stripe two months later. DevTrack was the only tool that survived the whole search.",
      n: "Aditi Rao",
      r: "Software Engineer, Stripe",
    },
    {
      q: "I ran my last job hunt like an incident — a runbook, a status page, on-call reminders. DevTrack is that runbook, and it's actually pleasant to use.",
      n: "Marcus Lin",
      r: "Staff Engineer, ex-Datadog",
    },
    {
      q: "The analytics changed how I applied. I noticed my referrals converted 4x better than cold applies. Obvious in hindsight. Invisible without the numbers.",
      n: "Sofía Márquez",
      r: "Frontend Engineer, Vercel",
    },
    {
      q: "Cover letter templates plus resume versioning saved me maybe 12 hours a week. Feels like a senior teammate reviewing my process.",
      n: "Jonas Weber",
      r: "Backend Engineer, Supabase",
    },
  ];
  return (
    <section className="border-y border-white/5 bg-surface/30 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow>What developers say</SectionEyebrow>
        <SectionTitle>Written by people who got hired.</SectionTitle>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {items.map((t, i) => (
            <motion.figure
              key={t.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-surface p-8"
            >
              <blockquote className="text-lg leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                <div className="grid size-9 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-background">
                  {t.n[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
function Pricing() {
  const [yearly, setYearly] = useState(true);
  const tiers = [
    {
      name: "Free",
      price: "0",
      sub: "Forever, for personal use",
      cta: "Start tracking",
      features: [
        "Up to 25 active applications",
        "Recruiter & company vault",
        "2 resume versions",
        "Interview scheduler",
        "Command bar",
      ],
    },
    {
      name: "Pro",
      price: yearly ? "9" : "12",
      sub: yearly ? "Billed yearly · save 25%" : "Billed monthly",
      cta: "Go Pro",
      featured: true,
      features: [
        "Unlimited applications",
        "Unlimited resumes & cover letters",
        "Coding practice log with tags",
        "Analytics & funnel insights",
        "Document vault, encrypted",
        "Smart follow-up reminders",
      ],
    },
    {
      name: "Teams",
      price: "custom",
      sub: "For bootcamps & career programs",
      cta: "Talk to us",
      features: [
        "Everything in Pro",
        "Cohort dashboards",
        "Shared company & recruiter libraries",
        "Admin roles & SSO",
        "Priority support",
      ],
    },
  ];
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow>Pricing</SectionEyebrow>
        <SectionTitle>
          Free while you're searching. <br />
          <span className="text-muted-foreground">Fair when you're serious.</span>
        </SectionTitle>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface p-1 text-sm">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                !yearly ? "bg-white/10 text-foreground" : "text-muted-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                yearly ? "bg-white/10 text-foreground" : "text-muted-foreground",
              )}
            >
              Yearly
              <span className="ml-1 text-xs text-brand">-25%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                t.featured
                  ? "border-brand/40 bg-gradient-to-b from-brand/10 to-surface shadow-glow"
                  : "border-white/10 bg-surface",
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                  Most popular
                </span>
              )}
              <div className="text-sm font-medium">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                {t.price === "custom" ? (
                  <span className="text-4xl font-semibold tracking-tight">Custom</span>
                ) : (
                  <>
                    <span className="text-5xl font-semibold tracking-tight">${t.price}</span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                  </>
                )}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{t.sub}</div>

              <Button
                className={cn(
                  "mt-6 h-11 rounded-full",
                  t.featured
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-white/5 text-foreground hover:bg-white/10",
                )}
              >
                {t.cta}
              </Button>

              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    {
      q: "Is DevTrack actually built for developers, or is it just marketed that way?",
      a: "Built by developers, keyboard-first, command bar everywhere, JSON/CSV export for everything you put in. If you can grep it in your terminal today, you can get it out of DevTrack tomorrow.",
    },
    {
      q: "Can I import my existing spreadsheet?",
      a: "Yes. One-click CSV import maps columns automatically — company, role, stage, date applied. Most people are moved over in about two minutes.",
    },
    {
      q: "How is this different from Notion or a Trello board?",
      a: "Those are canvases. DevTrack is a purpose-built system with the schema, reminders, and analytics for a job search already wired in. You spend zero time designing the tool.",
    },
    {
      q: "What happens to my data if I cancel?",
      a: "You keep it. Export at any time to CSV or JSON. Your account stays in read-only mode for 90 days after cancellation, then everything is permanently deleted.",
    },
    {
      q: "Do you sell my data to recruiters or anyone else?",
      a: "No. Your workspace is yours. We do not sell, share, or train on your job search data. Full details in our privacy policy.",
    },
    {
      q: "Is there a free plan?",
      a: "Yes, forever. It covers up to 25 active applications, the recruiter and company vault, two resume versions, and the interview scheduler. Enough to run a real search.",
    },
  ];
  return (
    <section id="faq" className="border-t border-white/5 py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionEyebrow>Questions</SectionEyebrow>
        <SectionTitle>You probably want to know.</SectionTitle>

        <Accordion type="single" collapsible className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-0">
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.72 0.16 250 / 0.4), transparent)",
          }}
        />
      </div>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          <span className="text-gradient-brand">Run your next search</span>
          <br />
          like a senior engineer.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
          Free while you're searching. No credit card. Import your spreadsheet and be
          moved over in two minutes.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-12 rounded-full bg-foreground px-7 text-background hover:bg-foreground/90"
          >
            Start tracking free
            <ArrowRight className="ml-1.5 size-4" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="h-12 rounded-full border border-white/10 px-6 hover:bg-white/5"
          >
            Book a walkthrough
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const cols = [
    {
      h: "Product",
      l: ["Features", "Workflow", "Pricing", "Changelog", "Roadmap"],
    },
    { h: "Company", l: ["About", "Blog", "Careers", "Press", "Contact"] },
    { h: "Resources", l: ["Docs", "Interview guide", "Templates", "Community"] },
    { h: "Legal", l: ["Privacy", "Terms", "Security", "DPA"] },
  ];
  return (
    <footer className="border-t border-white/5 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-[15px] font-semibold tracking-tight">DevTrack</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The career operating system for software developers. Track applications,
              interviews, and progress in one focused workspace.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Twitter, Linkedin].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-9 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <I className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-sm font-medium">{c.h}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} DevTrack Labs, Inc. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */
function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-center text-xs uppercase tracking-[0.2em] text-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
      {children}
    </h2>
  );
}
