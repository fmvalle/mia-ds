import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, User } from 'lucide-react'
import { Chip } from './Chip'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('chip'),
  },
  args: {
    children: 'Design System',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <Tag />,
    children: 'Tagged',
  },
}

export const WithAvatar: Story = {
  args: {
    avatar: { name: 'Felipe Valle' },
    children: 'Felipe Valle',
    variant: 'neutral',
  },
}

export const Dismissible: Story = {
  args: {
    dismissible: true,
    children: 'React',
    variant: 'secondary',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="danger">Danger</Chip>
      <Chip variant="neutral">Neutral</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
}

export const RichChip: Story = {
  render: () => (
    <Chip
      variant="outline"
      icon={<User />}
      avatar={{ name: 'Anna Lee' }}
      dismissible
      onDismiss={() => undefined}
    >
      Anna Lee
    </Chip>
  ),
}
