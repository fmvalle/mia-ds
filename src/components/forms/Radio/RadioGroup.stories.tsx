import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { RadioGroup } from './RadioGroup'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('radioGroup'),
  },
  args: {
    label: 'Notification preference',
    helperText: 'Choose how you want to be notified.',
    options: [
      { value: 'all', label: 'All notifications' },
      { value: 'important', label: 'Important only' },
      { value: 'none', label: 'None' },
    ],
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('all')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => {
    const [value, setValue] = useState('all')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const WithError: Story = {
  args: {
    error: 'Please select an option.',
    helperText: undefined,
  },
}
