import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  variant?: "default" | "category"
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, active = false, variant = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 font-medium text-sm transition-all duration-150 min-h-[44px]",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "active:scale-95",
          variant === "default" && [
            "border-border bg-background text-foreground",
            "hover:bg-muted",
            active && "bg-secondary-100 text-secondary-600 border-secondary-600",
          ],
          variant === "category" && [
            "border-primary-400 bg-primary-100 text-primary-600",
            active && "bg-secondary-100 text-secondary-600 border-secondary-600",
          ],
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Chip.displayName = "Chip"

export { Chip }
