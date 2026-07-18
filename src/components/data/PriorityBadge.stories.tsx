import type { Meta, StoryObj } from '@storybook/react-vite'
import { PriorityBadge } from './PriorityBadge'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/PriorityBadge',
  component: PriorityBadge,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('priorityBadge'),
  },
} satisfies Meta<typeof PriorityBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Low: Story = { args: { priority: 'Low' } }
export const Medium: Story = { args: { priority: 'Medium' } }
export const High: Story = { args: { priority: 'High' } }
export const VeryHigh: Story = { args: { priority: 'Very High' } }

export const AllPriorities: Story = {
  args: { priority: 'Medium' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PriorityBadge priority="Low" />
      <PriorityBadge priority="Medium" />
      <PriorityBadge priority="High" />
      <PriorityBadge priority="Very High" />
    </div>
  ),
}
