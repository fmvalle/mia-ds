import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../Input'
import { FormField } from './FormField'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('formField'),
  },
  args: {
    id: 'email',
    label: 'Email',
    helperText: 'We will never share your email.',
    children: <Input id="email" placeholder="you@example.com" />,
  },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const WithError: Story = {
  args: {
    error: 'Please enter a valid email address.',
    helperText: undefined,
  },
}
