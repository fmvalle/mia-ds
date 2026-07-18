import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function List({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn('divide-y divide-border rounded-xl bg-surface shadow-card', className)}
      {...props}
    />
  )
}

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  icon?: ReactNode
  title: string
  description?: string
  trailing?: ReactNode
}

export function ListItem({
  icon,
  title,
  description,
  trailing,
  className,
  ...props
}: ListItemProps) {
  return (
    <li
      className={cn('flex items-center gap-4 px-5 py-4 transition hover:bg-surface-muted/50', className)}
      {...props}
    >
      {icon ? <div className="shrink-0">{icon}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="font-medium text-text">{title}</p>
        {description ? <p className="mt-0.5 text-sm text-text-muted">{description}</p> : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </li>
  )
}
