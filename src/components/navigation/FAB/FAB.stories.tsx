import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { FAB } from './FAB'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/FAB',
  component: FAB,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('fab'),
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FAB>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Open settings',
  },
  render: (args) => (
    <div className="relative h-64 bg-surface-muted">
      <FAB {...args} />
    </div>
  ),
}

export const CustomIcon: Story = {
  args: {
    icon: Plus,
    label: 'Create new',
  },
  render: (args) => (
    <div className="relative h-64 bg-surface-muted">
      <FAB {...args} />
    </div>
  ),
}
