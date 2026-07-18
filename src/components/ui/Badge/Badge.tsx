import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium whitespace-nowrap rounded-full',
  {
    variants: {
      variant: {
        primary: 'bg-primary-50 text-primary-700',
        secondary: 'bg-secondary-50 text-secondary-700',
        success: 'bg-success-50 text-success-700',
        warning: 'bg-warning-50 text-warning-700',
        danger: 'bg-danger-50 text-danger-700',
        info: 'bg-info-50 text-info-600',
        neutral: 'bg-surface-muted text-text-muted',
        outline: 'border border-border bg-surface text-text',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

const dotColors: Record<NonNullable<VariantProps<typeof badgeVariants>['variant']>, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
  neutral: 'bg-text-subtle',
  outline: 'bg-text-muted',
}

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string
  dot?: boolean
  children?: ReactNode
}

export function Badge({ className, variant = 'primary', size = 'md', dot = false, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {dot ? (
        <span
          className={cn('size-1.5 shrink-0 rounded-full', dotColors[variant ?? 'primary'])}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </span>
  )
}

export { badgeVariants }
