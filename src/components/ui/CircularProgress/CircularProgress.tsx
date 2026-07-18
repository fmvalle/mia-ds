import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const circularProgressColorVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      success: 'text-success-500',
      warning: 'text-warning-500',
      danger: 'text-danger-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

const circularProgressSizeVariants = cva('relative inline-flex items-center justify-center', {
  variants: {
    size: {
      sm: 'size-12 text-xs',
      md: 'size-16 text-sm',
      lg: 'size-24 text-base',
      xl: 'size-32 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const strokeWidths = {
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
} as const

export interface CircularProgressProps
  extends VariantProps<typeof circularProgressColorVariants>,
    VariantProps<typeof circularProgressSizeVariants> {
  className?: string
  value?: number
  max?: number
  showValue?: boolean
  label?: string
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function CircularProgress({
  className,
  variant = 'primary',
  size = 'md',
  value = 0,
  max = 100,
  showValue = true,
  label,
}: CircularProgressProps) {
  const safeMax = max > 0 ? max : 100
  const percentage = clamp((value / safeMax) * 100, 0, 100)
  const resolvedSize = size ?? 'md'
  const dimension = resolvedSize === 'sm' ? 48 : resolvedSize === 'md' ? 64 : resolvedSize === 'lg' ? 96 : 128
  const strokeWidth = strokeWidths[resolvedSize]
  const radius = (dimension - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div
      className={cn(circularProgressSizeVariants({ size }), className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={value}
      aria-label={label}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-surface-muted"
        />
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={circularProgressColorVariants({ variant })}
        />
      </svg>
      {showValue ? (
        <span className="absolute font-semibold text-text">{Math.round(percentage)}%</span>
      ) : null}
    </div>
  )
}

export { circularProgressColorVariants, circularProgressSizeVariants }
