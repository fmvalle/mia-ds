import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ComponentProps } from 'react'
import { ConfirmDialog } from './ConfirmDialog'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('confirmDialog'), layout: 'fullscreen' },
  args: {
    open: false,
    onClose: () => undefined,
    onConfirm: () => undefined,
    title: 'Confirm action',
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

function ConfirmDemo(args: ComponentProps<typeof ConfirmDialog>) {
  const [open, setOpen] = useState(true)
  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white"
        onClick={() => setOpen(true)}
      >
        Open confirm dialog
      </button>
      <ConfirmDialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </>
  )
}

export const Default: Story = {
  render: (args) => (
    <ConfirmDemo
      {...args}
      title="Delete project?"
      description="This action cannot be undone. All associated data will be permanently removed."
      confirmLabel="Delete"
      destructive
    />
  ),
}

export const NonDestructive: Story = {
  render: (args) => (
    <ConfirmDemo
      {...args}
      title="Publish changes?"
      description="Your updates will be visible to all team members."
      confirmLabel="Publish"
    />
  ),
}
