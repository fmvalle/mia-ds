import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('textarea'),
  },
  args: {
    label: 'Description',
    placeholder: 'Write something...',
    helperText: 'Maximum 500 characters.',
    rows: 4,
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'Description is required.',
    helperText: undefined,
  },
}

export const NoResize: Story = {
  args: {
    resize: 'none',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This textarea is disabled.',
  },
}
