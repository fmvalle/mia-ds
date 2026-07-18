import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Very High'

const priorityBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      priority: {
        Low: 'bg-success-50 text-success-700',
        Medium: 'bg-info-50 text-info-600',
        High: 'bg-warning-50 text-warning-700',
        'Very High': 'bg-danger-50 text-danger-700',
      },
    },
    defaultVariants: {
      priority: 'Medium',
    },
  },
)

export interface PriorityBadgeProps extends VariantProps<typeof priorityBadgeVariants> {
  priority: PriorityLevel
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return <span className={cn(priorityBadgeVariants({ priority }), className)}>{priority}</span>
}
