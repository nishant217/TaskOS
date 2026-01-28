import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-transparent bg-orange-100 text-orange-800",
        secondary: "border border-transparent bg-gray-200 text-gray-900",
        destructive: "border border-transparent bg-red-100 text-red-800",
        outline: "text-gray-900 border border-gray-300",
        success: "border border-transparent bg-green-100 text-green-800",
        warning: "border border-transparent bg-yellow-100 text-yellow-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={`${badgeVariants({ variant })} ${className || ""}`} {...props} />
  )
}

export { Badge, badgeVariants }
