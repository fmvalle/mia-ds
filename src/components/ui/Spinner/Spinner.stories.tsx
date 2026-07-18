import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('spinner'),
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    color: 'primary',
    size: 'md',
  },
}

export const White: Story = {
  args: {
    color: 'white',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="rounded-md bg-primary-500 p-4">
        <Story />
      </div>
    ),
  ],
}

export const Muted: Story = {
  args: {
    color: 'muted',
    size: 'md',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner color="primary" />
      <Spinner color="muted" />
      <div className="rounded-md bg-primary-500 p-3">
        <Spinner color="white" />
      </div>
    </div>
  ),
}
