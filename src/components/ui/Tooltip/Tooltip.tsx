import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface TooltipProps {
  className?: string
  content: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

const sideClasses = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
} as const

export function Tooltip({ className, content, children, side = 'top' }: TooltipProps) {
  return (
    <span className={cn('group/tooltip relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 rounded-md bg-text px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-dropdown transition-opacity duration-200 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100',
          sideClasses[side],
        )}
      >
        {content}
      </span>
    </span>
  )
}
