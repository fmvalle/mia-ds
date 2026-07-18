import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircularProgress } from './CircularProgress'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('circularProgress'),
  },
  args: {
    value: 68,
    showValue: true,
  },
} satisfies Meta<typeof CircularProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: {
    variant: 'success',
    value: 100,
    label: 'Complete',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    value: 82,
  },
}

export const WithoutValue: Story = {
  args: {
    showValue: false,
    value: 45,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <CircularProgress variant="primary" value={45} />
      <CircularProgress variant="secondary" value={55} />
      <CircularProgress variant="success" value={75} />
      <CircularProgress variant="warning" value={85} />
      <CircularProgress variant="danger" value={95} />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <CircularProgress size="sm" value={40} />
      <CircularProgress size="md" value={55} />
      <CircularProgress size="lg" value={70} />
      <CircularProgress size="xl" value={85} />
    </div>
  ),
}
