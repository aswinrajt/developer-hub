import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CalendarRange,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Flame,
  Send,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · DevTrack" },
      {
        name: "description",
        content:
          "Executive-grade analytics for your job search — application velocity, response rates, offer conversion, and resume performance.",
      },
    ],
  }),
  component: AnalyticsPage,
});

// -------------------- Palette --------------------
const C = {
  brand: "#22d3ee",
  brand2: "#0ea5e9",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
  violet: "#a78bfa",
  sky: "#38bdf8",
  slate: "rgba(148, 163, 184, 0.35)",
  grid: "rgba(255,255,255,0.06)",
  axis: "rgba(148, 163, 184, 0.65)",
};

// -------------------- Data --------------------
const APPLICATIONS_OVER_TIME = [
  { m: "Jan", applied: 8, interviews: 2, offers: 0 },
  { m: "Feb", applied: 14, interviews: 4, offers: 0 },
  { m: "Mar", applied: 22, interviews: 7, offers: 1 },
  { m: "Apr", applied: 18, interviews: 6, offers: 0 },
  { m: "May", applied: 26, interviews: 10, offers: 2 },
  { m: "Jun", applied: 34, interviews: 13, offers: 2 },
  { m: "Jul", applied: 29, interviews: 12, offers: 3 },
];

const FUNNEL = [
  { stage: "Applied", value: 151, pct: 100 },
  { stage: "Response", value: 68, pct: 45 },
  { stage: "Interview", value: 54, pct: 36 },
  { stage: "Final Round", value: 18, pct: 12 },
  { stage: "Offer", value: 8, pct: 5.3 },
];

const RESUMES = [
  { name: "Senior · Backend", sent: 42, replies: 24, offers: 4, rate: 57 },
  { name: "Staff · Systems", sent: 28, replies: 14, offers: 2, rate: 50 },
  { name: "Fullstack · TS", sent: 36, replies: 15, offers: 1, rate: 42 },
  { name: "Frontend · React", sent: 31, replies: 11, offers: 1, rate: 35 },
  { name: "Platform · Go", sent: 14, replies: 4, offers: 0, rate: 29 },
];

const COMPANIES = [
  { name: "Stripe", sent: 4, replies: 4, avgHours: 18, status: "Final" },
  { name: "Linear", sent: 3, replies: 3, avgHours: 12, status: "Offer" },
  { name: "Vercel", sent: 3, replies: 3, avgHours: 22, status: "Interview" },
  { name: "Anthropic", sent: 2, replies: 2, avgHours: 30, status: "Interview" },
  { name: "Cloudflare", sent: 4, replies: 3, avgHours: 46, status: "Applied" },
  { name: "Ramp", sent: 3, replies: 2, avgHours: 40, status: "Assessment" },
  { name: "Notion", sent: 2, replies: 1, avgHours: 62, status: "Applied" },
];

const ACTIVITY = [
  { m: "Jan", value: 9 },
  { m: "Feb", value: 16 },
  { m: "Mar", value: 24 },
  { m: "Apr", value: 20 },
  { m: "May", value: 31 },
  { m: "Jun", value: 42 },
  { m: "Jul", value: 34 },
];

const RESPONSE_MIX = [
  { name: "Positive", value: 42, color: C.emerald },
  { name: "Rejected", value: 26, color: C.rose },
  { name: "No Reply", value: 83, color: C.slate },
];

const RADAR = [
  { axis: "Reach out", A: 78 },
  { axis: "Follow up", A: 62 },
  { axis: "Prep", A: 85 },
  { axis: "Coding", A: 71 },
  { axis: "System Design", A: 58 },
  { axis: "Networking", A: 46 },
];

const GOALS = [
  { name: "Applications", value: 151, target: 180, fill: C.brand },
  { name: "Interviews", value: 54, target: 60, fill: C.violet },
  { name: "Offers", value: 8, target: 10, fill: C.emerald },
  { name: "Referrals", value: 12, target: 20, fill: C.amber },
];

// -------------------- Page --------------------
function AnalyticsPage() {
  const [range, setRange] = useState<"30d" | "90d" | "YTD" | "All">("90d");

  const kpis = useMemo(() => {
    const total = APPLICATIONS_OVER_TIME.reduce((a, b) => a + b.applied, 0);
    const interviews = APPLICATIONS_OVER_TIME.reduce(
      (a, b) => a + b.interviews,
      0,
    );
    const offers = APPLICATIONS_OVER_TIME.reduce((a, b) => a + b.offers, 0);
    return { total, interviews, offers };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar active="Analytics" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  <BarChart3 className="size-3.5" /> Career Analytics
                </div>
                <h1 className="text-page">Executive Overview</h1>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Track velocity, response rates, and conversion across every
                  application. Signals to help you invest time where it
                  compounds.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-white/10 bg-surface p-0.5">
                  {(["30d", "90d", "YTD", "All"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRange(r)}
                      className={cn(
                        "h-7 rounded-md px-2.5 text-[12px] transition-colors",
                        range === r
                          ? "bg-white/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <Button variant="secondary" size="sm">
                  <Download className="size-3.5" /> Export
                </Button>
                <Button variant="brand" size="sm">
                  <Sparkles className="size-3.5" /> AI Summary
                </Button>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              <Kpi
                icon={<Send className="size-4" />}
                label="Applications"
                value={String(kpis.total)}
                delta="+22%"
                positive
                spark={[6, 8, 10, 14, 11, 18, 22, 26, 29, 34, 29]}
              />
              <Kpi
                icon={<CheckCircle2 className="size-4" />}
                label="Interview Rate"
                value="36%"
                delta="+4.2pt"
                positive
                spark={[22, 25, 28, 30, 29, 32, 34, 35, 36]}
              />
              <Kpi
                icon={<Trophy className="size-4" />}
                label="Offer Rate"
                value="5.3%"
                delta="+1.1pt"
                positive
                spark={[2, 3, 3, 4, 4, 5, 5, 5.3]}
              />
              <Kpi
                icon={<Zap className="size-4" />}
                label="Response Rate"
                value="45%"
                delta="+6.4pt"
                positive
                spark={[28, 30, 32, 34, 38, 40, 42, 45]}
              />
              <Kpi
                icon={<Clock className="size-4" />}
                label="Avg. Response"
                value="2.4d"
                delta="-0.6d"
                positive
                spark={[4, 4, 3.5, 3.2, 3, 2.8, 2.6, 2.4]}
              />
              <Kpi
                icon={<Building2 className="size-4" />}
                label="Companies"
                value="84"
                delta="+9"
                positive
                spark={[50, 55, 61, 66, 70, 74, 78, 84]}
              />
            </div>

            {/* Row 1: Applications over time + Funnel */}
            <div className="mt-6 grid grid-cols-1 gap-3 xl:grid-cols-3">
              <Card
                className="xl:col-span-2"
                title="Applications Over Time"
                subtitle="Applied vs. interviews vs. offers"
                icon={<CalendarRange className="size-3.5" />}
              >
                <ChartFrame height={280}>
                  <AreaChart
                    data={APPLICATIONS_OVER_TIME}
                    margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
                  >
                    <defs>
                      <linearGradient id="g-applied" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.brand} stopOpacity={0.55} />
                        <stop offset="100%" stopColor={C.brand} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-int" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.violet} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={C.violet} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-off" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.emerald} stopOpacity={0.55} />
                        <stop offset="100%" stopColor={C.emerald} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={C.grid} vertical={false} />
                    <XAxis
                      dataKey="m"
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<PrettyTooltip />} />
                    <Legend content={<PrettyLegend />} />
                    <Area
                      type="monotone"
                      dataKey="applied"
                      stroke={C.brand}
                      strokeWidth={2}
                      fill="url(#g-applied)"
                      animationDuration={900}
                    />
                    <Area
                      type="monotone"
                      dataKey="interviews"
                      stroke={C.violet}
                      strokeWidth={2}
                      fill="url(#g-int)"
                      animationDuration={900}
                    />
                    <Area
                      type="monotone"
                      dataKey="offers"
                      stroke={C.emerald}
                      strokeWidth={2}
                      fill="url(#g-off)"
                      animationDuration={900}
                    />
                  </AreaChart>
                </ChartFrame>
              </Card>

              <Card
                title="Conversion Funnel"
                subtitle="From applied to signed offer"
                icon={<Target className="size-3.5" />}
              >
                <div className="space-y-3 pt-2">
                  {FUNNEL.map((f, i) => (
                    <motion.div
                      key={f.stage}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="mb-1 flex items-center justify-between text-[12px]">
                        <span className="text-muted-foreground">{f.stage}</span>
                        <span className="tabular-nums">
                          <b>{f.value}</b>{" "}
                          <span className="text-muted-foreground">
                            · {f.pct}%
                          </span>
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${f.pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.06 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${C.brand}, ${C.brand2})`,
                            boxShadow: `0 0 20px ${C.brand}33`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                  <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-[12px] text-muted-foreground">
                    <div className="font-medium text-foreground">Insight</div>
                    Your applied → response conversion is <b>45%</b>, well above
                    the 22% market average.
                  </div>
                </div>
              </Card>
            </div>

            {/* Row 2: Response mix + Activity + Goals */}
            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
              <Card
                title="Response Mix"
                subtitle="How companies replied"
                icon={<Zap className="size-3.5" />}
              >
                <ChartFrame height={240}>
                  <PieChart>
                    <defs>
                      {RESPONSE_MIX.map((r, i) => (
                        <linearGradient
                          key={i}
                          id={`pie-${i}`}
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={r.color} stopOpacity={1} />
                          <stop
                            offset="100%"
                            stopColor={r.color}
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                      ))}
                    </defs>
                    <Tooltip content={<PrettyTooltip />} />
                    <Pie
                      data={RESPONSE_MIX}
                      dataKey="value"
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={3}
                      stroke="none"
                      animationDuration={800}
                    >
                      {RESPONSE_MIX.map((_, i) => (
                        <Cell key={i} fill={`url(#pie-${i})`} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartFrame>
                <div className="mt-1 flex flex-col gap-2 px-2">
                  {RESPONSE_MIX.map((r) => (
                    <div
                      key={r.name}
                      className="flex items-center justify-between text-[12px]"
                    >
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span
                          className="size-2 rounded-full"
                          style={{ background: r.color }}
                        />
                        {r.name}
                      </span>
                      <span className="tabular-nums">{r.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                title="Most Active Months"
                subtitle="Total activity per month"
                icon={<Flame className="size-3.5" />}
              >
                <ChartFrame height={240}>
                  <BarChart
                    data={ACTIVITY}
                    margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
                  >
                    <defs>
                      <linearGradient id="g-bar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.brand} stopOpacity={1} />
                        <stop offset="100%" stopColor={C.brand2} stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={C.grid} vertical={false} />
                    <XAxis
                      dataKey="m"
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<PrettyTooltip />}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#g-bar)"
                      radius={[6, 6, 0, 0]}
                      animationDuration={800}
                    />
                  </BarChart>
                </ChartFrame>
                <div className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3 text-[12px]">
                  <span className="text-muted-foreground">Peak month</span>
                  <span className="font-medium">June · 42 events</span>
                </div>
              </Card>

              <Card
                title="Goal Completion"
                subtitle="Q3 targets"
                icon={<Target className="size-3.5" />}
              >
                <ChartFrame height={240}>
                  <RadialBarChart
                    data={GOALS.map((g) => ({
                      ...g,
                      pct: Math.round((g.value / g.target) * 100),
                    }))}
                    innerRadius="30%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />
                    <RadialBar
                      background={{ fill: "rgba(255,255,255,0.05)" }}
                      dataKey="pct"
                      cornerRadius={10}
                      animationDuration={900}
                    />
                    <Tooltip content={<PrettyTooltip />} />
                  </RadialBarChart>
                </ChartFrame>
                <div className="mt-1 space-y-1.5 px-1">
                  {GOALS.map((g) => (
                    <div
                      key={g.name}
                      className="flex items-center justify-between text-[12px]"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="size-2 rounded-full"
                          style={{ background: g.fill }}
                        />
                        {g.name}
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        {g.value}/{g.target} ·{" "}
                        {Math.round((g.value / g.target) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Row 3: Resume performance + Companies */}
            <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-5">
              <Card
                className="xl:col-span-3"
                title="Resume Performance"
                subtitle="Reply rate per resume version"
                icon={<FileText className="size-3.5" />}
                right={
                  <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300">
                    <Trophy className="size-3" /> Top: Senior · Backend
                  </div>
                }
              >
                <ChartFrame height={280}>
                  <BarChart
                    data={RESUMES}
                    layout="vertical"
                    margin={{ top: 8, right: 24, bottom: 0, left: 8 }}
                  >
                    <defs>
                      <linearGradient id="g-rate" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={C.brand2} stopOpacity={0.9} />
                        <stop offset="100%" stopColor={C.brand} stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={C.grid} horizontal={false} />
                    <XAxis
                      type="number"
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 70]}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={130}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      content={<PrettyTooltip suffix="%" />}
                    />
                    <Bar
                      dataKey="rate"
                      fill="url(#g-rate)"
                      radius={[0, 8, 8, 0]}
                      animationDuration={800}
                    />
                  </BarChart>
                </ChartFrame>
                <div className="mt-2 overflow-hidden rounded-lg border border-white/10">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-white/[0.03] text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="px-3 py-2 text-left font-medium">Resume</th>
                        <th className="px-3 py-2 text-right font-medium">Sent</th>
                        <th className="px-3 py-2 text-right font-medium">
                          Replies
                        </th>
                        <th className="px-3 py-2 text-right font-medium">
                          Offers
                        </th>
                        <th className="px-3 py-2 text-right font-medium">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RESUMES.map((r) => (
                        <tr
                          key={r.name}
                          className="border-t border-white/5 hover:bg-white/[0.02]"
                        >
                          <td className="px-3 py-2 font-medium">{r.name}</td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {r.sent}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {r.replies}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">
                            {r.offers}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums text-brand">
                            {r.rate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card
                className="xl:col-span-2"
                title="Most Responsive Companies"
                subtitle="Fastest to reply, ranked"
                icon={<Building2 className="size-3.5" />}
              >
                <div className="space-y-2 pt-1">
                  {COMPANIES.map((c, i) => {
                    const responsiveness = Math.max(
                      10,
                      100 - Math.min(100, c.avgHours),
                    );
                    return (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
                      >
                        <div className="flex items-center justify-between text-[12.5px]">
                          <div className="flex items-center gap-2">
                            <span className="grid size-6 place-items-center rounded-md bg-gradient-to-br from-brand/30 to-brand/10 text-[10px] font-bold">
                              {c.name[0]}
                            </span>
                            <div>
                              <div className="font-medium">{c.name}</div>
                              <div className="text-[10.5px] text-muted-foreground">
                                {c.sent} sent · {c.replies} replies
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[12px] tabular-nums">
                              {c.avgHours}h
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              avg reply
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${responsiveness}%` }}
                            transition={{ duration: 0.7, delay: i * 0.05 }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${C.brand}, ${C.violet})`,
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Row 4: Rate trend line + Radar */}
            <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
              <Card
                className="xl:col-span-2"
                title="Interview & Offer Rates"
                subtitle="Rolling conversion by month"
                icon={<BarChart3 className="size-3.5" />}
              >
                <ChartFrame height={260}>
                  <LineChart
                    data={APPLICATIONS_OVER_TIME.map((r) => ({
                      m: r.m,
                      interview: Math.round((r.interviews / r.applied) * 100),
                      offer: Math.round((r.offers / r.applied) * 1000) / 10,
                    }))}
                    margin={{ top: 8, right: 12, bottom: 0, left: -16 }}
                  >
                    <CartesianGrid stroke={C.grid} vertical={false} />
                    <XAxis
                      dataKey="m"
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={C.axis}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <Tooltip content={<PrettyTooltip suffix="%" />} />
                    <Legend content={<PrettyLegend />} />
                    <Line
                      type="monotone"
                      dataKey="interview"
                      stroke={C.violet}
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: C.violet }}
                      activeDot={{ r: 5 }}
                      animationDuration={900}
                    />
                    <Line
                      type="monotone"
                      dataKey="offer"
                      stroke={C.emerald}
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: C.emerald }}
                      activeDot={{ r: 5 }}
                      animationDuration={900}
                    />
                  </LineChart>
                </ChartFrame>
              </Card>

              <Card
                title="Effort Distribution"
                subtitle="Where your time went"
                icon={<Sparkles className="size-3.5" />}
              >
                <ChartFrame height={260}>
                  <RadarChart data={RADAR}>
                    <defs>
                      <linearGradient id="g-radar" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={C.brand} stopOpacity={0.7} />
                        <stop
                          offset="100%"
                          stopColor={C.violet}
                          stopOpacity={0.5}
                        />
                      </linearGradient>
                    </defs>
                    <PolarGrid stroke={C.grid} />
                    <PolarAngleAxis
                      dataKey="axis"
                      tick={{ fill: C.axis, fontSize: 10 }}
                    />
                    <Radar
                      dataKey="A"
                      stroke={C.brand}
                      strokeWidth={2}
                      fill="url(#g-radar)"
                      fillOpacity={0.9}
                      animationDuration={900}
                    />
                    <Tooltip content={<PrettyTooltip />} />
                  </RadarChart>
                </ChartFrame>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// -------------------- KPI --------------------
function Kpi({
  icon,
  label,
  value,
  delta,
  positive,
  spark,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  spark: number[];
}) {
  const data = spark.map((v, i) => ({ i, v }));
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-4 transition-colors hover:border-white/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {icon}
          {label}
        </div>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <div className="text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </div>
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-[11px] font-medium",
              positive ? "text-emerald-300" : "text-rose-300",
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {delta}
          </div>
        </div>
        <div className="h-10 w-20">
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient
                  id={`sp-${label.replace(/\s+/g, "")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={C.brand} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={C.brand} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={C.brand}
                strokeWidth={1.5}
                fill={`url(#sp-${label.replace(/\s+/g, "")})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

// -------------------- Card / Chart chrome --------------------
function Card({
  title,
  subtitle,
  icon,
  right,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "rounded-2xl border border-white/10 bg-surface p-4",
        className,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
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
        {right}
      </div>
      {children}
    </motion.section>
  );
}

function ChartFrame({
  height,
  children,
}: {
  height: number;
  children: React.ReactElement;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}

function PrettyTooltip({
  active,
  payload,
  label,
  suffix,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string; color?: string }>;
  label?: string | number;
  suffix?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-surface-elevated/95 px-3 py-2 text-[11.5px] shadow-elevated backdrop-blur">
      {label !== undefined && (
        <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      )}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span
              className="size-2 rounded-full"
              style={{ background: p.color }}
            />
            {p.name}
          </span>
          <span className="font-medium tabular-nums">
            {p.value}
            {suffix ?? ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function PrettyLegend({
  payload,
}: {
  payload?: Array<{ value?: string; color?: string }>;
}) {
  if (!payload) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] text-muted-foreground">
      {payload.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span
            className="size-2 rounded-full"
            style={{ background: p.color }}
          />
          {p.value}
        </span>
      ))}
    </div>
  );
}
