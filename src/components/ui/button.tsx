import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Primary: bright, high-contrast, for the single main CTA
        primary:
          "bg-foreground text-background hover:bg-foreground/90 shadow-[0_1px_0_0_oklch(1_0_0/0.15)_inset,0_10px_30px_-10px_oklch(0_0_0/0.6)]",
        // Brand: gradient CTA, for hero/onboarding moments
        brand:
          "bg-gradient-brand text-brand-foreground shadow-glow hover:brightness-110",
        // Secondary: subtle surface pill
        secondary:
          "bg-white/5 text-foreground border border-white/10 hover:bg-white/10 hover:border-white/15",
        // Ghost: text-only, quiet
        ghost: "text-muted-foreground hover:bg-white/5 hover:text-foreground",
        // Danger: destructive intent
        danger:
          "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25",
        // Outline: bordered neutral
        outline:
          "border border-white/10 bg-transparent hover:bg-white/5",
        // Link: inline text link
        link: "text-brand underline-offset-4 hover:underline h-auto p-0",
        // Legacy aliases for existing usages
        default:
          "bg-foreground text-background hover:bg-foreground/90 shadow-[0_1px_0_0_oklch(1_0_0/0.15)_inset,0_10px_30px_-10px_oklch(0_0_0/0.6)]",
        destructive:
          "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-[15px]",
        xl: "h-12 px-7 text-[15px]",
        icon: "h-9 w-9 [&_svg]:size-4",
        "icon-sm": "h-8 w-8 [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
