import type { ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'

/** Avoids Recharts first-paint warn when parent size is still unknown (-1). */
const INITIAL_DIMENSION = { width: 320, height: 256 }

type ChartResponsiveContainerProps = {
  children: ReactNode
  className?: string
}

/**
 * Shared shell for Recharts charts: fills the parent (ChartCard / h-* wrapper),
 * keeps flex/grid children shrinkable, and seeds a positive initialDimension so
 * ResponsiveContainer does not warn on the first frame.
 */
export function ChartResponsiveContainer({ children, className }: ChartResponsiveContainerProps) {
  return (
    <div className={className ?? 'h-full w-full min-h-0 min-w-0'}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        initialDimension={INITIAL_DIMENSION}
      >
        {children}
      </ResponsiveContainer>
    </div>
  )
}
