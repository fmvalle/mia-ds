import { cn } from '@/lib/utils'

export type TabsNavItem = {
  id: string
  label: string
  href?: string
  disabled?: boolean
}

export type TabsNavProps = {
  items: TabsNavItem[]
  activeId?: string
  onChange?: (id: string) => void
  className?: string
}

export function TabsNav({ items, activeId, onChange, className }: TabsNavProps) {
  return (
    <nav aria-label="Tabs" className={cn('border-b border-border', className)}>
      <ul className="-mb-px flex gap-1 overflow-x-auto">
        {items.map((item) => {
          const isActive = item.id === activeId

          const tabClasses = cn(
            'inline-flex shrink-0 items-center border-b-2 px-4 py-3 text-sm font-medium transition-colors',
            isActive
              ? 'border-primary-500 text-primary-500'
              : 'border-transparent text-text-muted hover:border-border hover:text-text',
            item.disabled && 'pointer-events-none opacity-50',
          )

          return (
            <li key={item.id}>
              {item.href ? (
                <a
                  href={item.href}
                  className={tabClasses}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={item.disabled}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onChange?.(item.id)}
                  className={tabClasses}
                  aria-current={isActive ? 'page' : undefined}
                  disabled={item.disabled}
                >
                  {item.label}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
