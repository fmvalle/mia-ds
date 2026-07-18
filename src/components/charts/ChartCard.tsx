import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../data/Card'

export type ChartCardProps = {
  title: string
  description?: string
  children: ReactNode
  className?: string
  height?: number
}

export function ChartCard({
  title,
  description,
  children,
  className,
  height = 320,
}: ChartCardProps) {
  return (
    <Card className={cn('flex flex-col overflow-hidden rounded-xl', className)}>
      <CardHeader className="gap-1 pb-0">
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription className="text-sm">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <div className="w-full" style={{ height }}>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
