import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Briefcase,
  CalendarClock,
  Trophy,
  XCircle,
  Building2,
  Code2,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Video,
  Phone,
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  Target,
  FileText,
  Eye,
  Download,
  Zap,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Flame,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Card, ChartCard } from "@/components/app/cards";
import { Badge } from "@/components/app/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — DevTrack" },
      { name: "description", content: "Your job search command center." },
    ],
  }),
  component: DashboardPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <AppSidebar active="Dashboard" className="hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
            <WelcomeHeader />
            <StatsRow />
            <div className="mt-6 grid grid-cols-12 gap-4">
              <div className="col-span-12 xl:col-span-8">
                <FunnelChart />
              </div>
              <div className="col-span-12 xl:col-span-4">
                <StatusPie />
              </div>
              <div className="col-span-12 xl:col-span-8">
                <WeeklyActivity />
              </div>
              <div className="col-span-12 xl:col-span-4">
                <GoalProgress />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <UpcomingInterviews />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <TodaysTasks />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <ActivityTimeline />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <RecruiterMessages />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <ResumePerformance />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <InterviewCalendar />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============ Welcome ============ */
function WelcomeHeader() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.4 }} className="mb-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 text-caption">
            <Sparkles className="size-3.5 text-brand" />
            Wednesday, July 1
          </div>
          <h1 className="text-page mt-2">Welcome back, Aditi.</h1>
          <p className="text-subtitle mt-1.5 max-w-xl">
            You have <span className="text-foreground font-medium">3 interviews</span> this week and{" "}
            <span className="text-foreground font-medium">2 offers</span> awaiting your response.
            Momentum is strong — keep shipping.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium hover:bg-white/10">
            <Download className="size-3.5" /> Export week
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[13px] font-medium text-background hover:bg-foreground/90">
            <Plus className="size-3.5" /> Log application
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ============ Stat cards row ============ */
const stats = [
  { label: "Applications", value: "47", delta: "+8 this week", trend: "up", icon: Briefcase, tone: "brand" as const },
  { label: "Interviews", value: "12", delta: "+3 this week", trend: "up", icon: CalendarClock, tone: "info" as const },
  { label: "Offers", value: "2", delta: "$210k avg", trend: "up", icon: Trophy, tone: "success" as const },
  { label: "Rejected", value: "9", delta: "19% rate", trend: "flat", icon: XCircle, tone: "danger" as const },
  { label: "Saved Companies", value: "84", delta: "+11 this week", trend: "up", icon: Building2, tone: "muted" as const },
  { label: "Coding Challenges", value: "128", delta: "12-day streak", trend: "up", icon: Code2, tone: "warning" as const },
];

const toneMap = {
  brand: "text-brand bg-brand/10 border-brand/20",
  info: "text-info bg-info/10 border-info/20",
  success: "text-success bg-success/10 border-success/20",
  danger: "text-destructive bg-destructive/10 border-destructive/20",
  warning: "text-warning bg-warning/10 border-warning/20",
  muted: "text-muted-foreground bg-white/5 border-white/10",
};

function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className={cn("grid size-8 place-items-center rounded-lg border", toneMap[s.tone])}>
                <s.icon className="size-4" />
              </div>
              {s.trend === "up" && <TrendingUp className="size-3.5 text-success" />}
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">{s.value}</div>
            <div className="text-caption mt-0.5">{s.label}</div>
            <div className="mt-2 text-[11px] text-muted-foreground/80">{s.delta}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

/* ============ Application Funnel ============ */
const funnel = [
  { stage: "Applied", count: 47, color: "from-brand/70 to-brand/40", pct: 100 },
  { stage: "Screening", count: 28, color: "from-info/70 to-info/40", pct: 60 },
  { stage: "Technical", count: 16, color: "from-warning/70 to-warning/40", pct: 34 },
  { stage: "Onsite", count: 8, color: "from-warning/80 to-warning/50", pct: 17 },
  { stage: "Offer", count: 2, color: "from-success/80 to-success/50", pct: 4 },
];

function FunnelChart() {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Application Funnel</div>
          <div className="text-caption mt-0.5">Conversion across all pipelines · Last 90 days</div>
        </div>
        <Badge tone="success">4.3% offer rate</Badge>
      </div>
      <div className="mt-6 space-y-3">
        {funnel.map((f, i) => (
          <motion.div
            key={f.stage}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group"
          >
            <div className="mb-1.5 flex items-center justify-between text-[12px]">
              <span className="font-medium">{f.stage}</span>
              <span className="text-muted-foreground">
                {f.count} <span className="text-muted-foreground/60">· {f.pct}%</span>
              </span>
            </div>
            <div className="h-8 overflow-hidden rounded-lg bg-white/[0.03]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${f.pct}%` }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-lg bg-gradient-to-r shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
                  f.color,
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

/* ============ Status Pie ============ */
const pieData = [
  { label: "Active", value: 26, color: "oklch(0.78 0.14 195)" },
  { label: "Interviewing", value: 12, color: "oklch(0.72 0.16 250)" },
  { label: "Offer", value: 2, color: "oklch(0.75 0.16 155)" },
  { label: "Rejected", value: 9, color: "oklch(0.65 0.19 25)" },
  { label: "Ghosted", value: 8, color: "oklch(0.55 0.02 260)" },
];

function StatusPie() {
  const total = pieData.reduce((s, d) => s + d.value, 0);
  const r = 60;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <Card className="h-full">
      <div className="text-card-title">Application Status</div>
      <div className="text-caption mt-0.5">Breakdown of {total} tracked roles</div>
      <div className="mt-4 flex items-center gap-6">
        <div className="relative">
          <svg viewBox="0 0 160 160" className="size-40 -rotate-90">
            <circle cx="80" cy="80" r={r} fill="none" stroke="oklch(0.2 0.01 260)" strokeWidth="16" />
            {pieData.map((d, i) => {
              const len = (d.value / total) * c;
              const dashArray = `${len} ${c - len}`;
              const el = (
                <motion.circle
                  key={d.label}
                  cx="80"
                  cy="80"
                  r={r}
                  fill="none"
                  stroke={d.color}
                  strokeWidth="16"
                  strokeDasharray={dashArray}
                  strokeDashoffset={-offset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              );
              offset += len;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-3xl font-semibold">{total}</div>
              <div className="text-caption">Active</div>
            </div>
          </div>
        </div>
        <ul className="flex-1 space-y-2">
          {pieData.map((d) => (
            <li key={d.label} className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-sm" style={{ background: d.color }} />
                {d.label}
              </span>
              <span className="text-muted-foreground">
                {d.value} <span className="text-muted-foreground/50">· {Math.round((d.value / total) * 100)}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ============ Weekly Activity ============ */
const weekly = [
  { d: "Mon", apps: 4, ints: 1, code: 3 },
  { d: "Tue", apps: 6, ints: 2, code: 4 },
  { d: "Wed", apps: 3, ints: 0, code: 5 },
  { d: "Thu", apps: 8, ints: 3, code: 2 },
  { d: "Fri", apps: 5, ints: 2, code: 6 },
  { d: "Sat", apps: 2, ints: 0, code: 4 },
  { d: "Sun", apps: 1, ints: 0, code: 3 },
];

function WeeklyActivity() {
  const max = Math.max(...weekly.flatMap((w) => [w.apps, w.ints, w.code]));
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Weekly Activity</div>
          <div className="text-caption mt-0.5">Applications, interviews, and coding practice</div>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <Legend color="oklch(0.78 0.14 195)" label="Applied" />
          <Legend color="oklch(0.72 0.16 250)" label="Interviews" />
          <Legend color="oklch(0.75 0.16 155)" label="LeetCode" />
        </div>
      </div>
      <div className="mt-6 flex h-52 items-end gap-4">
        {weekly.map((w, i) => (
          <div key={w.d} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-44 w-full items-end justify-center gap-1">
              {[
                { v: w.apps, c: "bg-brand" },
                { v: w.ints, c: "bg-info" },
                { v: w.code, c: "bg-success" },
              ].map((b, j) => (
                <motion.div
                  key={j}
                  initial={{ height: 0 }}
                  animate={{ height: `${(b.v / max) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.05 * i + 0.03 * j, ease: "easeOut" }}
                  className={cn("w-2.5 rounded-t-sm opacity-90", b.c)}
                />
              ))}
            </div>
            <div className="text-[11px] text-muted-foreground">{w.d}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="size-2 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}

/* ============ Goal Progress ============ */
const goals = [
  { name: "Apply to 60 roles", current: 47, target: 60, tone: "brand" as const },
  { name: "10 technical interviews", current: 8, target: 10, tone: "info" as const },
  { name: "Solve 150 LeetCodes", current: 128, target: 150, tone: "success" as const },
  { name: "5 recruiter coffee chats", current: 3, target: 5, tone: "warning" as const },
];

const goalTone = {
  brand: "bg-brand",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
};

function GoalProgress() {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Q3 Goals</div>
          <div className="text-caption mt-0.5">73% on track · ends Sept 30</div>
        </div>
        <Target className="size-4 text-brand" />
      </div>
      <div className="mt-5 space-y-4">
        {goals.map((g, i) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <div key={g.name}>
              <div className="mb-1.5 flex items-center justify-between text-[12px]">
                <span className="font-medium">{g.name}</span>
                <span className="text-muted-foreground">
                  {g.current}/{g.target}
                </span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: "easeOut" }}
                  className={cn("h-full rounded-full", goalTone[g.tone])}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
        <Flame className="size-4 text-warning" />
        <div className="text-[12px]">
          <span className="font-medium">12-day streak</span>
          <span className="text-muted-foreground"> · keep it going</span>
        </div>
      </div>
    </Card>
  );
}

/* ============ Upcoming Interviews ============ */
const interviews = [
  {
    company: "Vercel",
    role: "Senior Frontend Engineer",
    when: "Tomorrow · 2:00 PM PT",
    type: "System Design",
    interviewer: "Guillermo R.",
    duration: "60m",
    tone: "brand" as const,
    icon: Video,
  },
  {
    company: "Stripe",
    role: "Staff Engineer, Payments",
    when: "Thu, Jul 3 · 10:00 AM PT",
    type: "Coding",
    interviewer: "Priya M.",
    duration: "90m",
    tone: "info" as const,
    icon: Video,
  },
  {
    company: "Linear",
    role: "Product Engineer",
    when: "Fri, Jul 4 · 11:30 AM PT",
    type: "Behavioral",
    interviewer: "Karri S.",
    duration: "45m",
    tone: "warning" as const,
    icon: Phone,
  },
];

function UpcomingInterviews() {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Upcoming Interviews</div>
          <div className="text-caption mt-0.5">Next 7 days</div>
        </div>
        <button className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground">
          View all <ChevronRight className="size-3" />
        </button>
      </div>
      <div className="mt-4 space-y-2.5">
        {interviews.map((iv, i) => (
          <motion.div
            key={iv.company}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
          >
            <div className={cn("grid size-10 place-items-center rounded-lg border", toneMap[iv.tone])}>
              <iv.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium">{iv.role}</span>
                <span className="text-caption">· {iv.company}</span>
              </div>
              <div className="text-caption mt-0.5 flex items-center gap-2">
                <Clock className="size-3" /> {iv.when} · {iv.duration} · with {iv.interviewer}
              </div>
            </div>
            <Badge tone={iv.tone === "brand" ? "brand" : iv.tone === "info" ? "info" : "warning"}>
              {iv.type}
            </Badge>
            <button className="grid size-8 place-items-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-white/10 hover:text-foreground group-hover:opacity-100">
              <ArrowUpRight className="size-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

/* ============ Today's Tasks ============ */
const tasks = [
  { done: true, text: "Send follow-up to Priya at Stripe", tag: "Follow-up", tone: "info" as const },
  { done: true, text: "Review system design notes for Vercel", tag: "Prep", tone: "brand" as const },
  { done: false, text: "Complete Leetcode 'LRU Cache' (Medium)", tag: "Practice", tone: "success" as const, due: "Today" },
  { done: false, text: "Tailor resume for Linear Product Engineer", tag: "Resume", tone: "warning" as const, due: "5:00 PM" },
  { done: false, text: "Reply to recruiter — Anthropic", tag: "Reply", tone: "info" as const, due: "EOD" },
  { done: false, text: "Post weekly update on /r/cscareerquestions", tag: "Network", tone: "brand" as const },
];

function TodaysTasks() {
  const remaining = tasks.filter((t) => !t.done).length;
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Today's Tasks</div>
          <div className="text-caption mt-0.5">
            {remaining} remaining · {tasks.length - remaining} done
          </div>
        </div>
        <button className="grid size-7 place-items-center rounded-md border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground">
          <Plus className="size-3.5" />
        </button>
      </div>
      <ul className="mt-4 space-y-1.5">
        {tasks.map((t, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="group flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white/[0.03]"
          >
            {t.done ? (
              <CheckCircle2 className="size-4 shrink-0 text-success" />
            ) : (
              <Circle className="size-4 shrink-0 text-muted-foreground/60 group-hover:text-foreground" />
            )}
            <span
              className={cn(
                "flex-1 text-[13px]",
                t.done && "text-muted-foreground line-through",
              )}
            >
              {t.text}
            </span>
            {t.due && !t.done && (
              <span className="text-[10px] text-muted-foreground">{t.due}</span>
            )}
            <Badge tone={t.tone}>{t.tag}</Badge>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

/* ============ Activity Timeline ============ */
const activity = [
  { icon: Trophy, tone: "success" as const, title: "Offer received from Notion", meta: "Senior SWE · $215k base · 2h ago" },
  { icon: CalendarClock, tone: "info" as const, title: "Vercel scheduled onsite for Jul 8", meta: "4 rounds · 5h ago" },
  { icon: Code2, tone: "brand" as const, title: "Solved 'Merge Intervals' in 18m", meta: "Medium · optimal O(n log n) · yesterday" },
  { icon: MessageSquare, tone: "info" as const, title: "Priya (Stripe) replied to your message", meta: "\"Excited to move you forward…\" · yesterday" },
  { icon: Briefcase, tone: "brand" as const, title: "Applied to Staff Engineer at Linear", meta: "Referral via Karri · 2 days ago" },
  { icon: XCircle, tone: "danger" as const, title: "Rejected after final round — Datadog", meta: "\"Not a fit at this level\" · 3 days ago" },
];

function ActivityTimeline() {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Recent Activity</div>
          <div className="text-caption mt-0.5">Your last 6 events</div>
        </div>
        <button className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground">
          Timeline <ChevronRight className="size-3" />
        </button>
      </div>
      <ul className="relative mt-5 space-y-4">
        <span className="absolute left-[15px] top-2 bottom-2 w-px bg-white/5" aria-hidden />
        {activity.map((a, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="relative flex gap-3"
          >
            <div
              className={cn(
                "z-10 grid size-8 shrink-0 place-items-center rounded-full border",
                toneMap[a.tone],
              )}
            >
              <a.icon className="size-3.5" />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <div className="text-[13px] font-medium">{a.title}</div>
              <div className="text-caption mt-0.5">{a.meta}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

/* ============ Recruiter Messages ============ */
const messages = [
  {
    name: "Priya Mehta",
    company: "Stripe",
    initials: "PM",
    text: "Excited to move you forward to the system design round. Any prep questions?",
    time: "1h",
    unread: true,
  },
  {
    name: "Karri Saarinen",
    company: "Linear",
    initials: "KS",
    text: "Team was impressed with your take-home. Can we do a final chat Friday?",
    time: "4h",
    unread: true,
  },
  {
    name: "Ivan Zhao",
    company: "Notion",
    initials: "IZ",
    text: "Offer sent to your inbox — happy to jump on a call to discuss comp.",
    time: "1d",
    unread: false,
  },
  {
    name: "Guillermo Rauch",
    company: "Vercel",
    initials: "GR",
    text: "Confirming Tue 2pm PT. Sending calendar invite with Zoom link now.",
    time: "2d",
    unread: false,
  },
];

function RecruiterMessages() {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Recruiter Messages</div>
          <div className="text-caption mt-0.5">2 unread</div>
        </div>
        <button className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground">
          Inbox <ChevronRight className="size-3" />
        </button>
      </div>
      <ul className="mt-4 divide-y divide-white/5">
        {messages.map((m, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="flex gap-3 py-3 first:pt-0"
          >
            <div className="relative">
              <div className="grid size-9 place-items-center rounded-full bg-gradient-brand text-[11px] font-semibold text-background">
                {m.initials}
              </div>
              {m.unread && (
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-surface bg-brand" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] font-medium">
                  {m.name} <span className="text-muted-foreground">· {m.company}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">{m.time}</div>
              </div>
              <div
                className={cn(
                  "mt-0.5 truncate text-[12px]",
                  m.unread ? "text-foreground/85" : "text-muted-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

/* ============ Resume Performance ============ */
const resumes = [
  { name: "Frontend — Product-focused", sent: 22, opens: 18, replies: 9, tone: "brand" as const },
  { name: "Staff/Platform Engineer", sent: 14, opens: 11, replies: 5, tone: "info" as const },
  { name: "Full-stack Generalist", sent: 11, opens: 6, replies: 2, tone: "warning" as const },
];

function ResumePerformance() {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Resume Performance</div>
          <div className="text-caption mt-0.5">Reply rate by version · Last 30 days</div>
        </div>
        <Badge tone="success">
          <TrendingUp className="size-3" /> 34% avg
        </Badge>
      </div>
      <div className="mt-5 space-y-3">
        {resumes.map((r, i) => {
          const openRate = Math.round((r.opens / r.sent) * 100);
          const replyRate = Math.round((r.replies / r.sent) * 100);
          return (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={cn("grid size-9 place-items-center rounded-lg border", toneMap[r.tone])}>
                    <FileText className="size-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium">{r.name}</div>
                    <div className="text-caption mt-0.5">{r.sent} sent · v3.2</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground">
                    <Eye className="size-3.5" />
                  </button>
                  <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground">
                    <MoreHorizontal className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Metric label="Open rate" value={`${openRate}%`} bar={openRate} tone="brand" />
                <Metric label="Reply rate" value={`${replyRate}%`} bar={replyRate} tone="success" />
                <Metric label="Replies" value={`${r.replies}`} bar={(r.replies / r.sent) * 100} tone="info" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}

function Metric({
  label,
  value,
  bar,
  tone,
}: {
  label: string;
  value: string;
  bar: number;
  tone: "brand" | "success" | "info";
}) {
  const c = { brand: "bg-brand", success: "bg-success", info: "bg-info" }[tone];
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-caption">{label}</span>
        <span className="text-[12px] font-medium">{value}</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${bar}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn("h-full rounded-full", c)}
        />
      </div>
    </div>
  );
}

/* ============ Interview Calendar Preview ============ */
function InterviewCalendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const cells = Array.from({ length: 35 }, (_, i) => i - 1); // July 2026, starts Wed
  const today = 1;
  const events: Record<number, { count: number; tone: "brand" | "info" | "warning" }> = {
    2: { count: 1, tone: "brand" },
    3: { count: 1, tone: "info" },
    4: { count: 1, tone: "warning" },
    8: { count: 2, tone: "brand" },
    11: { count: 1, tone: "info" },
    15: { count: 1, tone: "warning" },
    22: { count: 3, tone: "brand" },
  };

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">Interview Calendar</div>
          <div className="text-caption mt-0.5">July 2026 · 8 scheduled</div>
        </div>
        <button className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground">
          Full calendar <ChevronRight className="size-3" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-[11px]">
        {days.map((d, i) => (
          <div key={i} className="grid h-6 place-items-center text-muted-foreground/60">
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          const outside = d <= 0 || d > 31;
          const day = outside ? (d <= 0 ? 30 + d : d - 31) : d;
          const isToday = !outside && d === today;
          const ev = !outside ? events[d] : undefined;
          return (
            <button
              key={i}
              className={cn(
                "relative grid aspect-square place-items-center rounded-lg text-[12px] transition-colors",
                outside && "text-muted-foreground/25",
                !outside && !isToday && "hover:bg-white/5",
                isToday && "bg-brand text-brand-foreground font-semibold shadow-glow",
                ev && !isToday && "bg-white/[0.03] font-medium",
              )}
            >
              {day}
              {ev && (
                <span className="absolute bottom-1 flex gap-0.5">
                  {Array.from({ length: Math.min(ev.count, 3) }).map((_, k) => (
                    <span
                      key={k}
                      className={cn(
                        "size-1 rounded-full",
                        isToday
                          ? "bg-background/70"
                          : ev.tone === "brand"
                            ? "bg-brand"
                            : ev.tone === "info"
                              ? "bg-info"
                              : "bg-warning",
                      )}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-brand/20 bg-brand/5 p-3">
        <div className="flex items-center gap-2.5">
          <Zap className="size-4 text-brand" />
          <div>
            <div className="text-[12px] font-medium">Next up: Vercel · System Design</div>
            <div className="text-[11px] text-muted-foreground">Tomorrow at 2:00 PM PT</div>
          </div>
        </div>
        <button className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-medium text-brand-foreground">
          Prep
        </button>
      </div>
    </Card>
  );
}

// silence unused
void ChartCard;
