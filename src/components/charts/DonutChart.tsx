import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import { ChartResponsiveContainer } from './ChartResponsiveContainer'
import { chartPalette, chartTheme, chartColors } from './theme'

export type DonutChartPoint = {
  name: string
  value: number
  color?: string
}

export type DonutChartProps = {
  data: DonutChartPoint[]
  valueLabel?: string
  emptyMessage?: string
  showLegend?: boolean
}

export function DonutChart({
  data,
  valueLabel = 'Total',
  emptyMessage = 'Sem dados disponíveis.',
  showLegend = true,
}: DonutChartProps) {
  if (data.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>
  }

  return (
    <ChartResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={entry.color ?? chartPalette[index % chartPalette.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartTheme.tooltipStyle}
          labelStyle={{ color: chartColors.neutral[900], fontWeight: 600 }}
          formatter={(value) => [Number(value), valueLabel]}
        />
        {showLegend ? <Legend /> : null}
      </PieChart>
    </ChartResponsiveContainer>
  )
}
