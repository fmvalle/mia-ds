import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  chartColors,
  chartTheme,
  pedagogicalStatusColors,
} from './theme'

export type DistributionSegment = {
  status: string
  count: number
  percentage: number
  color?: string
}

export type DistributionBarProps = {
  segments: DistributionSegment[]
  emptyMessage?: string
  /** Optional color map; defaults to pedagogicalStatusColors then palette. */
  colorByStatus?: Record<string, string>
}

export function DistributionBar({
  segments,
  emptyMessage = 'Sem dados de distribuição.',
  colorByStatus = pedagogicalStatusColors,
}: DistributionBarProps) {
  if (segments.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>
  }

  const resolveColor = (segment: DistributionSegment) =>
    segment.color ?? colorByStatus[segment.status] ?? chartColors.neutral[400]

  const row: Record<string, number | string> = { name: 'Distribuição' }
  for (const segment of segments) {
    row[segment.status] = segment.percentage
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={48}>
        <BarChart
          data={[row]}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip
            contentStyle={chartTheme.tooltipStyle}
            formatter={(value, name) => [`${Number(value).toFixed(0)}%`, String(name)]}
          />
          {segments.map((segment) => (
            <Bar
              key={segment.status}
              dataKey={segment.status}
              stackId="status"
              fill={resolveColor(segment)}
              radius={[4, 4, 4, 4]}
              barSize={24}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-4">
        {segments.map((segment) => (
          <div key={segment.status} className="flex items-center gap-2 text-sm">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: resolveColor(segment) }}
            />
            <span className="text-text">
              {segment.status}: {segment.count} ({segment.percentage.toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
