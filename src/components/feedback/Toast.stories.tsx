import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('toast'),
  },
  args: {
    title: 'Update available',
    description: 'A new version of Mia is ready to install.',
    variant: 'info',
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: { variant: 'success', title: 'Saved', description: 'Changes saved successfully.' },
}

export const Warning: Story = {
  args: { variant: 'warning', title: 'Limited access', description: 'Trial ends in 3 days.' },
}

export const Danger: Story = {
  args: { variant: 'danger', title: 'Failed', description: 'Could not upload file.' },
}

export const Dismissible: Story = {
  args: { dismissible: true, onDismiss: () => undefined },
}

export const TopRightPosition: Story = {
  args: { position: 'topRight' },
  decorators: [
    (Story) => (
      <div className="flex justify-end">
        <Story />
      </div>
    ),
  ],
}
