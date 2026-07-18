import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChartPlaceholder } from './ChartPlaceholder'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/ChartPlaceholder',
  component: ChartPlaceholder,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('chartPlaceholder'), layout: 'padded' },
} satisfies Meta<typeof ChartPlaceholder>

export default meta
type Story = StoryObj<typeof meta>

export const Bar: Story = {
  args: { variant: 'bar', title: 'Revenue Forecast' },
}

export const Donut: Story = {
  args: { variant: 'donut', title: 'Traffic Sources' },
}

export const Area: Story = {
  args: { variant: 'area', title: 'Monthly Growth' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
      <ChartPlaceholder variant="bar" />
      <ChartPlaceholder variant="donut" title="Distribution" />
      <ChartPlaceholder variant="area" title="Growth Trend" />
    </div>
  ),
}
