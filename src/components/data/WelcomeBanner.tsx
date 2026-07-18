import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface WelcomeBannerMetric {
  label: string
  value: string
}

export interface WelcomeBannerProps {
  greeting: string
  subtitle?: string
  metrics?: WelcomeBannerMetric[]
  illustration?: ReactNode
  className?: string
}

export function WelcomeBanner({
  greeting,
  subtitle,
  metrics = [],
  illustration,
  className,
}: WelcomeBannerProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 p-6 text-white shadow-card md:p-8',
        className,
      )}
    >
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold md:text-3xl">{greeting}</h2>
          {subtitle ? <p className="mt-2 text-sm text-white/85 md:text-base">{subtitle}</p> : null}
          {metrics.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-6">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-xs uppercase tracking-wide text-white/70">{metric.label}</p>
                  <p className="mt-1 text-xl font-bold">{metric.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {illustration ? <div className="shrink-0">{illustration}</div> : null}
      </div>
      <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-12 right-24 size-56 rounded-full bg-white/5" />
    </div>
  )
}
