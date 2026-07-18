import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('label'),
  },
  args: {
    children: 'Email address',
    htmlFor: 'email',
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  args: {
    required: true,
  },
}
