import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogOut, Settings, User } from 'lucide-react'
import { DropdownMenu } from './DropdownMenu'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Navegação/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('dropdownMenu'),
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: (
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600"
      >
        JD
      </button>
    ),
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'logout', label: 'Log out', icon: LogOut, destructive: true },
    ],
  },
}

export const AlignStart: Story = {
  args: {
    align: 'start',
    trigger: (
      <button
        type="button"
        className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white"
      >
        Actions
      </button>
    ),
    items: [
      { id: 'edit', label: 'Edit' },
      { id: 'duplicate', label: 'Duplicate' },
      { id: 'delete', label: 'Delete', destructive: true },
    ],
  },
}
