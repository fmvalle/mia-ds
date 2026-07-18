import type { Meta, StoryObj } from '@storybook/react-vite'
import { FolderOpen } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('emptyState'),
  },
  args: {
    title: 'No projects yet',
    description: 'Create your first project to start tracking progress and team activity.',
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    action: (
      <button type="button" className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white">
        Create project
      </button>
    ),
  },
}

export const CustomIcon: Story = {
  args: {
    icon: FolderOpen,
    title: 'No files found',
    description: 'Upload documents to see them listed here.',
  },
}
