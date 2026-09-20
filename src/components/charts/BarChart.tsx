import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartResponsiveContainer } from './ChartResponsiveContainer'
import { chartPalette, chartTheme, chartColors, defaultChartMargin } from './theme'

export type BarChartPoint = {
  name: string
  value: number
  color?: string
}

export type BarChartProps = {
  data: BarChartPoint[]
  /** `horizontal` = bars grow left→right (ranking). `vertical` = classic columns. */
  layout?: 'horizontal' | 'vertical'
  valueLabel?: string
  emptyMessage?: string
  /** Angle X-axis labels (vertical layout only). */
  xTickAngle?: number
}

export function BarChart({
  data,
  layout = 'horizontal',
  valueLabel = 'Total',
  emptyMessage = 'Sem dados disponíveis.',
  xTickAngle = 0,
}: BarChartProps) {
  if (data.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>
  }

  const chartData =
    layout === 'horizontal' ? [...data].sort((a, b) => b.value - a.value) : data

  if (layout === 'horizontal') {
    return (
      <ChartResponsiveContainer>
        <RechartsBarChart
          data={chartData}
          layout="vertical"
          margin={{ ...defaultChartMargin, left: 8, right: 16, bottom: 8 }}
        >
          <CartesianGrid stroke={chartTheme.gridStroke} strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fill: chartTheme.textColor, fontSize: chartTheme.fontSize }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fill: chartColors.neutral[700], fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={chartTheme.tooltipStyle}
            formatter={(value) => [`${value}`, valueLabel]}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={28}>
            {chartData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? chartPalette[index % chartPalette.length]}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ChartResponsiveContainer>
    )
  }

  const angled = xTickAngle !== 0

  return (
    <ChartResponsiveContainer>
      <RechartsBarChart
        data={chartData}
        margin={{
          ...defaultChartMargin,
          bottom: angled ? 64 : 8,
          left: 0,
          right: 8,
        }}
      >
        <CartesianGrid stroke={chartTheme.gridStroke} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: chartTheme.textColor, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={xTickAngle}
          textAnchor={angled ? 'end' : 'middle'}
          height={angled ? 72 : 30}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: chartTheme.textColor, fontSize: chartTheme.fontSize }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={chartTheme.tooltipStyle}
          formatter={(value) => [`${value}`, valueLabel]}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
          {chartData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={entry.color ?? chartPalette[index % chartPalette.length]}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ChartResponsiveContainer>
  )
}

/** @deprecated Prefer BarChart with layout="horizontal" */
export function HorizontalBarChart(props: Omit<BarChartProps, 'layout'>) {
  return <BarChart {...props} layout="horizontal" />
}

export type HorizontalBarPoint = BarChartPoint
