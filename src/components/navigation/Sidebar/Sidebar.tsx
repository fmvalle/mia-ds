import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SidebarProps = {
  logo?: ReactNode
  children: ReactNode
  collapsed?: boolean
  collapsible?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}

export function Sidebar({
  logo,
  children,
  collapsed = false,
  collapsible = false,
  onCollapsedChange,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200',
        collapsed ? 'w-[72px]' : 'w-64',
        className,
      )}
      aria-label="Main navigation"
    >
      {logo && (
        <div
          className={cn(
            'flex h-16 shrink-0 items-center border-b border-border px-4',
            collapsed && 'justify-center px-2',
          )}
        >
          {logo}
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-3">{children}</nav>

      {collapsible && (
        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <ChevronRight className="size-4" aria-hidden />
            ) : (
              <>
                <ChevronLeft className="size-4" aria-hidden />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      )}
    </aside>
  )
}
