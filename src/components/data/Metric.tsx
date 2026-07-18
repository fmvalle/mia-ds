import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MetricProps {
  label: string
  value: string
  trend?: number
  className?: string
}

export function Metric({ label, value, trend, className }: MetricProps) {
  const isPositive = trend !== undefined && trend >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className={cn('rounded-xl bg-surface p-5 shadow-card', className)}>
      <p className="text-sm font-medium text-text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-text">{value}</p>
      {trend !== undefined ? (
        <div
          className={cn(
            'mt-2 inline-flex items-center gap-1 text-sm font-medium',
            isPositive ? 'text-success-600' : 'text-danger-600',
          )}
        >
          <TrendIcon className="size-4" />
          {isPositive ? '+' : ''}
          {trend}%
        </div>
      ) : null}
    </div>
  )
}
