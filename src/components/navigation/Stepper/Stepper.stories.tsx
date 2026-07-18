import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper } from './Stepper'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('stepper'),
    layout: 'padded',
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { id: 'account', label: 'Account', description: 'Basic details' },
  { id: 'profile', label: 'Profile', description: 'Personal info' },
  { id: 'billing', label: 'Billing', description: 'Payment method' },
  { id: 'review', label: 'Review', description: 'Confirm setup' },
]

export const Horizontal: Story = {
  args: {
    steps,
    currentStep: 1,
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl rounded-xl bg-surface p-6 shadow-card">
        <Story />
      </div>
    ),
  ],
}

export const Vertical: Story = {
  args: {
    steps,
    currentStep: 2,
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm rounded-xl bg-surface p-6 shadow-card">
        <Story />
      </div>
    ),
  ],
}

export const Completed: Story = {
  args: {
    steps,
    currentStep: 4,
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl rounded-xl bg-surface p-6 shadow-card">
        <Story />
      </div>
    ),
  ],
}
