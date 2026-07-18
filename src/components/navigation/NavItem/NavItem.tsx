import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type NavItemProps = {
  icon?: LucideIcon
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  badge?: number
  collapsed?: boolean
  className?: string
}

export function NavItem({
  icon: Icon,
  label,
  href,
  onClick,
  active = false,
  badge,
  collapsed = false,
  className,
}: NavItemProps) {
  const classes = cn(
    'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    active
      ? 'bg-primary-50 text-primary-500'
      : 'text-text-muted hover:bg-surface-muted hover:text-text',
    collapsed && 'justify-center px-2',
    className,
  )

  const content = (
    <>
      {Icon && (
        <Icon
          className={cn(
            'size-5 shrink-0',
            active ? 'text-primary-500' : 'text-text-subtle group-hover:text-text-muted',
          )}
          aria-hidden
        />
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span
              className={cn(
                'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold',
                active ? 'bg-primary-500 text-white' : 'bg-surface-muted text-text-muted',
              )}
            >
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-current={active ? 'page' : undefined}
        title={collapsed ? label : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
    >
      {content}
    </button>
  )
}
