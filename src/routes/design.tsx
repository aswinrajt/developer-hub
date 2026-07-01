import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code2,
  Target,
  Users,
  Zap,
  Sparkles,
  Trash2,
  Plus,
  ArrowRight,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import {
  AnalyticsCard,
  ChartCard,
  CompanyCard,
  DocumentCard,
  FeatureCard,
  InterviewCard,
  JobCard,
  ResumeCard,
} from "@/components/app/cards";
import {
  Badge,
  Calendar,
  Checkbox,
  Input,
  Search,
  Select,
  Switch,
  Tag,
  Textarea,
} from "@/components/app/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "DevTrack — Design System" },
      {
        name: "description",
        content:
          "The visual language, components, and interaction primitives that power every DevTrack surface.",
      },
    ],
  }),
  component: DesignSystem,
});

function DesignSystem() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader />
      <div className="mx-auto max-w-7xl space-y-24 px-6 py-16">
        <FoundationsSection />
        <TypographySection />
        <ColorSection />
        <ButtonSection />
        <BadgeSection />
        <InputSection />
        <CardSection />
        <ChartSection />
        <NavigationSection />
        <MotionSection />
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
function PageHeader() {
  return (
    <header className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full grid-bg" />
      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-20">
        <div className="text-eyebrow">DevTrack · v1.0</div>
        <h1 className="text-hero mt-4 max-w-3xl">
          <span className="text-gradient-brand">The design system</span>
          <br />
          for every screen we ship.
        </h1>
        <p className="text-subtitle mt-5 max-w-xl text-lg">
          Tokens, primitives and patterns. One source of truth so product
          surfaces feel like the same product, no matter who built them.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button variant="brand" size="lg">
            <Sparkles className="size-4" /> Get started
          </Button>
          <Button variant="secondary" size="lg">
            <Copy className="size-4" /> Copy tokens
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Section shell ---------------- */
function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-white/5 pb-6">
        <div className="text-eyebrow">{eyebrow}</div>
        <h2 className="text-page mt-3">{title}</h2>
        {description && (
          <p className="text-subtitle mt-3 max-w-2xl text-base">{description}</p>
        )}
      </div>
      <div className="pt-10">{children}</div>
    </motion.section>
  );
}

function Tile({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-sm",
        className,
      )}
    >
      <div className="text-caption mb-4">{title}</div>
      {children}
    </div>
  );
}

/* ---------------- Foundations ---------------- */
function FoundationsSection() {
  const principles = [
    {
      t: "Quiet by default",
      d: "The interface disappears so the work can show up. Signal beats decoration.",
    },
    {
      t: "One primary action",
      d: "Every surface has exactly one thing that matters most. Everything else is secondary.",
    },
    {
      t: "Keyboard-first",
      d: "Every action reachable in two keys. The mouse is optional, not required.",
    },
    {
      t: "Density with air",
      d: "Dense where dev tools should be dense. Generous whitespace where reading matters.",
    },
  ];
  return (
    <Section
      eyebrow="Foundations"
      title="The rules behind the pixels."
      description="Four principles that resolve every design debate before it starts."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-white/10 bg-surface p-6"
          >
            <div className="font-mono text-[11px] text-brand">0{i + 1}</div>
            <div className="text-card-title mt-3">{p.t}</div>
            <p className="text-subtitle mt-2 text-sm">{p.d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Typography ---------------- */
function TypographySection() {
  const scale = [
    { name: "Hero heading", token: "text-hero", el: <div className="text-hero">Ship faster.</div> },
    {
      name: "Page heading",
      token: "text-page",
      el: <div className="text-page">Applications overview</div>,
    },
    {
      name: "Section heading",
      token: "text-section",
      el: <div className="text-section">Recent activity</div>,
    },
    {
      name: "Card title",
      token: "text-card-title",
      el: <div className="text-card-title">Senior Frontend Engineer</div>,
    },
    {
      name: "Subtitle",
      token: "text-subtitle",
      el: (
        <div className="text-subtitle">
          Tracking 47 active applications across 32 companies.
        </div>
      ),
    },
    {
      name: "Body",
      token: "text-body",
      el: (
        <div className="text-body max-w-md">
          The workspace stays out of your way. Log a role, tag the stage, get on
          with the interview. DevTrack keeps the audit trail so you don't have to.
        </div>
      ),
    },
    {
      name: "Caption",
      token: "text-caption",
      el: <div className="text-caption">Last updated 2 minutes ago</div>,
    },
    {
      name: "Eyebrow",
      token: "text-eyebrow",
      el: <div className="text-eyebrow">Now shipping</div>,
    },
    {
      name: "Mono",
      token: "text-mono",
      el: <div className="text-mono">GET /v1/applications</div>,
    },
  ];
  return (
    <Section
      eyebrow="Typography"
      title="One family. A scale that never breaks."
      description="Inter across the product, JetBrains Mono for code. Everything else is a token, not a decision."
    >
      <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-surface">
        {scale.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-1 items-baseline gap-4 px-6 py-6 md:grid-cols-[180px_140px_1fr]"
          >
            <div className="text-caption">{r.name}</div>
            <code className="text-mono text-muted-foreground">{r.token}</code>
            <div>{r.el}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Color ---------------- */
function ColorSection() {
  const tokens = [
    { name: "background", var: "--background", note: "Canvas" },
    { name: "surface", var: "--surface", note: "Card / panel" },
    { name: "surface-elevated", var: "--surface-elevated", note: "Popover / menu" },
    { name: "foreground", var: "--foreground", note: "Body text" },
    { name: "muted-foreground", var: "--muted-foreground", note: "Secondary text" },
    { name: "border", var: "--border", note: "Dividers" },
  ];
  const semantics = [
    { name: "brand", var: "--brand", note: "Primary accent" },
    { name: "brand-glow", var: "--brand-glow", note: "Highlight / halo" },
    { name: "success", var: "--success", note: "Positive state" },
    { name: "warning", var: "--warning", note: "Attention" },
    { name: "destructive", var: "--destructive", note: "Danger / delete" },
    { name: "info", var: "--info", note: "Informational" },
  ];
  return (
    <Section
      eyebrow="Color"
      title="A palette engineers can read at 2am."
      description="Neutral, deep, low-glare. Cyan brand for signal, not sparkle. Every color is a semantic token — never a hex."
    >
      <div className="space-y-6">
        <Tile title="Neutrals">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {tokens.map((t) => (
              <Swatch key={t.name} {...t} />
            ))}
          </div>
        </Tile>
        <Tile title="Semantic">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {semantics.map((t) => (
              <Swatch key={t.name} {...t} />
            ))}
          </div>
        </Tile>
        <Tile title="Gradients">
          <div className="grid gap-3 sm:grid-cols-3">
            <GradientSwatch
              name="Brand"
              css="bg-gradient-brand"
              hint="Primary CTA · logo"
            />
            <GradientSwatch
              name="Hero halo"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.16 250 / 0.35), transparent 70%)",
              }}
              hint="Hero backdrop"
            />
            <GradientSwatch
              name="Mesh"
              className="bg-mesh"
              hint="Ambient background wash"
            />
          </div>
        </Tile>
      </div>
    </Section>
  );
}

function Swatch({ name, var: v, note }: { name: string; var: string; note: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface p-3">
      <div
        className="size-10 shrink-0 rounded-lg border border-white/10"
        style={{ background: `var(${v})` }}
      />
      <div className="min-w-0">
        <div className="text-[13px] font-medium">{name}</div>
        <div className="text-caption truncate">{note}</div>
      </div>
    </div>
  );
}

function GradientSwatch({
  name,
  hint,
  css,
  style,
  className,
}: {
  name: string;
  hint: string;
  css?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className={cn("h-24", css, className)} style={style} />
      <div className="bg-surface p-3">
        <div className="text-[13px] font-medium">{name}</div>
        <div className="text-caption">{hint}</div>
      </div>
    </div>
  );
}

/* ---------------- Buttons ---------------- */
function ButtonSection() {
  return (
    <Section
      eyebrow="Buttons"
      title="One primary. Everything else is quiet."
      description="Rounded, spring-back on press, subtle glow on branded actions. Never two primaries in the same view."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Tile title="Variants">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="brand">
              <Sparkles /> Brand
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">
              <Trash2 /> Delete
            </Button>
          </div>
        </Tile>
        <Tile title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
          </div>
        </Tile>
        <Tile title="With icons">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">
              Continue <ArrowRight />
            </Button>
            <Button variant="secondary">
              <Plus /> Add role
            </Button>
            <Button variant="ghost">
              <Zap /> Automate
            </Button>
          </div>
        </Tile>
        <Tile title="Icon only">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="icon">
              <Plus />
            </Button>
            <Button variant="outline" size="icon">
              <Copy />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 />
            </Button>
            <Button variant="danger" size="icon">
              <Trash2 />
            </Button>
          </div>
        </Tile>
      </div>
    </Section>
  );
}

/* ---------------- Badges ---------------- */
function BadgeSection() {
  return (
    <Section
      eyebrow="Badges & tags"
      title="Small labels, exact meaning."
      description="Six tones mapped to system states. Never invent a color for a badge — pick the tone that matches the intent."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Tile title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">In progress</Badge>
            <Badge tone="success">Offer</Badge>
            <Badge tone="warning">Waiting</Badge>
            <Badge tone="danger">Rejected</Badge>
            <Badge tone="info">Scheduled</Badge>
            <Badge tone="muted">Draft</Badge>
          </div>
        </Tile>
        <Tile title="Tags">
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Systems design", "Distributed", "Rust"].map(
              (t) => (
                <Tag key={t} onRemove={() => {}}>
                  {t}
                </Tag>
              ),
            )}
          </div>
        </Tile>
      </div>
    </Section>
  );
}

/* ---------------- Inputs ---------------- */
function InputSection() {
  return (
    <Section
      eyebrow="Inputs"
      title="Form controls that stay out of the way."
      description="Consistent height, focus ring, and interaction across every text-, select- and toggle-style control."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Tile title="Search">
          <Search placeholder="Search applications, companies, notes…" />
        </Tile>
        <Tile title="Text input">
          <div className="space-y-3">
            <Input placeholder="Company name" />
            <Input placeholder="Salary expectation" defaultValue="$180,000" />
          </div>
        </Tile>
        <Tile title="Select / Dropdown">
          <Select
            placeholder="Stage"
            defaultValue="Onsite"
            options={["Applied", "Recruiter Call", "Technical", "Onsite", "Offer"]}
          />
        </Tile>
        <Tile title="Textarea">
          <Textarea
            defaultValue="Rehearse the edge-cache invalidation story. Bring the streaming SSR benchmark."
            rows={3}
          />
        </Tile>
        <Tile title="Toggles">
          <div className="flex flex-col gap-3">
            <Checkbox label="Send me follow-up reminders" defaultChecked />
            <Checkbox label="Auto-detect job posts from clipboard" />
            <Switch label="Weekly digest" defaultChecked />
            <Switch label="Public profile" />
          </div>
        </Tile>
        <Tile title="Calendar">
          <Calendar />
        </Tile>
      </div>
    </Section>
  );
}

/* ---------------- Cards ---------------- */
function CardSection() {
  return (
    <Section
      eyebrow="Cards"
      title="The unit of composition."
      description="Every list, board, and dashboard reuses the same handful of card shapes. Consistent radius, shadow, and hover lift."
    >
      <div className="space-y-6">
        <Tile title="Analytics">
          <div className="grid gap-4 md:grid-cols-3">
            <AnalyticsCard label="Applications sent" value="47" delta="12%" trend="up" />
            <AnalyticsCard
              label="Response rate"
              value="34%"
              delta="6%"
              trend="up"
              icon={Zap}
            />
            <AnalyticsCard
              label="Interviews scheduled"
              value="4"
              delta="1"
              trend="up"
              icon={Users}
            />
          </div>
        </Tile>

        <Tile title="Job & company">
          <div className="grid gap-4 md:grid-cols-2">
            <JobCard
              company="Vercel"
              role="Senior Frontend Engineer"
              stage="Onsite"
              salary="$210k–$260k"
              location="Remote · US"
              posted="4d ago"
            />
            <CompanyCard
              name="Linear"
              industry="Developer tools"
              location="San Francisco"
              openRoles={7}
              starred
            />
          </div>
        </Tile>

        <Tile title="Interview & resume">
          <div className="grid gap-4 md:grid-cols-2">
            <InterviewCard
              role="Senior Frontend Engineer"
              company="Vercel"
              when="Tue, Nov 12 · 10:00 AM"
              duration="60 min"
              type="Technical loop"
              interviewers={["Marcus Lin", "Elena Ruiz", "Sam Okafor"]}
            />
            <ResumeCard
              title="Frontend · Product-focused"
              updated="2 days ago"
              tag="Primary"
              sends={28}
              responseRate="41%"
            />
          </div>
        </Tile>

        <Tile title="Documents">
          <div className="grid gap-3 md:grid-cols-2">
            <DocumentCard
              name="Offer — Stripe (Infra Engineer).pdf"
              kind="Offer letter"
              size="284 KB"
              modified="Yesterday"
            />
            <DocumentCard
              name="Take-home — Linear cache challenge.zip"
              kind="Assignment"
              size="1.2 MB"
              modified="3 days ago"
            />
            <DocumentCard
              name="References — verified 2025.pdf"
              kind="Reference"
              size="88 KB"
              modified="Last week"
            />
            <DocumentCard
              name="Transcript — CS 2024.pdf"
              kind="Transcript"
              size="512 KB"
              modified="Sep 2025"
            />
          </div>
        </Tile>

        <Tile title="Feature">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={Briefcase}
              title="Application pipeline"
              body="Every role, every stage, every last-touch — one place."
            />
            <FeatureCard
              icon={Code2}
              title="Practice log"
              body="Log LeetCode and take-homes. Revisit the patterns you keep missing."
            />
            <FeatureCard
              icon={Target}
              title="Career goals"
              body="Set the role and comp you're aiming for. Every action rolls up."
            />
          </div>
        </Tile>
      </div>
    </Section>
  );
}

/* ---------------- Charts ---------------- */
function ChartSection() {
  return (
    <Section
      eyebrow="Data"
      title="Charts that don't shout."
      description="Simple linework, soft gradient fill, and one accent color. Numbers do the talking."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Applications over time"
          subtitle="Last 12 weeks"
          value="47"
          delta="12% vs. prior"
        />
        <ChartCard
          title="Response funnel"
          subtitle="Applied → Interview → Offer"
          value="34%"
          delta="6.1%"
          data={[100, 82, 70, 58, 44, 36, 28, 22, 18, 14, 9, 6]}
        />
      </div>
    </Section>
  );
}

/* ---------------- Navigation ---------------- */
function NavigationSection() {
  return (
    <Section
      eyebrow="Application shell"
      title="Sidebar and top nav, wired together."
      description="The exact shell every authenticated page mounts inside. Collapsible sidebar, sticky top bar, glassy backdrops."
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-background shadow-elevated">
        <div className="flex h-[560px]">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopNav />
            <div className="flex-1 overflow-auto bg-mesh p-8">
              <div className="text-eyebrow">Dashboard preview</div>
              <h3 className="text-page mt-3">Welcome back, Aditi.</h3>
              <p className="text-subtitle mt-3 max-w-md text-base">
                Four interviews this week. One follow-up overdue by a day.
                Two new roles matched your saved filters.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <AnalyticsCard label="Active applications" value="47" delta="12%" />
                <AnalyticsCard
                  label="Response rate"
                  value="34%"
                  delta="6%"
                  icon={Zap}
                />
                <AnalyticsCard
                  label="Interviews"
                  value="4"
                  delta="1"
                  icon={Users}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Motion ---------------- */
function MotionSection() {
  const specs = [
    {
      k: "Hover lift",
      v: "translateY(-2px), 200ms ease",
      p: "Cards, list rows, tiles.",
    },
    {
      k: "Press",
      v: "scale(0.98), 150ms ease-out",
      p: "Every button, every clickable pill.",
    },
    {
      k: "Popover / dropdown",
      v: "opacity + y(-4px) + scale(0.98), 150ms",
      p: "Menus, quick-add, notifications.",
    },
    {
      k: "Page transition",
      v: "opacity + y(20px), 500ms cubic-bezier",
      p: "Route-level enter animation.",
    },
    {
      k: "Active nav indicator",
      v: "layout spring, 250ms",
      p: "Sidebar rail on route change.",
    },
    {
      k: "Reveal on scroll",
      v: "opacity + y(20px), 500ms, viewport once",
      p: "Section headers, feature grids.",
    },
  ];
  return (
    <Section
      eyebrow="Motion"
      title="Subtle. Every time."
      description="Motion is punctuation, not paragraph. If you have to notice it, it's too much."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {specs.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-white/10 bg-surface p-5"
          >
            <div className="text-card-title">{s.k}</div>
            <code className="text-mono mt-2 block text-brand">{s.v}</code>
            <p className="text-subtitle mt-2 text-sm">{s.p}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
