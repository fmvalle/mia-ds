import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Tabs } from './Tabs'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('tabs'), layout: 'padded' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { value: 'overview', label: 'Overview', content: <p className="text-sm text-text-muted">Overview metrics and summary.</p> },
  { value: 'analytics', label: 'Analytics', content: <p className="text-sm text-text-muted">Detailed analytics charts.</p> },
  { value: 'reports', label: 'Reports', content: <p className="text-sm text-text-muted">Downloadable report exports.</p> },
]

export const Uncontrolled: Story = {
  args: { items, defaultValue: 'overview' },
}

export const Controlled: Story = {
  args: { items, defaultValue: 'overview' },
  render: () => {
    const [value, setValue] = useState('analytics')
    return <Tabs items={items} value={value} onChange={setValue} />
  },
}

export const WithDisabled: Story = {
  args: {
    items: [
      ...items.slice(0, 2),
      { ...items[2], disabled: true },
    ],
  },
}
