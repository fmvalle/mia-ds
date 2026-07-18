import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type DropdownMenuItem = {
  id: string
  label: string
  icon?: LucideIcon
  onClick?: () => void
  href?: string
  destructive?: boolean
  disabled?: boolean
}

export type DropdownMenuProps = {
  trigger: ReactNode
  items: DropdownMenuItem[]
  align?: 'start' | 'end'
  className?: string
}

export function DropdownMenu({ trigger, items, align = 'end', className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen((prev) => !prev)} aria-expanded={open} aria-haspopup="menu">
        {trigger}
      </div>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-50 mt-2 min-w-44 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-dropdown',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item) => {
            const Icon = item.icon
            const itemClasses = cn(
              'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
              item.destructive
                ? 'text-danger-600 hover:bg-danger-50'
                : 'text-text hover:bg-surface-muted',
              item.disabled && 'pointer-events-none opacity-50',
            )

            const content = (
              <>
                {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
                <span>{item.label}</span>
              </>
            )

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  role="menuitem"
                  className={itemClasses}
                  onClick={() => setOpen(false)}
                >
                  {content}
                </a>
              )
            }

            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className={itemClasses}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.()
                  setOpen(false)
                }}
              >
                {content}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Alias for DropdownMenu. */
export const Menu = DropdownMenu
