import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type StackProps = {
  children: ReactNode
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  align?: 'start' | 'center' | 'end' | 'stretch'
  className?: string
}

const gapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
} as const

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const

export function Stack({ children, gap = 4, align = 'stretch', className }: StackProps) {
  return (
    <div className={cn('flex flex-col', gapClasses[gap], alignClasses[align], className)}>
      {children}
    </div>
  )
}
