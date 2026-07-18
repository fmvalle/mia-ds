import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type NavSectionProps = {
  title?: string
  children: ReactNode
  collapsed?: boolean
  className?: string
}

export function NavSection({ title, children, collapsed = false, className }: NavSectionProps) {
  return (
    <section className={cn('space-y-1', className)} aria-label={title}>
      {title && !collapsed && (
        <h3 className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-text-subtle">
          {title}
        </h3>
      )}
      <div className="space-y-0.5">{children}</div>
    </section>
  )
}
