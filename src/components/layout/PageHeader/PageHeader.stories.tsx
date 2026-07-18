import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageHeader } from './PageHeader'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('pageHeader'),
    layout: 'padded',
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dashboard',
    description: 'Welcome back! Here is an overview of your business.',
  },
}

export const WithActions: Story = {
  args: {
    title: 'Projects',
    description: 'Manage and track your active projects.',
    actions: (
      <>
        <button
          type="button"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text hover:bg-surface-muted"
        >
          Export
        </button>
        <button
          type="button"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
        >
          New Project
        </button>
      </>
    ),
  },
}
