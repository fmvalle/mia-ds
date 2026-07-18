import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BottomNavItem = {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  onClick?: () => void
  badge?: number
}

export type BottomNavProps = {
  items: BottomNavItem[]
  activeId?: string
  className?: string
}

export function BottomNav({ items, activeId, className }: BottomNavProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-2 pb-[env(safe-area-inset-bottom)]',
        className,
      )}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeId

          const content = (
            <>
              <span className="relative">
                <Icon
                  className={cn('size-5', isActive ? 'text-primary-500' : 'text-text-subtle')}
                  aria-hidden
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </span>
              <span
                className={cn(
                  'text-[10px] font-medium',
                  isActive ? 'text-primary-500' : 'text-text-subtle',
                )}
              >
                {item.label}
              </span>
            </>
          )

          const itemClasses = cn(
            'flex flex-1 flex-col items-center gap-1 py-2 transition-colors',
            isActive ? 'text-primary-500' : 'text-text-muted',
          )

          return (
            <li key={item.id}>
              {item.href ? (
                <a
                  href={item.href}
                  className={itemClasses}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={itemClasses}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
