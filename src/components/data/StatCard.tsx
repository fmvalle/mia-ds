import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const statCardVariants = cva('rounded-xl p-5 shadow-card', {
  variants: {
    tone: {
      teal: 'bg-teal-50',
      pink: 'bg-pink-50',
      lavender: 'bg-violet-50',
      blue: 'bg-blue-50',
      amber: 'bg-amber-50',
    },
  },
  defaultVariants: {
    tone: 'teal',
  },
})

const toneIconClasses = {
  teal: 'bg-teal-100 text-teal-600',
  pink: 'bg-pink-100 text-pink-600',
  lavender: 'bg-violet-100 text-violet-600',
  blue: 'bg-blue-100 text-blue-600',
  amber: 'bg-amber-100 text-amber-600',
} as const

export type StatCardTone = NonNullable<VariantProps<typeof statCardVariants>['tone']>

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string
  value: string
  change?: number
  icon?: LucideIcon
  className?: string
}

export function StatCard({ title, value, change, icon: Icon, tone = 'teal', className }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className={cn(statCardVariants({ tone }), className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="mt-2 text-2xl font-bold text-text">{value}</p>
          {change !== undefined ? (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-sm font-medium',
                isPositive ? 'text-success-600' : 'text-danger-600',
              )}
            >
              <TrendIcon className="size-4" />
              {isPositive ? '+' : ''}
              {change}%
            </div>
          ) : null}
        </div>
        {Icon ? (
          <div className={cn('flex size-11 items-center justify-center rounded-xl', toneIconClasses[tone ?? 'teal'])}>
            <Icon className="size-5" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
