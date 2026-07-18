import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressVariants = cva('h-full rounded-full transition-all duration-300 ease-out', {
  variants: {
    variant: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      danger: 'bg-danger-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

const trackVariants = cva('w-full overflow-hidden rounded-full bg-surface-muted', {
  variants: {
    size: {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface ProgressProps extends VariantProps<typeof progressVariants>, VariantProps<typeof trackVariants> {
  className?: string
  value?: number
  max?: number
  label?: string
  showValue?: boolean
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function Progress({
  className,
  variant = 'primary',
  size = 'md',
  value = 0,
  max = 100,
  label,
  showValue = false,
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100
  const percentage = clamp((value / safeMax) * 100, 0, 100)

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label || showValue ? (
        <div className="flex items-center justify-between gap-2 text-sm">
          {label ? <span className="font-medium text-text">{label}</span> : <span />}
          {showValue ? (
            <span className="text-text-muted">{Math.round(percentage)}%</span>
          ) : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={value}
        aria-label={label}
        className={trackVariants({ size })}
      >
        <div
          className={progressVariants({ variant })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { progressVariants, trackVariants }
