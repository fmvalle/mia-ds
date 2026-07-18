import { useId } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartPalette, chartTheme, chartColors, defaultChartMargin } from './theme'

export type TimelinePoint = {
  date: string
  label: string
  value: number
}

export type TimelineChartProps = {
  data: TimelinePoint[]
  color?: string
  valueLabel?: string
  emptyMessage?: string
}

export function TimelineChart({
  data,
  color = chartPalette[0],
  valueLabel = 'Volume',
  emptyMessage = 'Sem dados no período.',
}: TimelineChartProps) {
  const gradientId = `mia-timeline-gradient-${useId().replace(/:/g, '')}`

  if (data.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={defaultChartMargin}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={chartTheme.gridStroke} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: chartTheme.textColor, fontSize: chartTheme.fontSize }}
          axisLine={false}
          tickLine={false}
          minTickGap={24}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: chartTheme.textColor, fontSize: chartTheme.fontSize }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={chartTheme.tooltipStyle}
          labelStyle={{ color: chartColors.neutral[900], fontWeight: 600 }}
          formatter={(value) => [`${value}`, valueLabel]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={{ r: 3, fill: color, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: color, stroke: chartColors.neutral[50], strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
