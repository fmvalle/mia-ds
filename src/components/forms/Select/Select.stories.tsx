import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
]

const meta = {
  title: 'Formulários/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('select'),
  },
  args: {
    label: 'Country',
    options,
    placeholder: 'Select a country',
    helperText: 'Choose your country of residence.',
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'Please select a country.',
    helperText: undefined,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
