import type { Meta, StoryObj } from '@storybook/react-vite'
import { Inline } from '../Inline'
import { Spacer } from './Spacer'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('spacer'),
  },
} satisfies Meta<typeof Spacer>

export default meta
type Story = StoryObj<typeof meta>

export const Grow: Story = {
  render: () => (
    <Inline className="w-full max-w-md rounded-xl border border-border bg-surface p-4">
      <span className="text-sm text-text">Left</span>
      <Spacer />
      <span className="text-sm text-text">Right</span>
    </Inline>
  ),
}

export const FixedSize: Story = {
  render: () => (
    <div className="flex flex-col">
      <div className="rounded-lg bg-primary-50 p-3 text-sm">Block A</div>
      <Spacer size={24} />
      <div className="rounded-lg bg-primary-50 p-3 text-sm">Block B</div>
    </div>
  ),
}
