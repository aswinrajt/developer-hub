import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Input ---------- */
export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 text-[14px] text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-brand/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-brand/20",
        className,
      )}
    />
  );
}

/* ---------- Textarea ---------- */
export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-24 w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-[14px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-brand/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-brand/20",
        className,
      )}
    />
  );
}

/* ---------- Search ---------- */
export function Search({
  placeholder = "Search…",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const [v, setV] = useState("");
  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-full border border-white/10 bg-white/[0.03] pl-10 pr-9 text-[14px] text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-brand/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
      {v && (
        <button
          onClick={() => setV("")}
          className="absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}

/* ---------- Select / Dropdown ---------- */
export function Select({
  options,
  defaultValue,
  className,
  placeholder = "Select…",
}: {
  options: string[];
  defaultValue?: string;
  className?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(defaultValue);
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 text-[14px] transition-colors hover:border-white/15 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
      >
        <span className={cn("flex-1 text-left", !value && "text-muted-foreground/60")}>
          {value ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <button
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default"
            />
            <motion.ul
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full z-50 mt-1.5 origin-top overflow-hidden rounded-xl border border-white/10 bg-surface-elevated/95 p-1.5 shadow-elevated backdrop-blur-xl"
            >
              {options.map((o) => (
                <li
                  key={o}
                  onClick={() => {
                    setValue(o);
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] hover:bg-white/5"
                >
                  {o}
                  {value === o && <Check className="size-3.5 text-brand" />}
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Checkbox ---------- */
export function Checkbox({
  label,
  defaultChecked = false,
}: {
  label?: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5">
      <button
        role="checkbox"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "grid size-4 place-items-center rounded-[5px] border transition-all",
          on
            ? "border-brand bg-brand text-brand-foreground"
            : "border-white/15 bg-white/[0.03] hover:border-white/25",
        )}
      >
        {on && <Check className="size-3" strokeWidth={3} />}
      </button>
      {label && <span className="text-[13px]">{label}</span>}
    </label>
  );
}

/* ---------- Switch ---------- */
export function Switch({
  defaultChecked = false,
  label,
}: {
  defaultChecked?: boolean;
  label?: string;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-5 w-9 rounded-full border transition-colors",
          on ? "border-brand/60 bg-brand" : "border-white/15 bg-white/[0.05]",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={cn(
            "absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full shadow-md",
            on ? "left-[calc(100%-1rem)] bg-background" : "left-0.5 bg-foreground/80",
          )}
        />
      </button>
      {label && <span className="text-[13px]">{label}</span>}
    </label>
  );
}

/* ---------- Badge ---------- */
export function Badge({
  children,
  tone = "muted",
  icon,
}: {
  children: React.ReactNode;
  tone?: "brand" | "muted" | "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand/15 text-brand border-brand/20",
    muted: "bg-white/5 text-muted-foreground border-white/10",
    success: "bg-success/15 text-success border-success/20",
    warning: "bg-warning/15 text-warning border-warning/20",
    danger: "bg-destructive/15 text-destructive border-destructive/20",
    info: "bg-info/15 text-info border-info/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        tones[tone],
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/* ---------- Tag (removable) ---------- */
export function Tag({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[12px]">
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="grid size-3.5 place-items-center rounded-sm text-muted-foreground hover:bg-white/10 hover:text-foreground"
        >
          <X className="size-2.5" />
        </button>
      )}
    </span>
  );
}

/* ---------- Calendar (mini) ---------- */
export function Calendar({ className }: { className?: string }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const cells = Array.from({ length: 35 }, (_, i) => i - 3);
  const today = 12;
  const events = new Set([4, 8, 12, 18, 22]);
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-surface p-4 shadow-card",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold">November 2025</div>
        <div className="flex gap-0.5">
          <button className="grid size-6 place-items-center rounded-md text-muted-foreground hover:bg-white/5">
            <ChevronDown className="size-3 rotate-90" />
          </button>
          <button className="grid size-6 place-items-center rounded-md text-muted-foreground hover:bg-white/5">
            <ChevronDown className="size-3 -rotate-90" />
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-0.5 text-[11px]">
        {days.map((d, i) => (
          <div
            key={i}
            className="grid h-6 place-items-center font-medium text-muted-foreground/70"
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          const outside = d <= 0 || d > 30;
          const day = outside ? (d <= 0 ? 28 + d : d - 30) : d;
          const isToday = !outside && d === today;
          const hasEvent = !outside && events.has(d);
          return (
            <button
              key={i}
              className={cn(
                "relative grid h-8 place-items-center rounded-md text-[11px] transition-colors",
                outside && "text-muted-foreground/30",
                !outside && !isToday && "hover:bg-white/5",
                isToday && "bg-brand text-brand-foreground font-semibold",
              )}
            >
              {day}
              {hasEvent && !isToday && (
                <span className="absolute bottom-0.5 size-1 rounded-full bg-brand" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
