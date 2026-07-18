import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SearchInput } from './SearchInput'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('searchInput'),
  },
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    helperText: 'Type to filter results.',
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    )
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'Mia',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled search',
  },
}
