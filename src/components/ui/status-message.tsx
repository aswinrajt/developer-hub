import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "success" | "warning" | "danger" | "info";

const iconFor: Record<Variant, typeof CheckCircle2> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
};

const surfaceFor: Record<Variant, string> = {
  success: "surface-success",
  warning: "surface-warning",
  danger: "surface-danger",
  info: "surface-info",
};

export function StatusMessage({
  variant = "info",
  title,
  description,
  action,
  onDismiss,
  className,
}: {
  variant?: Variant;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}) {
  const Icon = iconFor[variant];
  return (
    <motion.div
      role={variant === "danger" ? "alert" : "status"}
      aria-live={variant === "danger" ? "assertive" : "polite"}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex items-start gap-3 rounded-xl px-4 py-3 text-sm",
        surfaceFor[variant],
        className
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 opacity-90" aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="font-medium leading-5">{title}</div>
        {description ? (
          <div className="mt-0.5 text-[13px] leading-5 opacity-85">
            {description}
          </div>
        ) : null}
        {action ? <div className="mt-2">{action}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </motion.div>
  );
}
