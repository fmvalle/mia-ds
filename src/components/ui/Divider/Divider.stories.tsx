import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('divider'),
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  args: {
    label: 'or continue with',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="flex h-16 items-stretch gap-4">
        <span className="text-sm text-text-muted">Left</span>
        <Story />
        <span className="text-sm text-text-muted">Right</span>
      </div>
    ),
  ],
}

export const InLayout: Story = {
  render: () => (
    <div className="w-96 space-y-4 rounded-md border border-border bg-surface p-4 shadow-card">
      <p className="text-sm text-text">Account settings</p>
      <Divider />
      <p className="text-sm text-text-muted">Profile, security, and notifications.</p>
      <Divider label="Advanced" />
      <p className="text-sm text-text-muted">API keys and webhooks.</p>
    </div>
  ),
}
