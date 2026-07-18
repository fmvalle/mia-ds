import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'flex w-full max-w-sm items-start gap-3 rounded-xl border bg-surface p-4 shadow-card',
  {
    variants: {
      variant: {
        info: 'border-info-100',
        success: 'border-success-100',
        warning: 'border-warning-100',
        danger: 'border-danger-100',
      },
      position: {
        default: '',
        topRight: 'origin-top-right',
        topLeft: 'origin-top-left',
        bottomRight: 'origin-bottom-right',
        bottomLeft: 'origin-bottom-left',
      },
    },
    defaultVariants: {
      variant: 'info',
      position: 'default',
    },
  },
)

const iconMap = {
  info: { Icon: Info, className: 'text-info-500' },
  success: { Icon: CheckCircle2, className: 'text-success-500' },
  warning: { Icon: TriangleAlert, className: 'text-warning-500' },
  danger: { Icon: AlertCircle, className: 'text-danger-500' },
} as const

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string
  description?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function Toast({
  variant = 'info',
  position = 'default',
  title,
  description,
  dismissible = false,
  onDismiss,
  className,
}: ToastProps) {
  const { Icon, className: iconClassName } = iconMap[variant ?? 'info']

  return (
    <div role="status" className={cn(toastVariants({ variant, position }), className)}>
      <Icon className={cn('mt-0.5 size-5 shrink-0', iconClassName)} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-text">{title}</p>
        {description ? <p className="mt-1 text-sm text-text-muted">{description}</p> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-1 text-text-muted hover:bg-surface-muted hover:text-text"
          aria-label="Dismiss toast"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
