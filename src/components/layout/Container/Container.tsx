import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
} as const

export type ContainerSize = keyof typeof sizeClasses

export type ContainerProps = {
  children: ReactNode
  size?: ContainerSize
  centered?: boolean
  className?: string
}

export function Container({
  children,
  size = 'xl',
  centered = true,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-4 lg:px-6',
        sizeClasses[size],
        centered && 'mx-auto',
        className,
      )}
    >
      {children}
    </div>
  )
}
