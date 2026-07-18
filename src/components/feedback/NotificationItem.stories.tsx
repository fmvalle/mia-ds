import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageSquare } from 'lucide-react'
import { NotificationItem } from './NotificationItem'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('notificationItem'),
  },
  args: {
    title: 'New comment on Design System',
    description: 'Sarah mentioned you in a thread about component tokens.',
    time: '2 min ago',
  },
} satisfies Meta<typeof NotificationItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Unread: Story = {
  args: { unread: true },
}

export const WithAvatar: Story = {
  args: {
    avatar: (
      <img
        src="https://i.pravatar.cc/80?img=12"
        alt=""
        className="size-10 shrink-0 rounded-full object-cover"
      />
    ),
    title: 'Alex assigned you a task',
    description: 'Review the Q3 revenue dashboard mockups.',
    time: '1 hour ago',
    unread: true,
  },
}

export const CustomIcon: Story = {
  args: {
    icon: MessageSquare,
    title: 'New message',
    description: 'Team chat has 3 unread messages.',
    time: 'Yesterday',
  },
}
