import { type HTMLAttributes, type PointerEvent, type ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

export type SwipeActionTone = 'primary' | 'danger'

export type SwipeAction = {
  id: string
  label: string
  icon?: ReactNode
  content?: ReactNode
  onClick?: () => void
  disabled?: boolean
  tone?: SwipeActionTone
}

export interface SwipeActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  actions: SwipeAction[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Reveals individual rounded actions after a left swipe.
 *
 * The action panel stays transparent while closed, preserving the card's
 * borders and shadow. On desktop, click and drag the card to preview it.
 */
export function SwipeActions({
  children,
  actions,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: SwipeActionsProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [dragStartX, setDragStartX] = useState<number | null>(null)
  const isOpen = open ?? internalOpen
  const actionWidth = actions.length * 72 + Math.max(0, actions.length - 1) * 8 + 16

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragStartX(event.clientX)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null) return
    const delta = event.clientX - dragStartX
    if (delta <= -32) setOpen(true)
    if (delta >= 32) setOpen(false)
    setDragStartX(null)
  }

  return (
    <div
      className={cn('relative', className)}
      {...props}
    >
      <div
        aria-label="Ações do item"
        className="absolute inset-y-0 right-0 flex items-center justify-center gap-2 px-2"
        style={{ width: actionWidth }}
        role="group"
      >
        {actions.map((action) => {
          const disabled = action.disabled ?? false
          const tone = action.tone ?? 'primary'
          const className = cn(
            'flex size-[72px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-full px-1 text-center text-[11px] font-bold leading-tight text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
            tone === 'primary' && 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700',
            tone === 'danger' && 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700',
            'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted',
          )
          if (action.content) {
            return (
              <div
                key={action.id}
                aria-label={action.label}
                className={className}
                role="group"
              >
                {action.content}
              </div>
            )
          }
          return (
            <button
              key={action.id}
              type="button"
              disabled={disabled}
              aria-label={action.label}
              onClick={action.onClick}
              className={className}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          )
        })}
      </div>
      <div
        className="relative z-10 transition-transform duration-200 ease-out"
        style={{ transform: isOpen ? `translateX(-${actionWidth}px)` : undefined }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setDragStartX(null)}
      >
        {children}
      </div>
    </div>
  )
}
