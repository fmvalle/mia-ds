import type { ReactNode } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export type HeaderProps = {
  left?: ReactNode
  title?: string
  breadcrumbs?: ReactNode
  onMenuToggle?: () => void
  showSearch?: boolean
  searchPlaceholder?: string
  actions?: ReactNode
  avatar?: ReactNode
  className?: string
}

export function Header({
  left,
  title,
  breadcrumbs,
  onMenuToggle,
  showSearch = true,
  searchPlaceholder = 'Search...',
  actions,
  avatar,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'flex h-16 shrink-0 items-center gap-4 border-b border-border bg-surface px-4 lg:px-6',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex size-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        )}

        {left}

        {breadcrumbs}

        {title && !breadcrumbs && (
          <h1 className="truncate text-lg font-semibold text-text">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative hidden sm:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-subtle"
              aria-hidden
            />
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="h-9 w-48 rounded-lg border border-border bg-surface-muted pl-9 pr-3 text-sm text-text placeholder:text-text-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:w-64"
              aria-label="Search"
            />
          </div>
        )}

        {actions}
        {avatar}
      </div>
    </header>
  )
}

/** Alias for Header — Mia top bar chrome. */
export const Topbar = Header
