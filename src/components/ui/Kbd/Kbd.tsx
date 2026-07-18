import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface KbdProps {
  className?: string
  children: ReactNode
}

export function Kbd({ className, children }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex min-w-6 items-center justify-center rounded-sm border border-border bg-surface px-1.5 py-0.5 font-sans text-xs font-medium text-text-muted shadow-card',
        className,
      )}
    >
      {children}
    </kbd>
  )
}

export interface KbdGroupProps {
  className?: string
  children: ReactNode
  separator?: string
}

export function KbdGroup({ className, children, separator = '+' }: KbdGroupProps) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {items.map((child, index) => (
        <span key={index} className="inline-flex items-center gap-1">
          {index > 0 ? <span className="text-xs text-text-subtle">{separator}</span> : null}
          {child}
        </span>
      ))}
    </span>
  )
}
