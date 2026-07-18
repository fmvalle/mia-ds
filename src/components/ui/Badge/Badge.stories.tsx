import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('badge'),
  },
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const WithDot: Story = {
  args: {
    dot: true,
    children: 'Active',
    variant: 'success',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const StatusDots: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Pending
      </Badge>
      <Badge variant="danger" dot>
        Error
      </Badge>
      <Badge variant="info" dot>
        Syncing
      </Badge>
    </div>
  ),
}
