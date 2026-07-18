import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Slider } from './Slider'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('slider'),
  },
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    showValue: true,
    helperText: 'Adjust the volume level.',
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(50)
    return <Slider {...args} value={value} onValueChange={setValue} />
  },
}

export const WithError: Story = {
  args: {
    error: 'Value must be above 10.',
    helperText: undefined,
    value: 5,
    showValue: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 30,
    showValue: true,
  },
}
