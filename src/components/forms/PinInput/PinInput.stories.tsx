import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { PinInput } from './PinInput'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('pinInput'),
  },
  args: {
    label: 'Verification code',
    helperText: 'Enter the 6-digit code sent to your email.',
    length: 6,
  },
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <PinInput {...args} value={value} onChange={setValue} />
  },
}

export const FourDigits: Story = {
  args: {
    length: 4,
    label: 'PIN',
  },
}

export const WithError: Story = {
  args: {
    error: 'Invalid verification code.',
    helperText: undefined,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '123456',
  },
}
