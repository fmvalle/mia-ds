import { cn } from '@/lib/utils'

export type ChartPlaceholderVariant = 'bar' | 'donut' | 'area'

export interface ChartPlaceholderProps {
  variant?: ChartPlaceholderVariant
  title?: string
  className?: string
}

const barHeights = [42, 68, 55, 82, 64, 90, 72, 58, 76, 48, 85, 62]

export function ChartPlaceholder({
  variant = 'bar',
  title = 'Revenue Forecast',
  className,
}: ChartPlaceholderProps) {
  return (
    <div className={cn('rounded-lg bg-surface p-5 shadow-card', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-semibold text-text">{title}</h4>
        <span className="text-xs text-text-subtle">Placeholder</span>
      </div>

      {variant === 'bar' ? (
        <div className="flex h-40 items-end gap-2">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-md bg-gradient-to-t from-primary-500 to-primary-300 opacity-80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      ) : null}

      {variant === 'donut' ? (
        <div className="flex h-40 items-center justify-center">
          <svg viewBox="0 0 120 120" className="size-36" aria-hidden>
            <circle cx="60" cy="60" r="42" fill="none" stroke="#f5eeff" strokeWidth="16" />
            <circle
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke="#8e3ff5"
              strokeWidth="16"
              strokeDasharray="180 264"
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <circle
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke="#2e90fa"
              strokeWidth="16"
              strokeDasharray="90 354"
              strokeDashoffset="-180"
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
        </div>
      ) : null}

      {variant === 'area' ? (
        <div className="h-40">
          <svg viewBox="0 0 320 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8e3ff5" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#8e3ff5" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path
              d="M0,90 L30,72 L60,78 L90,52 L120,58 L150,34 L180,42 L210,28 L240,36 L270,18 L300,24 L320,12 L320,120 L0,120 Z"
              fill="url(#areaFill)"
            />
            <path
              d="M0,90 L30,72 L60,78 L90,52 L120,58 L150,34 L180,42 L210,28 L240,36 L270,18 L300,24 L320,12"
              fill="none"
              stroke="#8e3ff5"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      ) : null}
    </div>
  )
}
