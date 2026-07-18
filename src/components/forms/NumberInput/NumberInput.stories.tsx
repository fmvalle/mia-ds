import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { NumberInput } from './NumberInput'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('numberInput'),
  },
  args: {
    label: 'Quantity',
    helperText: 'Select the number of items.',
    min: 0,
    max: 10,
    step: 1,
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(1)
    return <NumberInput {...args} value={value} onValueChange={setValue} />
  },
}

export const WithError: Story = {
  args: {
    error: 'Quantity must be at least 1.',
    helperText: undefined,
    value: 0,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 5,
  },
}
