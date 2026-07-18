import type { Meta, StoryObj } from '@storybook/react-vite'
import { Globe, Mail, Smartphone } from 'lucide-react'
import { List, ListItem } from './List'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Dados/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('list'), layout: 'padded' },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const PerformanceList: Story = {
  render: () => (
    <List className="w-full max-w-lg">
      <ListItem
        icon={
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
            <Globe className="size-5" />
          </div>
        }
        title="Website traffic"
        description="Organic search and referrals"
        trailing={<span className="text-sm font-semibold text-success-600">+24%</span>}
      />
      <ListItem
        icon={
          <div className="flex size-10 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
            <Mail className="size-5" />
          </div>
        }
        title="Email campaigns"
        description="Newsletter and lifecycle flows"
        trailing={<span className="text-sm font-semibold text-success-600">+12%</span>}
      />
      <ListItem
        icon={
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <Smartphone className="size-5" />
          </div>
        }
        title="Mobile sessions"
        description="iOS and Android app usage"
        trailing={<span className="text-sm font-semibold text-danger-600">-4%</span>}
      />
    </List>
  ),
}
