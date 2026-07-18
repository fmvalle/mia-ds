import type { Meta, StoryObj } from '@storybook/react-vite'
import { DollarSign, ShoppingBag, Users } from 'lucide-react'
import { StatCard } from './StatCard'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('statCard'),
  },
  args: {
    title: 'Total revenue',
    value: '$96,420',
    change: 12.5,
    tone: 'teal',
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { icon: DollarSign },
}

export const NegativeChange: Story = {
  args: { tone: 'pink', title: 'Refunds', value: '$1,240', change: -3.2, icon: ShoppingBag },
}

export const AllTones: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard tone="teal" title="Revenue" value="$48k" change={8.2} icon={DollarSign} />
      <StatCard tone="pink" title="Orders" value="1,284" change={4.1} icon={ShoppingBag} />
      <StatCard tone="lavender" title="Users" value="8,942" change={15.3} icon={Users} />
      <StatCard tone="blue" title="Sessions" value="24.5k" change={-2.4} icon={Users} />
      <StatCard tone="amber" title="Conversion" value="3.8%" change={1.1} icon={DollarSign} />
    </div>
  ),
}
