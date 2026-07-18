import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('alert'),
  },
  args: {
    title: 'Heads up',
    description: 'Your project settings were saved successfully.',
    variant: 'info',
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}

export const Success: Story = {
  args: { variant: 'success', title: 'Success', description: 'Payment processed.' },
}

export const Warning: Story = {
  args: { variant: 'warning', title: 'Warning', description: 'Storage is almost full.' },
}

export const Danger: Story = {
  args: { variant: 'danger', title: 'Error', description: 'Unable to connect to server.' },
}

export const Dismissible: Story = {
  args: { dismissible: true, onDismiss: () => undefined },
}

export const TitleOnly: Story = {
  args: { description: undefined, title: 'Quick notice' },
}
