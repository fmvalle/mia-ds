import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Heart, Settings, Trash2 } from 'lucide-react'
import { IconButton } from './IconButton'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('iconButton'),
  },
  args: {
    icon: <Settings />,
    'aria-label': 'Settings',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Ghost: Story = {
  args: { variant: 'ghost', icon: <Heart /> },
}

export const Soft: Story = {
  args: { variant: 'soft', icon: <Bell /> },
}

export const Outline: Story = {
  args: { variant: 'outline', icon: <Settings /> },
}

export const Danger: Story = {
  args: {
    variant: 'ghost',
    icon: <Trash2 className="text-danger-500" />,
    'aria-label': 'Delete',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary" icon={<Settings />} aria-label="Settings primary" />
      <IconButton variant="ghost" icon={<Settings />} aria-label="Settings ghost" />
      <IconButton variant="soft" icon={<Settings />} aria-label="Settings soft" />
      <IconButton variant="outline" icon={<Settings />} aria-label="Settings outline" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton size="sm" icon={<Settings />} aria-label="Small" />
      <IconButton size="md" icon={<Settings />} aria-label="Medium" />
      <IconButton size="lg" icon={<Settings />} aria-label="Large" />
    </div>
  ),
}
