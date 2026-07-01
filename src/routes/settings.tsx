import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  Bell,
  Shield,
  Palette,
  Plug,
  FileText,
  ClipboardList,
  Upload,
  Database,
  CreditCard,
  Receipt,
  KeyRound,
  Command,
  Check,
  Copy,
  Eye,
  EyeOff,
  Github,
  Linkedin,
  Chrome,
  Slack,
  Trash2,
  Download,
  Plus,
  Search,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Sun,
  Moon,
  Monitor,
  Globe,
  Clock,
  MapPin,
  Camera,
} from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · DevTrack" },
      {
        name: "description",
        content:
          "Manage your DevTrack profile, career preferences, notifications, integrations, and billing.",
      },
    ],
  }),
  component: SettingsPage,
});

type SectionId =
  | "profile"
  | "career"
  | "notifications"
  | "security"
  | "appearance"
  | "connected"
  | "resume"
  | "application"
  | "import"
  | "backup"
  | "subscription"
  | "billing"
  | "api"
  | "shortcuts";

const SECTIONS: {
  group: string;
  items: { id: SectionId; label: string; icon: React.ElementType; hint?: string }[];
}[] = [
  {
    group: "Account",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "career", label: "Career Preferences", icon: Briefcase },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "security", label: "Security", icon: Shield },
      { id: "appearance", label: "Appearance", icon: Palette },
    ],
  },
  {
    group: "Workspace",
    items: [
      { id: "connected", label: "Connected Accounts", icon: Plug },
      { id: "resume", label: "Resume Defaults", icon: FileText },
      { id: "application", label: "Application Defaults", icon: ClipboardList },
      { id: "shortcuts", label: "Keyboard Shortcuts", icon: Command },
    ],
  },
  {
    group: "Data",
    items: [
      { id: "import", label: "Import & Export", icon: Upload },
      { id: "backup", label: "Data Backup", icon: Database },
    ],
  },
  {
    group: "Plan",
    items: [
      { id: "subscription", label: "Subscription", icon: Sparkles },
      { id: "billing", label: "Billing", icon: Receipt },
      { id: "api", label: "API Keys", icon: KeyRound },
    ],
  },
];

function SettingsPage() {
  const [active, setActive] = useState<SectionId>("profile");
  const [query, setQuery] = useState("");

  const filtered = SECTIONS.map((g) => ({
    ...g,
    items: g.items.filter((i) =>
      i.label.toLowerCase().includes(query.toLowerCase()),
    ),
  })).filter((g) => g.items.length > 0);

  const title =
    SECTIONS.flatMap((g) => g.items).find((i) => i.id === active)?.label ?? "";

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar active="Dashboard" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1300px] gap-6 px-6 py-6 lg:px-8">
            {/* Secondary Sidebar */}
            <aside className="sticky top-0 hidden w-[260px] shrink-0 self-start lg:block">
              <div className="mb-3">
                <div className="mb-1.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Settings
                </div>
                <h1 className="text-page">Preferences</h1>
              </div>

              <div className="relative mb-3">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to…"
                  className="h-8 w-full rounded-lg border border-white/10 bg-surface pl-8 pr-2 text-[12.5px] outline-none placeholder:text-muted-foreground focus:border-brand/40"
                />
              </div>

              <nav className="space-y-4">
                {filtered.map((g) => (
                  <div key={g.group}>
                    <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
                      {g.group}
                    </div>
                    <ul className="space-y-0.5">
                      {g.items.map((it) => {
                        const isActive = active === it.id;
                        return (
                          <li key={it.id}>
                            <button
                              onClick={() => setActive(it.id)}
                              className={cn(
                                "group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors",
                                isActive
                                  ? "bg-white/5 text-foreground"
                                  : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
                              )}
                            >
                              {isActive && (
                                <motion.span
                                  layoutId="settings-active"
                                  className="absolute inset-y-1 left-0 w-[2px] rounded-r bg-brand"
                                />
                              )}
                              <it.icon className="size-[14px]" />
                              <span className="flex-1 truncate">{it.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {/* Mobile tabs */}
              <div className="mb-4 flex items-center gap-2 overflow-x-auto lg:hidden">
                {SECTIONS.flatMap((g) => g.items).map((it) => (
                  <button
                    key={it.id}
                    onClick={() => setActive(it.id)}
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px]",
                      active === it.id
                        ? "border-brand/40 bg-brand/10 text-foreground"
                        : "border-white/10 bg-surface text-muted-foreground",
                    )}
                  >
                    <it.icon className="size-3.5" /> {it.label}
                  </button>
                ))}
              </div>

              <div className="mb-5 border-b border-white/10 pb-4">
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {DESCRIPTIONS[active]}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {active === "profile" && <ProfileSection />}
                  {active === "career" && <CareerSection />}
                  {active === "notifications" && <NotificationsSection />}
                  {active === "security" && <SecuritySection />}
                  {active === "appearance" && <AppearanceSection />}
                  {active === "connected" && <ConnectedSection />}
                  {active === "resume" && <ResumeDefaultsSection />}
                  {active === "application" && <ApplicationDefaultsSection />}
                  {active === "import" && <ImportExportSection />}
                  {active === "backup" && <BackupSection />}
                  {active === "subscription" && <SubscriptionSection />}
                  {active === "billing" && <BillingSection />}
                  {active === "api" && <ApiKeysSection />}
                  {active === "shortcuts" && <ShortcutsSection />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const DESCRIPTIONS: Record<SectionId, string> = {
  profile: "Your name, photo, and public presence.",
  career: "Roles, locations, and comp expectations DevTrack matches against.",
  notifications: "Choose exactly what reaches you — and how.",
  security: "Password, sessions, and two-factor authentication.",
  appearance: "Theme, density, and typography.",
  connected: "Sign-in providers and third-party integrations.",
  resume: "The version DevTrack picks up by default.",
  application: "Sensible defaults every time you log a new role.",
  import: "Bring in data from spreadsheets and other trackers.",
  backup: "Automated exports and restore points.",
  subscription: "Your current plan, seats, and renewal.",
  billing: "Invoices, receipts, and payment method.",
  api: "Personal access tokens for integrations and scripts.",
  shortcuts: "Everything you can do without leaving the keyboard.",
};

// -------------------- Primitives --------------------
function Panel({
  title,
  description,
  action,
  children,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-surface">
      {(title || description || action) && (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 p-5">
          <div>
            {title && (
              <h3 className="text-[14.5px] font-semibold tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
  cols = 1,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  cols?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        "grid gap-2",
        cols === 2 ? "md:grid-cols-[220px_1fr] md:items-start md:gap-6" : "",
      )}
    >
      <div>
        <label className="text-[12.5px] font-medium">{label}</label>
        {hint && (
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">{hint}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-9 w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/40 focus:ring-1 focus:ring-brand/30",
        props.className,
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[88px] w-full rounded-lg border border-white/10 bg-white/[0.02] p-3 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/40 focus:ring-1 focus:ring-brand/30",
        props.className,
      )}
    />
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange?: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-9 w-full appearance-none rounded-lg border border-white/10 bg-white/[0.02] px-3 text-[13px] outline-none focus:border-brand/40"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-brand" : "bg-white/10",
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "inline-block size-4 rounded-full bg-background shadow",
          checked ? "translate-x-[18px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function Row({
  title,
  description,
  right,
  icon,
}: {
  title: string;
  description?: string;
  right: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5">
      <div className="flex min-w-0 items-start gap-3">
        {icon && (
          <div className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-muted-foreground">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[13px] font-medium">{title}</div>
          {description && (
            <div className="mt-0.5 text-[12px] text-muted-foreground">
              {description}
            </div>
          )}
        </div>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-[11.5px]">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      )}
    </span>
  );
}

function SaveBar() {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-white/10 bg-surface/60 px-5 py-3 -mx-5 -mb-5 rounded-b-2xl">
      <Button variant="secondary" size="sm">
        Cancel
      </Button>
      <Button variant="brand" size="sm">
        <Check className="size-3.5" /> Save changes
      </Button>
    </div>
  );
}

// -------------------- Sections --------------------

function ProfileSection() {
  const [name, setName] = useState("Aditi Rao");
  const [handle, setHandle] = useState("aditi");
  const [bio, setBio] = useState(
    "Senior backend engineer focused on distributed systems and developer platforms.",
  );
  return (
    <Panel title="Public profile" description="How you appear inside DevTrack.">
      <div className="space-y-6">
        <Field label="Avatar" hint="PNG or JPG, at least 400×400." cols={2}>
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-full bg-gradient-brand text-lg font-semibold text-background shadow-glow">
              AR
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Camera className="size-3.5" /> Upload
              </Button>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </Field>
        <Field label="Full name" cols={2}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Username" hint="devtrack.io/@handle" cols={2}>
          <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.02]">
            <span className="px-3 text-[13px] text-muted-foreground">@</span>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="h-9 flex-1 bg-transparent pr-3 text-[13px] outline-none"
            />
          </div>
        </Field>
        <Field label="Email" cols={2}>
          <Input type="email" defaultValue="aditi@devtrack.io" />
        </Field>
        <Field label="Bio" hint="Shown on shared portfolios." cols={2}>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </Field>
      </div>
      <SaveBar />
    </Panel>
  );
}

function CareerSection() {
  const [roles, setRoles] = useState([
    "Senior Backend",
    "Staff Engineer",
    "Platform",
  ]);
  const [locations, setLocations] = useState(["Remote · US", "New York, NY"]);
  return (
    <>
      <Panel title="Target roles" description="Titles DevTrack will surface.">
        <div className="flex flex-wrap gap-1.5">
          {roles.map((r) => (
            <Chip
              key={r}
              label={r}
              onRemove={() => setRoles(roles.filter((x) => x !== r))}
            />
          ))}
          <button className="inline-flex items-center gap-1 rounded-md border border-dashed border-white/15 px-2 py-1 text-[11.5px] text-muted-foreground hover:text-foreground">
            <Plus className="size-3" /> Add role
          </button>
        </div>
      </Panel>

      <Panel title="Locations" description="Cities and remote preferences.">
        <div className="flex flex-wrap gap-1.5">
          {locations.map((l) => (
            <Chip
              key={l}
              label={l}
              onRemove={() => setLocations(locations.filter((x) => x !== l))}
            />
          ))}
          <button className="inline-flex items-center gap-1 rounded-md border border-dashed border-white/15 px-2 py-1 text-[11.5px] text-muted-foreground hover:text-foreground">
            <MapPin className="size-3" /> Add location
          </button>
        </div>
      </Panel>

      <Panel title="Compensation" description="Used to flag underpaid listings.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Minimum base">
            <Input defaultValue="$180,000" />
          </Field>
          <Field label="Target base">
            <Input defaultValue="$220,000" />
          </Field>
          <Field label="Currency">
            <Select value="USD" options={["USD", "EUR", "GBP", "CAD", "INR"]} />
          </Field>
        </div>
      </Panel>

      <Panel title="Work preferences">
        <div className="divide-y divide-white/5">
          <Row
            title="Open to relocation"
            description="Show roles requiring a move."
            right={<Toggle checked={false} onChange={() => {}} />}
          />
          <Row
            title="Visa sponsorship required"
            right={<Toggle checked={true} onChange={() => {}} />}
          />
          <Row
            title="Available immediately"
            description="Signals two-week notice on shared portfolios."
            right={<Toggle checked={true} onChange={() => {}} />}
          />
        </div>
      </Panel>
    </>
  );
}

function NotificationsSection() {
  return (
    <>
      <Panel title="Delivery channels">
        <div className="divide-y divide-white/5">
          <Row
            title="Email"
            description="aditi@devtrack.io"
            right={<Toggle checked={true} onChange={() => {}} />}
            icon={<Bell className="size-4" />}
          />
          <Row
            title="Push notifications"
            description="Desktop & mobile web"
            right={<Toggle checked={true} onChange={() => {}} />}
            icon={<Bell className="size-4" />}
          />
          <Row
            title="Slack"
            description="Delivered to #jobsearch"
            right={<Toggle checked={false} onChange={() => {}} />}
            icon={<Slack className="size-4" />}
          />
        </div>
      </Panel>

      <Panel title="What to notify me about">
        <div className="divide-y divide-white/5">
          {[
            {
              t: "Interview reminders",
              d: "24h and 1h before each round.",
              c: true,
            },
            { t: "Recruiter messages", d: "New replies from recruiters.", c: true },
            {
              t: "Application deadlines",
              d: "When a role's deadline is near.",
              c: true,
            },
            {
              t: "Weekly summary",
              d: "Monday morning digest of last week.",
              c: true,
            },
            {
              t: "Product updates",
              d: "New DevTrack features and improvements.",
              c: false,
            },
          ].map((r) => (
            <Row
              key={r.t}
              title={r.t}
              description={r.d}
              right={<Toggle checked={r.c} onChange={() => {}} />}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Quiet hours" description="We won't push during these times.">
        <div className="grid grid-cols-2 gap-4">
          <Field label="From">
            <Input type="time" defaultValue="22:00" />
          </Field>
          <Field label="To">
            <Input type="time" defaultValue="07:30" />
          </Field>
        </div>
      </Panel>
    </>
  );
}

function SecuritySection() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Panel title="Password">
        <div className="space-y-4">
          <Field label="Current password" cols={2}>
            <div className="relative">
              <Input type={show ? "text" : "password"} defaultValue="········" />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </Field>
          <Field label="New password" cols={2}>
            <Input type="password" placeholder="At least 12 characters" />
          </Field>
          <Field label="Confirm password" cols={2}>
            <Input type="password" />
          </Field>
        </div>
        <SaveBar />
      </Panel>

      <Panel title="Two-factor authentication">
        <div className="divide-y divide-white/5">
          <Row
            title="Authenticator app"
            description="Time-based codes (TOTP). Recommended."
            right={
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/20">
                <Check className="size-3" /> Enabled
              </span>
            }
          />
          <Row
            title="Recovery codes"
            description="10 single-use codes for emergencies."
            right={
              <Button variant="secondary" size="sm">
                <Download className="size-3.5" /> Download
              </Button>
            }
          />
          <Row
            title="Security key"
            description="YubiKey or WebAuthn device."
            right={
              <Button variant="secondary" size="sm">
                Add key
              </Button>
            }
          />
        </div>
      </Panel>

      <Panel title="Active sessions">
        <div className="space-y-2">
          {[
            {
              d: "MacBook Pro · Chrome",
              l: "New York, NY · Active now",
              current: true,
            },
            { d: "iPhone 15 · Safari", l: "New York, NY · 2h ago" },
            { d: "Linux · Firefox", l: "Berlin, DE · 4 days ago" },
          ].map((s) => (
            <div
              key={s.d}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <div>
                <div className="text-[13px] font-medium">
                  {s.d}
                  {s.current && (
                    <span className="ml-2 rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                      This device
                    </span>
                  )}
                </div>
                <div className="text-[11.5px] text-muted-foreground">{s.l}</div>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Danger zone">
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-4 shrink-0 text-red-400" />
            <div className="flex-1">
              <div className="text-[13px] font-semibold">Delete account</div>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Permanently remove your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button variant="danger" size="sm">
              <Trash2 className="size-3.5" /> Delete account
            </Button>
          </div>
        </div>
      </Panel>
    </>
  );
}

function AppearanceSection() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  return (
    <>
      <Panel title="Theme" description="Applies across the entire app.">
        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "light", l: "Light", i: Sun },
            { k: "dark", l: "Dark", i: Moon },
            { k: "system", l: "System", i: Monitor },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTheme(t.k as typeof theme)}
              className={cn(
                "group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all",
                theme === t.k
                  ? "border-brand/50 bg-brand/5 ring-1 ring-brand/30"
                  : "border-white/10 bg-surface hover:border-white/20",
              )}
            >
              <div
                className={cn(
                  "h-16 w-full overflow-hidden rounded-md border border-white/10",
                  t.k === "light" && "bg-white",
                  t.k === "dark" && "bg-[#0b1220]",
                  t.k === "system" &&
                    "bg-gradient-to-r from-white to-[#0b1220]",
                )}
              >
                <div className="h-2 border-b border-black/5" />
              </div>
              <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
                <t.i className="size-3.5" /> {t.l}
              </div>
              {theme === t.k && (
                <Check className="absolute right-3 top-3 size-4 text-brand" />
              )}
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Density" description="Row spacing across lists and tables.">
        <div className="flex gap-2">
          {(["comfortable", "compact"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={cn(
                "rounded-lg border px-3 py-2 text-[12.5px] capitalize transition-colors",
                density === d
                  ? "border-brand/50 bg-brand/10 text-foreground"
                  : "border-white/10 bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Regional">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Language">
            <Select
              value="English"
              options={["English", "Español", "Français", "Deutsch", "日本語"]}
            />
          </Field>
          <Field label="Timezone">
            <Select
              value="America/New_York"
              options={[
                "America/New_York",
                "America/Los_Angeles",
                "Europe/London",
                "Europe/Berlin",
                "Asia/Kolkata",
              ]}
            />
          </Field>
          <Field label="Date format">
            <Select
              value="MMM D, YYYY"
              options={["MMM D, YYYY", "YYYY-MM-DD", "DD/MM/YYYY"]}
            />
          </Field>
        </div>
      </Panel>
    </>
  );
}

function ConnectedSection() {
  const providers = [
    {
      n: "GitHub",
      d: "Import repositories, sync commits to activity.",
      i: Github,
      c: true,
      handle: "@aditi",
    },
    {
      n: "LinkedIn",
      d: "Auto-fill from your profile.",
      i: Linkedin,
      c: true,
      handle: "Aditi Rao",
    },
    {
      n: "Google",
      d: "Calendar sync for interviews and reminders.",
      i: Chrome,
      c: true,
      handle: "aditi@gmail.com",
    },
    {
      n: "Slack",
      d: "Deliver notifications to your workspace.",
      i: Slack,
      c: false,
    },
  ];
  return (
    <Panel title="Sign-in & integrations">
      <div className="divide-y divide-white/5">
        {providers.map((p) => (
          <Row
            key={p.n}
            title={p.n}
            description={p.c && p.handle ? `Connected as ${p.handle}` : p.d}
            icon={<p.i className="size-4" />}
            right={
              p.c ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/20">
                    <Check className="size-3" /> Connected
                  </span>
                  <Button variant="ghost" size="sm">
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="sm">
                  Connect
                </Button>
              )
            }
          />
        ))}
      </div>
    </Panel>
  );
}

function ResumeDefaultsSection() {
  return (
    <>
      <Panel title="Default resume" description="Attached automatically to new applications.">
        <div className="space-y-2">
          {[
            { n: "Senior Backend · v4", d: "Updated 3 days ago", def: true },
            { n: "Staff Systems · v2", d: "Updated 2 weeks ago" },
            { n: "Fullstack TS · v3", d: "Updated Jun 12" },
          ].map((r) => (
            <button
              key={r.n}
              className={cn(
                "flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors",
                r.def
                  ? "border-brand/50 bg-brand/5"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-md bg-white/5 text-muted-foreground">
                  <FileText className="size-4" />
                </div>
                <div>
                  <div className="text-[13px] font-medium">{r.n}</div>
                  <div className="text-[11.5px] text-muted-foreground">{r.d}</div>
                </div>
              </div>
              {r.def && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/15 px-2 py-1 text-[11px] font-medium text-brand">
                  Default
                </span>
              )}
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Format defaults">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="File type">
            <Select value="PDF" options={["PDF", "DOCX", "Both"]} />
          </Field>
          <Field label="Page size">
            <Select value="Letter" options={["Letter", "A4"]} />
          </Field>
          <Field label="Naming template">
            <Input defaultValue="{name}-{role}-{company}.pdf" />
          </Field>
          <Field label="Portfolio link">
            <Input defaultValue="https://aditi.dev" />
          </Field>
        </div>
      </Panel>

      <Panel title="ATS optimization">
        <div className="divide-y divide-white/5">
          <Row
            title="Auto-scan when exporting"
            description="Flag missing keywords per job description."
            right={<Toggle checked={true} onChange={() => {}} />}
          />
          <Row
            title="Include cover letter"
            description="Attach the linked letter by default."
            right={<Toggle checked={false} onChange={() => {}} />}
          />
        </div>
      </Panel>
    </>
  );
}

function ApplicationDefaultsSection() {
  return (
    <>
      <Panel title="New application defaults">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Default status">
            <Select
              value="Applied"
              options={["Wishlist", "Preparing", "Applied", "Assessment"]}
            />
          </Field>
          <Field label="Priority">
            <Select value="Medium" options={["Low", "Medium", "High"]} />
          </Field>
          <Field label="Work model">
            <Select
              value="Remote"
              options={["Remote", "Hybrid", "Onsite", "Any"]}
            />
          </Field>
          <Field label="Source">
            <Select
              value="LinkedIn"
              options={[
                "LinkedIn",
                "Company site",
                "Referral",
                "Recruiter",
                "Job board",
              ]}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Automation">
        <div className="divide-y divide-white/5">
          <Row
            title="Auto-archive after rejection"
            description="Move to archive 14 days after a 'Rejected' status."
            right={<Toggle checked={true} onChange={() => {}} />}
          />
          <Row
            title="Follow-up reminders"
            description="Nudge me if no response after 7 days."
            right={<Toggle checked={true} onChange={() => {}} />}
          />
          <Row
            title="Auto-log calendar events"
            description="Create an interview when a Google Calendar invite arrives."
            right={<Toggle checked={false} onChange={() => {}} />}
          />
        </div>
      </Panel>
    </>
  );
}

function ImportExportSection() {
  return (
    <>
      <Panel title="Import" description="Bring in data from other trackers.">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { n: "CSV file", d: "Applications from a spreadsheet." },
            { n: "Notion database", d: "Sync a Notion job tracker." },
            { n: "Airtable base", d: "Import an Airtable base." },
            { n: "LinkedIn export", d: "ZIP from Data Privacy settings." },
          ].map((s) => (
            <div
              key={s.n}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <div>
                <div className="text-[13px] font-medium">{s.n}</div>
                <div className="text-[11.5px] text-muted-foreground">{s.d}</div>
              </div>
              <Button variant="secondary" size="sm">
                <Upload className="size-3.5" /> Import
              </Button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Export" description="Take your data anywhere.">
        <div className="grid gap-3 md:grid-cols-3">
          {["CSV", "JSON", "PDF Report"].map((f) => (
            <button
              key={f}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/20"
            >
              <div>
                <div className="text-[13px] font-medium">{f}</div>
                <div className="text-[11.5px] text-muted-foreground">
                  Full workspace
                </div>
              </div>
              <Download className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </Panel>
    </>
  );
}

function BackupSection() {
  return (
    <>
      <Panel
        title="Automated backups"
        description="Encrypted snapshots of your workspace."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Frequency">
            <Select value="Daily" options={["Hourly", "Daily", "Weekly"]} />
          </Field>
          <Field label="Retention">
            <Select value="30 days" options={["7 days", "30 days", "90 days"]} />
          </Field>
        </div>
      </Panel>

      <Panel title="Restore points">
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2.5 text-left font-medium">Snapshot</th>
                <th className="px-4 py-2.5 text-left font-medium">Size</th>
                <th className="px-4 py-2.5 text-left font-medium">Created</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {[
                { d: "Jul 01, 2026 · 03:12 UTC", s: "4.2 MB" },
                { d: "Jun 30, 2026 · 03:11 UTC", s: "4.1 MB" },
                { d: "Jun 29, 2026 · 03:12 UTC", s: "4.1 MB" },
                { d: "Jun 28, 2026 · 03:10 UTC", s: "4.0 MB" },
              ].map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-medium">Auto snapshot</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">
                    {r.s}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.d}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        Restore
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function SubscriptionSection() {
  return (
    <>
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-[11px] font-medium uppercase tracking-wider text-brand">
                Current plan
              </div>
              <span className="rounded-md bg-gradient-brand px-2 py-0.5 text-[11px] font-semibold text-background">
                Pro
              </span>
            </div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">
              $18<span className="text-base text-muted-foreground">/month</span>
            </div>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              Renews on August 1, 2026 · billed monthly
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              Change plan
            </Button>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { l: "Applications", v: "151 / ∞" },
            { l: "Resume versions", v: "6 / ∞" },
            { l: "AI credits", v: "1,240 / 2,000" },
          ].map((u) => (
            <div
              key={u.l}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
                {u.l}
              </div>
              <div className="mt-1 text-[15px] font-semibold tabular-nums">
                {u.v}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Compare plans">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { n: "Free", p: "$0", d: "For casual searches.", cta: "Downgrade" },
            {
              n: "Pro",
              p: "$18",
              d: "Everything you need to land the offer.",
              cta: "Current",
              current: true,
            },
            {
              n: "Teams",
              p: "$36",
              d: "Coaches, mentors, bootcamps.",
              cta: "Upgrade",
            },
          ].map((p) => (
            <div
              key={p.n}
              className={cn(
                "rounded-xl border p-4",
                p.current
                  ? "border-brand/50 bg-brand/5"
                  : "border-white/10 bg-white/[0.02]",
              )}
            >
              <div className="text-[13px] font-semibold">{p.n}</div>
              <div className="mt-1 text-xl font-semibold tracking-tight">
                {p.p}
                <span className="text-[12px] text-muted-foreground">/mo</span>
              </div>
              <p className="mt-1 text-[12px] text-muted-foreground">{p.d}</p>
              <Button
                variant={p.current ? "secondary" : "brand"}
                size="sm"
                className="mt-3 w-full"
                disabled={p.current}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function BillingSection() {
  return (
    <>
      <Panel title="Payment method">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-14 place-items-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 text-[10px] font-bold uppercase tracking-wider text-white">
              Visa
            </div>
            <div>
              <div className="text-[13px] font-medium">•••• •••• •••• 4242</div>
              <div className="text-[11.5px] text-muted-foreground">
                Expires 08 / 2028
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              Update
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </div>
      </Panel>

      <Panel title="Billing details">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Billing name">
            <Input defaultValue="Aditi Rao" />
          </Field>
          <Field label="Company / tax ID">
            <Input placeholder="Optional" />
          </Field>
          <Field label="Address">
            <Input defaultValue="240 Kent Ave" />
          </Field>
          <Field label="City">
            <Input defaultValue="Brooklyn" />
          </Field>
          <Field label="Country">
            <Select
              value="United States"
              options={["United States", "United Kingdom", "Germany", "India"]}
            />
          </Field>
          <Field label="ZIP / postal">
            <Input defaultValue="11249" />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Invoices"
        description="Downloadable receipts for the last 12 months."
      >
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2.5 text-left font-medium">Invoice</th>
                <th className="px-4 py-2.5 text-left font-medium">Date</th>
                <th className="px-4 py-2.5 text-left font-medium">Amount</th>
                <th className="px-4 py-2.5 text-left font-medium">Status</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {[
                { n: "INV-2026-007", d: "Jul 1, 2026", a: "$18.00" },
                { n: "INV-2026-006", d: "Jun 1, 2026", a: "$18.00" },
                { n: "INV-2026-005", d: "May 1, 2026", a: "$18.00" },
                { n: "INV-2026-004", d: "Apr 1, 2026", a: "$18.00" },
              ].map((r) => (
                <tr
                  key={r.n}
                  className="border-t border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-medium">{r.n}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.d}</td>
                  <td className="px-4 py-3 tabular-nums">{r.a}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/20">
                      Paid
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="size-3.5" /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function ApiKeysSection() {
  const keys = [
    {
      n: "Zapier automation",
      p: "sk_live_a12b•••••••••••••••4f2c",
      c: "Jun 12, 2026",
      last: "12m ago",
    },
    {
      n: "Personal script",
      p: "sk_live_9de1•••••••••••••••7abc",
      c: "May 04, 2026",
      last: "3d ago",
    },
  ];
  return (
    <Panel
      title="Personal access tokens"
      description="Programmatic access to your DevTrack workspace."
      action={
        <Button variant="brand" size="sm">
          <Plus className="size-3.5" /> New key
        </Button>
      }
    >
      <div className="space-y-2">
        {keys.map((k) => (
          <div
            key={k.n}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{k.n}</div>
              <div className="mt-0.5 flex items-center gap-2 font-mono text-[11.5px] text-muted-foreground">
                <KeyRound className="size-3" />
                <span className="truncate">{k.p}</span>
                <button className="text-muted-foreground hover:text-foreground">
                  <Copy className="size-3" />
                </button>
              </div>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>
                  <Clock className="mr-1 inline size-3" />
                  Created {k.c}
                </span>
                <span>Last used {k.last}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Trash2 className="size-3.5" /> Revoke
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-[12px]">
        <AlertTriangle className="size-4 shrink-0 text-amber-300" />
        <div>
          <div className="font-medium">Keep your keys safe</div>
          <p className="mt-0.5 text-muted-foreground">
            Treat tokens like passwords. Rotate any key that has been exposed
            in logs, git history, or shared screenshots.
          </p>
        </div>
      </div>
    </Panel>
  );
}

function ShortcutsSection() {
  const groups = [
    {
      name: "Global",
      items: [
        { k: ["⌘", "K"], d: "Open command palette" },
        { k: ["⌘", "/"], d: "Toggle sidebar" },
        { k: ["G", "D"], d: "Go to Dashboard" },
        { k: ["G", "A"], d: "Go to Applications" },
        { k: ["G", "I"], d: "Go to Interviews" },
        { k: ["?"], d: "Show shortcuts" },
      ],
    },
    {
      name: "Applications",
      items: [
        { k: ["N"], d: "New application" },
        { k: ["E"], d: "Edit selected" },
        { k: ["⌘", "F"], d: "Focus search" },
        { k: ["J"], d: "Move down" },
        { k: ["K"], d: "Move up" },
      ],
    },
    {
      name: "Editor",
      items: [
        { k: ["⌘", "S"], d: "Save draft" },
        { k: ["⌘", "B"], d: "Bold" },
        { k: ["⌘", "I"], d: "Italic" },
        { k: ["⌘", "Z"], d: "Undo" },
        { k: ["⌘", "⇧", "Z"], d: "Redo" },
      ],
    },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {groups.map((g) => (
        <Panel key={g.name} title={g.name}>
          <div className="divide-y divide-white/5">
            {g.items.map((it) => (
              <div
                key={it.d}
                className="flex items-center justify-between py-2.5"
              >
                <div className="text-[13px]">{it.d}</div>
                <div className="flex items-center gap-1">
                  {it.k.map((key, i) => (
                    <kbd
                      key={i}
                      className="inline-grid h-6 min-w-[24px] place-items-center rounded-md border border-white/10 bg-white/[0.03] px-1.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </div>
  );
}
