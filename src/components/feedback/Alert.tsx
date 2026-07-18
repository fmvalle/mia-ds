import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const alertVariants = cva('relative flex gap-3 rounded-md border p-4 text-[length:var(--text-body-md)]', {
  variants: {
    variant: {
      info: 'border-info-100 bg-info-50 text-info-700',
      success: 'border-success-100 bg-success-50 text-success-700',
      warning: 'border-warning-100 bg-warning-50 text-warning-700',
      danger: 'border-danger-100 bg-danger-50 text-danger-700',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const

export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string
  description?: ReactNode
  icon?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function Alert({
  variant = 'info',
  title,
  description,
  icon,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const Icon = iconMap[variant ?? 'info']

  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)}>
      <span className="mt-0.5 shrink-0">{icon ?? <Icon className="size-5" />}</span>
      <div className="min-w-0 flex-1">
        {title ? <p className="font-semibold text-text">{title}</p> : null}
        {description ? (
          <div className={cn('text-text-muted', title && 'mt-1')}>{description}</div>
        ) : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-sm p-1 text-text-muted transition hover:bg-black/5 hover:text-text"
          aria-label="Dismiss alert"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
