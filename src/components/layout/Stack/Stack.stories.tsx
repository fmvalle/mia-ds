import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack } from './Stack'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('stack'),
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ label }: { label: string }) => (
  <div className="rounded-lg bg-primary-50 px-4 py-3 text-sm font-medium text-primary-600">
    {label}
  </div>
)

export const Default: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <Box label="Item 1" />
        <Box label="Item 2" />
        <Box label="Item 3" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}
