import type { LucideIcon } from 'lucide-react'
import { Bell } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface NotificationItemProps {
  avatar?: ReactNode
  icon?: LucideIcon
  title: string
  description?: ReactNode
  time: string
  unread?: boolean
  onClick?: () => void
  className?: string
}

export function NotificationItem({
  avatar,
  icon: Icon = Bell,
  title,
  description,
  time,
  unread = false,
  onClick,
  className,
}: NotificationItemProps) {
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left transition',
        unread ? 'bg-primary-50/60' : 'hover:bg-surface-muted',
        className,
      )}
    >
      {avatar ?? (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <Icon className="size-5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm text-text', unread && 'font-semibold')}>{title}</p>
          {unread ? <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary-500" aria-hidden /> : null}
        </div>
        {description ? <p className="mt-0.5 text-sm text-text-muted">{description}</p> : null}
        <p className="mt-1 text-xs text-text-subtle">{time}</p>
      </div>
    </Wrapper>
  )
}
