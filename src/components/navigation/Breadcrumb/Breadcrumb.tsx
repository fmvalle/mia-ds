import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  separator?: ReactNode
  className?: string
}

export function Breadcrumb({ items, separator, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <span className="text-text-subtle" aria-hidden>
                  {separator ?? <ChevronRight className="size-3.5" />}
                </span>
              )}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="truncate text-text-muted transition-colors hover:text-primary-500"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'truncate',
                    isLast ? 'font-medium text-text' : 'text-text-muted',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
