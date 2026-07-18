import { cva, type VariantProps } from 'class-variance-authority'
import { Sparkles, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const bannerVariants = cva('relative flex w-full items-center gap-4 rounded-lg px-5 py-3 text-sm', {
  variants: {
    variant: {
      info: 'border border-info-100 bg-info-50 text-info-600',
      success: 'border border-success-100 bg-success-50 text-success-700',
      warning: 'border border-warning-100 bg-warning-50 text-warning-700',
      danger: 'border border-danger-100 bg-danger-50 text-danger-700',
      promo: 'border border-primary-100 bg-gradient-to-r from-primary-500 to-primary-400 text-white',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

export interface BannerProps extends VariantProps<typeof bannerVariants> {
  title?: string
  description?: ReactNode
  action?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function Banner({
  variant = 'info',
  title,
  description,
  action,
  dismissible = false,
  onDismiss,
  className,
}: BannerProps) {
  const isPromo = variant === 'promo'

  return (
    <div className={cn(bannerVariants({ variant }), className)}>
      {isPromo ? <Sparkles className="size-5 shrink-0" /> : null}
      <div className="min-w-0 flex-1">
        {title ? (
          <p className={cn('font-semibold', isPromo ? 'text-white' : 'text-text')}>{title}</p>
        ) : null}
        {description ? (
          <div className={cn('text-sm', isPromo ? 'text-white/90' : 'text-text-muted', title && 'mt-0.5')}>
            {description}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            'shrink-0 rounded-md p-1 transition',
            isPromo ? 'text-white/80 hover:bg-white/10' : 'text-text-muted hover:bg-black/5',
          )}
          aria-label="Dismiss banner"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
