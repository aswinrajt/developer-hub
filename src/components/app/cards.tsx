import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  CalendarClock,
  Download,
  Eye,
  FileText,
  MapPin,
  MoreHorizontal,
  Star,
  TrendingUp,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./primitives";

/* ---------- Base card ---------- */
export function Card({
  children,
  className,
  interactive = true,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: React.ElementType;
}) {
  const Comp = interactive ? motion(As) : As;
  const motionProps = interactive
    ? {
        whileHover: { y: -2 },
        transition: { duration: 0.2 },
      }
    : {};
  return (
    <Comp
      {...motionProps}
      className={cn(
        "group relative rounded-2xl border border-white/10 bg-surface p-5 shadow-card transition-colors",
        interactive && "hover:border-white/15 hover:bg-surface-elevated",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

/* ---------- Analytics ---------- */
export function AnalyticsCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon = TrendingUp,
  sparkline = [30, 42, 38, 55, 48, 68, 72, 65, 80, 76, 88, 95],
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: LucideIcon;
  sparkline?: number[];
}) {
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-brand">
          <Icon className="size-4" />
        </div>
        {delta && (
          <span className={cn("text-xs font-medium", trendColor)}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {delta}
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="text-caption">{label}</div>
        <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
      </div>
      <div className="mt-4 flex h-10 items-end gap-[3px]">
        {sparkline.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-brand/20 to-brand/60"
            style={{ height: `${v}%` }}
          />
        ))}
      </div>
    </Card>
  );
}

/* ---------- Resume ---------- */
export function ResumeCard({
  title,
  updated,
  tag,
  sends,
  responseRate,
}: {
  title: string;
  updated: string;
  tag: string;
  sends: number;
  responseRate: string;
}) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-white/10 to-white/5">
          <FileText className="size-5 text-brand" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-card-title">{title}</div>
              <div className="text-caption mt-0.5">Updated {updated}</div>
            </div>
            <IconAction />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge tone="brand">{tag}</Badge>
            <Badge tone="muted">PDF · 2 pages</Badge>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/5 pt-4 text-sm">
        <div>
          <div className="text-caption">Sent</div>
          <div className="mt-0.5 font-semibold">{sends}</div>
        </div>
        <div>
          <div className="text-caption">Response rate</div>
          <div className="mt-0.5 font-semibold text-success">{responseRate}</div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-lg border border-white/10 bg-white/5 py-1.5 text-xs font-medium hover:bg-white/10">
          <Eye className="mr-1.5 inline size-3" /> Preview
        </button>
        <button className="flex-1 rounded-lg border border-white/10 bg-white/5 py-1.5 text-xs font-medium hover:bg-white/10">
          <Download className="mr-1.5 inline size-3" /> Export
        </button>
      </div>
    </Card>
  );
}

/* ---------- Company ---------- */
export function CompanyCard({
  name,
  industry,
  location,
  openRoles,
  starred = false,
}: {
  name: string;
  industry: string;
  location: string;
  openRoles: number;
  starred?: boolean;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] text-lg font-semibold">
            {name[0]}
          </div>
          <div>
            <div className="text-card-title">{name}</div>
            <div className="text-caption mt-0.5">{industry}</div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-warning">
          <Star className={cn("size-4", starred && "fill-warning text-warning")} />
        </button>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" /> {location}
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-3" /> 500–1k
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div>
          <div className="text-xl font-semibold">{openRoles}</div>
          <div className="text-caption">Open roles</div>
        </div>
        <button className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/5">
          View <ArrowUpRight className="size-3" />
        </button>
      </div>
    </Card>
  );
}

/* ---------- Job ---------- */
export function JobCard({
  company,
  role,
  stage,
  salary,
  location,
  posted,
  logo,
}: {
  company: string;
  role: string;
  stage: string;
  salary: string;
  location: string;
  posted: string;
  logo?: string;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/5 font-semibold">
            {logo ?? company[0]}
          </div>
          <div className="min-w-0">
            <div className="text-card-title truncate">{role}</div>
            <div className="text-caption mt-0.5 flex items-center gap-2">
              <Building2 className="size-3" /> {company}
            </div>
          </div>
        </div>
        <Badge tone="brand">{stage}</Badge>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" /> {location}
        </span>
        <span>{salary}</span>
        <span>Posted {posted}</span>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex -space-x-1.5">
          {["P", "M", "S"].map((c) => (
            <div
              key={c}
              className="grid size-6 place-items-center rounded-full border-2 border-surface bg-gradient-brand text-[10px] font-semibold text-background"
            >
              {c}
            </div>
          ))}
          <div className="grid size-6 place-items-center rounded-full border-2 border-surface bg-white/5 text-[10px] text-muted-foreground">
            +2
          </div>
        </div>
        <div className="text-caption">3 interviews scheduled</div>
      </div>
    </Card>
  );
}

/* ---------- Interview ---------- */
export function InterviewCard({
  role,
  company,
  when,
  duration,
  type,
  interviewers,
}: {
  role: string;
  company: string;
  when: string;
  duration: string;
  type: string;
  interviewers: string[];
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/5 bg-gradient-to-br from-brand/10 to-transparent p-5">
        <div className="flex items-center justify-between">
          <Badge tone="info" icon={<Video className="size-3" />}>
            {type}
          </Badge>
          <div className="text-caption">In 2 days</div>
        </div>
        <div className="mt-3 text-card-title">{role}</div>
        <div className="text-caption mt-1">{company}</div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm">
          <CalendarClock className="size-4 text-brand" />
          <span className="font-medium">{when}</span>
          <span className="text-muted-foreground">· {duration}</span>
        </div>
        <div className="mt-4">
          <div className="text-caption mb-2">Interviewers</div>
          <div className="flex flex-wrap gap-1.5">
            {interviewers.map((n) => (
              <span
                key={n}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs"
              >
                <span className="grid size-4 place-items-center rounded-full bg-gradient-brand text-[9px] font-semibold text-background">
                  {n[0]}
                </span>
                {n}
              </span>
            ))}
          </div>
        </div>
        <button className="mt-5 w-full rounded-lg bg-foreground py-2 text-xs font-medium text-background hover:bg-foreground/90">
          Open prep notes
        </button>
      </div>
    </Card>
  );
}

/* ---------- Document ---------- */
export function DocumentCard({
  name,
  kind,
  size,
  modified,
}: {
  name: string;
  kind: string;
  size: string;
  modified: string;
}) {
  return (
    <Card className="flex items-center gap-4 py-4">
      <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/5">
        <FileText className="size-5 text-brand" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-medium">{name}</div>
        <div className="text-caption mt-0.5">
          {kind} · {size} · {modified}
        </div>
      </div>
      <IconAction />
    </Card>
  );
}

/* ---------- Feature ---------- */
export function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <Card>
      <div className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-brand">
        <Icon className="size-5" />
      </div>
      <div className="mt-5 text-card-title">{title}</div>
      <p className="text-subtitle mt-2">{body}</p>
    </Card>
  );
}

/* ---------- Chart ---------- */
export function ChartCard({
  title,
  subtitle,
  value,
  delta,
  data = [40, 55, 48, 68, 72, 65, 88, 82, 95, 90, 78, 100],
}: {
  title: string;
  subtitle?: string;
  value: string;
  delta?: string;
  data?: number[];
}) {
  const w = 320;
  const h = 100;
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`)
    .join(" ");
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-card-title">{title}</div>
          {subtitle && <div className="text-caption mt-0.5">{subtitle}</div>}
        </div>
        <div className="flex gap-1 rounded-md border border-white/10 bg-white/5 p-0.5 text-[11px]">
          {["7d", "30d", "90d"].map((r, i) => (
            <button
              key={r}
              className={cn(
                "rounded px-2 py-0.5",
                i === 1
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {delta && <div className="text-xs font-medium text-success">↑ {delta}</div>}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-24 w-full">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.14 195)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.78 0.14 195)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#chartFill)" />
        <polyline
          points={points}
          fill="none"
          stroke="oklch(0.82 0.16 210)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Card>
  );
}

/* ---------- Shared ---------- */
function IconAction() {
  return (
    <button className="grid size-7 place-items-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-white/10 hover:text-foreground group-hover:opacity-100">
      <MoreHorizontal className="size-4" />
    </button>
  );
}
