import { cn } from '@/lib/utils'
import { PriorityBadge, type PriorityLevel } from './PriorityBadge'

export interface ProjectRowProps {
  avatar?: string
  title: string
  assignee: string
  progress: number
  priority: PriorityLevel
  budget: string
  className?: string
}

export function ProjectRow({
  avatar,
  title,
  assignee,
  progress,
  priority,
  budget,
  className,
}: ProjectRowProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <tr className={cn('border-b border-border transition hover:bg-surface-muted/40', className)}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img src={avatar} alt="" className="size-9 rounded-full object-cover" />
          ) : (
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
              {title.charAt(0)}
            </div>
          )}
          <span className="font-medium text-text">{title}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-text-muted">{assignee}</td>
      <td className="px-4 py-3">
        <div className="flex min-w-[120px] items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-primary-500 transition-all"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
          <span className="w-10 text-right text-xs font-medium text-text-muted">
            {clampedProgress}%
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <PriorityBadge priority={priority} />
      </td>
      <td className="px-4 py-3 font-medium text-text">{budget}</td>
    </tr>
  )
}
