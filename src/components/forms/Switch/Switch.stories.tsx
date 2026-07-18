import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Switch } from './Switch'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('switch'),
  },
  args: {
    label: 'Email notifications',
    description: 'Receive email updates about your account.',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    )
  },
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    checked: true,
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}
