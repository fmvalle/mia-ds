import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TabsNav } from './TabsNav'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/TabsNav',
  component: TabsNav,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('tabsNav'),
    layout: 'padded',
  },
} satisfies Meta<typeof TabsNav>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings', disabled: true },
]

export const Default: Story = {
  args: {
    items,
  },
  render: function Render() {
    const [activeId, setActiveId] = useState('overview')
    return (
      <div className="w-full max-w-xl rounded-xl bg-surface shadow-card">
        <TabsNav items={items} activeId={activeId} onChange={setActiveId} />
      </div>
    )
  },
}

export const WithLinks: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'profile', label: 'Profile', href: '#' },
      { id: 'billing', label: 'Billing', href: '#' },
    ],
    activeId: 'home',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl rounded-xl bg-surface shadow-card">
        <Story />
      </div>
    ),
  ],
}
