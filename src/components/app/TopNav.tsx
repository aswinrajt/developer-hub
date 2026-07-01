import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Plus,
  Command,
  ChevronDown,
  Briefcase,
  Users,
  FileText,
  CalendarClock,
  LogOut,
  Settings,
  UserCircle,
  Keyboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNav({ className }: { className?: string }) {
  const [addOpen, setAddOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/5 bg-background/70 px-4 backdrop-blur-xl",
        className,
      )}
    >
      {/* Breadcrumb */}
      <div className="hidden items-center gap-2 text-[13px] text-muted-foreground md:flex">
        <span className="text-foreground/70">Workspace</span>
        <span className="text-muted-foreground/40">/</span>
        <span className="font-medium text-foreground">Dashboard</span>
      </div>

      {/* Global search */}
      <div className="mx-auto w-full max-w-md">
        <button className="group flex w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:border-white/15 hover:bg-white/[0.07]">
          <Search className="size-3.5" />
          <span className="flex-1">Search applications, companies, notes…</span>
          <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground/70">
            <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-sans">
              ⌘
            </kbd>
            <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-sans">
              K
            </kbd>
          </span>
        </button>
      </div>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* Quick add */}
        <div className="relative">
          <button
            onClick={() => {
              setAddOpen((v) => !v);
              setProfileOpen(false);
              setNotifOpen(false);
            }}
            className="flex h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-[12px] font-medium text-background transition-transform hover:scale-[1.02]"
          >
            <Plus className="size-3.5" /> New
            <ChevronDown className="size-3" />
          </button>
          <Popover open={addOpen} onClose={() => setAddOpen(false)}>
            <div className="w-56 p-1.5">
              {[
                { i: Briefcase, l: "Application", k: "A" },
                { i: Users, l: "Recruiter", k: "R" },
                { i: CalendarClock, l: "Interview", k: "I" },
                { i: FileText, l: "Resume version", k: "V" },
              ].map((it) => (
                <button
                  key={it.l}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] hover:bg-white/5"
                >
                  <it.i className="size-4 text-muted-foreground" />
                  <span className="flex-1 text-left">{it.l}</span>
                  <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px] text-muted-foreground">
                    ⌘{it.k}
                  </kbd>
                </button>
              ))}
            </div>
          </Popover>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setAddOpen(false);
              setProfileOpen(false);
            }}
            className="relative grid size-8 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute right-1 top-1 size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand-glow)]" />
          </button>
          <Popover open={notifOpen} onClose={() => setNotifOpen(false)}>
            <div className="w-80">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <div className="text-[13px] font-semibold">Notifications</div>
                <button className="text-[11px] text-muted-foreground hover:text-foreground">
                  Mark all read
                </button>
              </div>
              <ul className="max-h-80 divide-y divide-white/5 overflow-y-auto">
                {[
                  {
                    t: "Vercel scheduled your onsite",
                    s: "Tue, Nov 12 · 4 rounds",
                    d: "2m",
                    dot: true,
                  },
                  {
                    t: "Follow up with Priya at Stripe",
                    s: "It's been 5 days since your last message",
                    d: "1h",
                    dot: true,
                  },
                  {
                    t: "New coding challenge assigned",
                    s: "Linear · 48h to submit",
                    d: "3h",
                  },
                ].map((n, i) => (
                  <li key={i} className="flex gap-3 px-4 py-3 hover:bg-white/[0.02]">
                    {n.dot && (
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium">{n.t}</div>
                      <div className="text-[12px] text-muted-foreground">{n.s}</div>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{n.d}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Popover>
        </div>

        {/* Command palette hint */}
        <button
          className="hidden size-8 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground md:grid"
          aria-label="Command palette"
        >
          <Command className="size-4" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setAddOpen(false);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 py-0.5 pl-0.5 pr-2 transition-colors hover:bg-white/5"
          >
            <div className="grid size-7 place-items-center rounded-full bg-gradient-brand text-[11px] font-semibold text-background">
              AR
            </div>
            <ChevronDown className="size-3 text-muted-foreground" />
          </button>
          <Popover open={profileOpen} onClose={() => setProfileOpen(false)}>
            <div className="w-56">
              <div className="border-b border-white/5 px-3 py-3">
                <div className="text-[13px] font-semibold">Aditi Rao</div>
                <div className="text-[11px] text-muted-foreground">aditi@devtrack.io</div>
              </div>
              <div className="p-1.5">
                {[
                  { i: UserCircle, l: "Profile" },
                  { i: Settings, l: "Settings" },
                  { i: Keyboard, l: "Keyboard shortcuts" },
                ].map((it) => (
                  <button
                    key={it.l}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] hover:bg-white/5"
                  >
                    <it.i className="size-4 text-muted-foreground" />
                    {it.l}
                  </button>
                ))}
              </div>
              <div className="border-t border-white/5 p-1.5">
                <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-destructive hover:bg-destructive/10">
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
}

function Popover({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            onClick={onClose}
            className="fixed inset-0 z-40 cursor-default"
          />
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-surface-elevated/95 shadow-elevated backdrop-blur-xl"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
