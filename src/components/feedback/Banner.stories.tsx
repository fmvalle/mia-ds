import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banner } from './Banner'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('banner'), layout: 'padded' },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Maintenance scheduled',
    description: 'Dashboard will be unavailable Sunday 2–4 AM UTC.',
  },
}

export const Promo: Story = {
  args: {
    variant: 'promo',
    title: 'Upgrade to Pro',
    description: 'Unlock advanced analytics and unlimited projects.',
    action: (
      <button type="button" className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-primary-600">
        Learn more
      </button>
    ),
  },
}

export const Dismissible: Story = {
  args: {
    variant: 'warning',
    title: 'Trial ending soon',
    description: 'Your trial expires in 5 days.',
    dismissible: true,
    onDismiss: () => undefined,
  },
}
