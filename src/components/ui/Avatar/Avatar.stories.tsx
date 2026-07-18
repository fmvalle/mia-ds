import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('avatar'),
  },
  args: {
    name: 'Felipe Valle',
    size: 'md',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Initials: Story = {}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=felipe',
    name: 'Felipe Valle',
  },
}

export const CustomInitials: Story = {
  args: {
    initials: 'MD',
    name: undefined,
  },
}

export const Online: Story = {
  args: {
    status: 'online',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar size="xs" name="Felipe Valle" />
      <Avatar size="sm" name="Felipe Valle" />
      <Avatar size="md" name="Felipe Valle" />
      <Avatar size="lg" name="Felipe Valle" />
      <Avatar size="xl" name="Felipe Valle" />
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Online User" status="online" />
      <Avatar name="Offline User" status="offline" />
      <Avatar name="Busy User" status="busy" />
      <Avatar name="Away User" status="away" />
    </div>
  ),
}

export const ImageWithStatus: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=mia',
    name: 'Mia User',
    status: 'online',
    size: 'lg',
  },
}
