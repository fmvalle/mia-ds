import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import { chartPalette, chartTheme } from './theme'

export type ScatterPoint = {
  name: string
  x: number
  y: number
  students: number
}

export type ScatterChartProps = {
  data: ScatterPoint[]
  emptyMessage?: string
  xName?: string
  yName?: string
  zName?: string
}

export function ScatterChart({
  data,
  emptyMessage = 'Sem dados disponíveis.',
  xName = 'Média',
  yName = 'Amplitude',
  zName = 'Total',
}: ScatterChartProps) {
  if (data.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
        <CartesianGrid stroke={chartTheme.gridStroke} strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="x"
          name={xName}
          unit=" anos"
          tick={{ fill: chartTheme.textColor, fontSize: chartTheme.fontSize }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yName}
          unit=" anos"
          tick={{ fill: chartTheme.textColor, fontSize: chartTheme.fontSize }}
          axisLine={false}
          tickLine={false}
        />
        <ZAxis type="number" dataKey="students" range={[80, 400]} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={chartTheme.tooltipStyle}
          formatter={(value, name) => {
            if (name === 'students') return [`${value} alunos`, zName]
            return [`${value} anos`, name === 'x' ? xName : yName]
          }}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ''}
        />
        <Scatter data={data} fill={chartPalette[0]} />
      </RechartsScatterChart>
    </ResponsiveContainer>
  )
}
