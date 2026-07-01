import { cn } from "@/lib/utils";

/**
 * Skeleton — shimmering placeholder used across dashboards, tables and cards.
 * Prefer this over ad-hoc pulsing divs so timing stays consistent.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton", className)} aria-hidden {...props} />;
}

export { Skeleton };

/* Convenience presets ----------------------------------------------- */

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3",
            i === lines - 1 ? "w-2/3" : i % 2 === 0 ? "w-full" : "w-11/12"
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card/40 p-5",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonRow({ cols = 5 }: { cols?: number }) {
  return (
    <div
      className="grid items-center gap-4 border-b border-border/50 px-4 py-3"
      style={{ gridTemplateColumns: `2fr ${"1fr ".repeat(cols - 1)}`.trim() }}
      aria-hidden
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className={cn("h-3", i === 0 ? "w-2/3" : "w-1/2")} />
      ))}
    </div>
  );
}
