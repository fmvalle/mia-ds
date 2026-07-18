import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, Search, Settings, User } from 'lucide-react'
import { BottomNav } from './BottomNav'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('bottomNav'),
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomNav>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { id: 'home', label: 'Home', icon: Home, href: '#' },
  { id: 'search', label: 'Search', icon: Search, href: '#' },
  { id: 'profile', label: 'Profile', icon: User, href: '#', badge: 3 },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
]

export const Default: Story = {
  args: {
    items,
    activeId: 'home',
  },
  render: (args) => (
    <div className="relative h-48 bg-surface-muted">
      <BottomNav {...args} />
    </div>
  ),
}
