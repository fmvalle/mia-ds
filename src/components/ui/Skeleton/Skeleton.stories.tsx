import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('skeleton'),
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
}

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 320,
    height: 160,
  },
}

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-80 space-y-4 rounded-md border border-border bg-surface p-4 shadow-card">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} />
      <div className="space-y-2">
        <Skeleton />
        <Skeleton width="90%" />
        <Skeleton width="75%" />
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="w-64 space-y-2">
        <Skeleton />
        <Skeleton width="80%" />
      </div>
      <Skeleton variant="circular" width={56} height={56} />
      <Skeleton variant="rectangular" width={240} height={100} />
    </div>
  ),
}
