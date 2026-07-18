import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail, Search } from 'lucide-react'
import { Input } from './Input'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('input'),
  },
  args: {
    placeholder: 'Enter text...',
    label: 'Label',
    helperText: 'Helper text goes here.',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'This field is required.',
    helperText: undefined,
  },
}

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Mail className="size-4" />,
    placeholder: 'you@example.com',
    label: 'Email',
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Search className="size-4" />,
    label: 'Search',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled value',
  },
}
