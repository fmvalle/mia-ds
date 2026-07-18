import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type SectionProps = {
  title?: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ title, subtitle, actions, children, className }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || subtitle || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            {title && <h2 className="text-lg font-semibold text-text">{title}</h2>}
            {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
