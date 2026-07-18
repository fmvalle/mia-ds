import type { Meta, StoryObj } from '@storybook/react-vite'
import { Metric } from './Metric'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/Metric',
  component: Metric,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('metric'),
  },
  args: {
    label: 'Total sales',
    value: '$128,430',
    trend: 18.4,
  },
} satisfies Meta<typeof Metric>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NegativeTrend: Story = {
  args: { label: 'Bounce rate', value: '42.1%', trend: -5.2 },
}

export const NoTrend: Story = {
  args: { label: 'Active users', value: '2,481', trend: undefined },
}
