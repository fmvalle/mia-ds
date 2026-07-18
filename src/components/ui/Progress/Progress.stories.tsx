import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('progress'),
  },
  args: {
    value: 45,
    label: 'Upload progress',
    showValue: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: {
    variant: 'success',
    value: 100,
    label: 'Completed',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    value: 72,
    label: 'Storage used',
  },
}

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    showValue: false,
    value: 30,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress variant="primary" value={40} label="Primary" showValue />
      <Progress variant="secondary" value={55} label="Secondary" showValue />
      <Progress variant="success" value={70} label="Success" showValue />
      <Progress variant="warning" value={85} label="Warning" showValue />
      <Progress variant="danger" value={95} label="Danger" showValue />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress size="sm" value={35} label="Small" showValue />
      <Progress size="md" value={50} label="Medium" showValue />
      <Progress size="lg" value={65} label="Large" showValue />
    </div>
  ),
}
