import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, Inbox } from 'lucide-react'
import { NavItem } from './NavItem'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('navItem'),
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <nav className="w-64 rounded-xl bg-surface p-2 shadow-card">
        <Story />
      </nav>
    ),
  ],
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: Home,
    label: 'Dashboard',
    href: '#',
  },
}

export const Active: Story = {
  args: {
    icon: Home,
    label: 'Dashboard',
    href: '#',
    active: true,
  },
}

export const WithBadge: Story = {
  args: {
    icon: Inbox,
    label: 'Inbox',
    href: '#',
    badge: 12,
  },
}

export const Collapsed: Story = {
  args: {
    icon: Home,
    label: 'Dashboard',
    href: '#',
    active: true,
    collapsed: true,
  },
}
