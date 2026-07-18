import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChartCard } from './ChartCard'
import { TimelineChart } from './TimelineChart'
import { BarChart } from './BarChart'
import { DonutChart } from './DonutChart'
import { ScatterChart } from './ScatterChart'
import { DistributionBar } from './DistributionBar'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/Charts',
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('charts'),
    layout: 'padded',
  },
} satisfies Meta

export default meta

const timelineData = [
  { date: '2026-07-01', label: '01/07', value: 4 },
  { date: '2026-07-02', label: '02/07', value: 8 },
  { date: '2026-07-03', label: '03/07', value: 5 },
  { date: '2026-07-04', label: '04/07', value: 12 },
  { date: '2026-07-05', label: '05/07', value: 7 },
]

const barData = [
  { name: 'Ana', value: 18 },
  { name: 'Bruno', value: 12 },
  { name: 'Carla', value: 9 },
  { name: 'Diego', value: 6 },
]

export const Timeline: StoryObj = {
  render: () => (
    <ChartCard title="Linha do tempo" description="Volume diário">
      <TimelineChart data={timelineData} valueLabel="Registros" />
    </ChartCard>
  ),
}

export const HorizontalBars: StoryObj = {
  render: () => (
    <ChartCard title="Engajamento" description="Ranking">
      <BarChart data={barData} layout="horizontal" valueLabel="Registros" />
    </ChartCard>
  ),
}

export const VerticalBars: StoryObj = {
  render: () => (
    <ChartCard title="Por grupo" description="Colunas" height={360}>
      <BarChart
        data={[
          { name: 'Alimentação', value: 14 },
          { name: 'Sono', value: 9 },
          { name: 'Higiene', value: 7 },
        ]}
        layout="vertical"
        valueLabel="Registros"
        xTickAngle={-24}
      />
    </ChartCard>
  ),
}

export const Donut: StoryObj = {
  render: () => (
    <ChartCard title="Categorias" description="Distribuição">
      <DonutChart
        data={[
          { name: 'Alimentação', value: 12 },
          { name: 'Sono', value: 8 },
          { name: 'Higiene', value: 5 },
        ]}
        valueLabel="Itens"
      />
    </ChartCard>
  ),
}

export const Scatter: StoryObj = {
  render: () => (
    <ChartCard title="Homogeneidade" description="Média vs amplitude">
      <ScatterChart
        data={[
          { name: 'Turma A', x: 3.2, y: 1.1, students: 12 },
          { name: 'Turma B', x: 4.0, y: 2.4, students: 18 },
          { name: 'Turma C', x: 2.8, y: 0.8, students: 8 },
        ]}
      />
    </ChartCard>
  ),
}

export const Distribution: StoryObj = {
  render: () => (
    <ChartCard title="Status pedagógico" description="Proporção" height={140}>
      <DistributionBar
        segments={[
          { status: 'Turma pequena', count: 2, percentage: 25 },
          { status: 'Rácio adequado', count: 5, percentage: 50 },
          { status: 'Turma grande', count: 3, percentage: 25 },
        ]}
      />
    </ChartCard>
  ),
}
