import type { Meta, StoryObj } from '@storybook/react-vite'
import { Inline } from './Inline'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Layout/Inline',
  component: Inline,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('inline'),
  },
} satisfies Meta<typeof Inline>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ label }: { label: string }) => (
  <div className="rounded-lg bg-primary-50 px-4 py-3 text-sm font-medium text-primary-600">
    {label}
  </div>
)

export const Default: Story = {
  args: {
    gap: 3,
    children: (
      <>
        <Box label="Item 1" />
        <Box label="Item 2" />
        <Box label="Item 3" />
      </>
    ),
  },
}

export const SpaceBetween: Story = {
  args: {
    gap: 3,
    justify: 'between',
    children: (
      <>
        <Box label="Left" />
        <Box label="Right" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}
