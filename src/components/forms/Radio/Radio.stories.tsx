import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('radio'),
  },
  args: {
    label: 'Option A',
    description: 'Description for this option.',
    name: 'demo',
    value: 'a',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <Radio
        {...args}
        checked={checked}
        onChange={() => setChecked(true)}
      />
    )
  },
}

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('starter')
    return (
      <RadioGroup
        label="Plan"
        helperText="Select the plan that fits your needs."
        value={value}
        onChange={setValue}
        options={[
          { value: 'starter', label: 'Starter', description: 'For individuals.' },
          { value: 'pro', label: 'Pro', description: 'For growing teams.' },
          { value: 'enterprise', label: 'Enterprise', description: 'For large organizations.' },
        ]}
      />
    )
  },
}

export const GroupWithError: Story = {
  render: () => (
    <RadioGroup
      label="Plan"
      error="Please select a plan."
      options={[
        { value: 'starter', label: 'Starter' },
        { value: 'pro', label: 'Pro' },
      ]}
    />
  ),
}
