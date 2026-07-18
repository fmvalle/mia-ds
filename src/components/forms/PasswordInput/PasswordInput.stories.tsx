import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordInput } from './PasswordInput'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('passwordInput'),
  },
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters.',
  },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'Password is too weak.',
    helperText: undefined,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'password123',
  },
}
