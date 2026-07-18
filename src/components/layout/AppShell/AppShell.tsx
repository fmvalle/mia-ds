import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type AppShellProps = {
  sidebar?: ReactNode
  header?: ReactNode
  children: ReactNode
  className?: string
  mainClassName?: string
}

export function AppShell({
  sidebar,
  header,
  children,
  className,
  mainClassName,
}: AppShellProps) {
  return (
    <div className={cn('flex h-screen overflow-hidden bg-surface-muted', className)}>
      {sidebar}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {header}

        <main className={cn('flex-1 overflow-y-auto p-4 lg:p-6', mainClassName)}>{children}</main>
      </div>
    </div>
  )
}
