import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
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
  Settings,
  ChevronsUpDown,
  Check,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, name: "Dashboard", href: "/dashboard", badge: null },
      { icon: BarChart3, name: "Analytics", href: "/analytics", badge: null },
    ],
  },
  {
    label: "Pipeline",
    items: [
      { icon: Briefcase, name: "Applications", href: "/applications", badge: "47" },
      { icon: Users, name: "Recruiters", href: "#rec", badge: "12" },
      { icon: Building2, name: "Companies", href: "/companies", badge: "84" },
      { icon: CalendarClock, name: "Interviews", href: "/interviews", badge: "4" },
    ],
  },
  {
    label: "Materials",
    items: [
      { icon: FileText, name: "Resumes", href: "/resumes", badge: "6" },
      { icon: Files, name: "Cover Letters", href: "/cover-letters", badge: "9" },
      { icon: FolderOpen, name: "Documents", href: "#doc", badge: null },
    ],
  },
  {
    label: "Growth",
    items: [
      { icon: Code2, name: "Coding Practice", href: "/coding", badge: "128" },
      { icon: Target, name: "Career Goals", href: "#goals", badge: "3" },
    ],
  },
] as const;

export function AppSidebar({
  active = "Dashboard",
  className,
}: {
  active?: string;
  className?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [wsOpen, setWsOpen] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-white/5 bg-surface/60 backdrop-blur-xl transition-[width] duration-300",
        collapsed ? "w-[68px]" : "w-[260px]",
        className,
      )}
    >
      {/* Workspace switcher */}
      <div className="relative border-b border-white/5 p-3">
        <button
          onClick={() => setWsOpen((v) => !v)}
          className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/5"
        >
          <div className="relative grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-brand shadow-glow">
            <div className="absolute inset-[2px] rounded-[6px] bg-background/70" />
            <div className="relative size-3 rounded-sm bg-gradient-brand" />
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">Aditi's workspace</div>
                <div className="truncate text-[11px] text-muted-foreground">Pro · Personal</div>
              </div>
              <ChevronsUpDown className="size-3.5 text-muted-foreground" />
            </>
          )}
        </button>

        <AnimatePresence>
          {wsOpen && !collapsed && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-x-3 top-full z-20 mt-1 rounded-xl border border-white/10 bg-surface-elevated p-1.5 shadow-elevated"
            >
              {[
                { n: "Aditi's workspace", s: "Pro · Personal", active: true },
                { n: "Bootcamp cohort '25", s: "Team · 24 members" },
              ].map((w) => (
                <div
                  key={w.n}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-white/5"
                >
                  <div className="grid size-7 place-items-center rounded-md bg-white/5 text-[11px] font-semibold">
                    {w.n[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium">{w.n}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{w.s}</div>
                  </div>
                  {w.active && <Check className="size-3.5 text-brand" />}
                </div>
              ))}
              <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-white/5">
                <Plus className="size-3.5" /> New workspace
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {nav.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">
                {group.label}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((it) => {
                const isActive = it.name === active;
                return (
                  <li key={it.name}>
                    <a
                      href={it.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] transition-all",
                        isActive
                          ? "bg-white/5 text-foreground"
                          : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-y-1.5 left-0 w-[3px] rounded-r bg-brand shadow-[0_0_10px_var(--brand-glow)]"
                          transition={{ duration: 0.25 }}
                        />
                      )}
                      <it.icon className="size-[16px] shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{it.name}</span>
                          {it.badge && (
                            <span
                              className={cn(
                                "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                                isActive
                                  ? "bg-brand/15 text-brand"
                                  : "bg-white/5 text-muted-foreground",
                              )}
                            >
                              {it.badge}
                            </span>
                          )}
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-2">
        <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/5">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-brand text-[12px] font-semibold text-background">
            AR
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium">Aditi Rao</div>
                <div className="truncate text-[11px] text-muted-foreground">
                  aditi@devtrack.io
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  aria-label="Notifications"
                >
                  <Bell className="size-3.5" />
                </button>
                <a
                  href="/settings"
                  className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  aria-label="Settings"
                >
                  <Settings className="size-3.5" />
                </a>
              </div>
            </>
          )}
        </button>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="mt-1 flex w-full items-center gap-3 rounded-lg p-2 text-[12px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <>
              <PanelLeftClose className="size-4" />
              Collapse
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
