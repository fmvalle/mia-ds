import { cn } from '@/lib/utils'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  time?: string
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative space-y-0', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast ? (
              <span
                className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-border"
                aria-hidden
              />
            ) : null}
            <div className="relative z-10 mt-1 size-[22px] shrink-0 rounded-full border-2 border-primary-500 bg-surface" />
            <div className="min-w-0 flex-1 rounded-lg bg-surface p-4 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-medium text-text">{item.title}</p>
                {item.time ? <span className="text-xs text-text-subtle">{item.time}</span> : null}
              </div>
              {item.description ? (
                <p className="mt-1 text-sm text-text-muted">{item.description}</p>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
