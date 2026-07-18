import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ComponentProps } from 'react'
import { Modal } from './Modal'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('modal'), layout: 'fullscreen' },
  args: {
    open: false,
    onClose: () => undefined,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

function ModalDemo(args: ComponentProps<typeof Modal>) {
  const [open, setOpen] = useState(true)
  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white"
        onClick={() => setOpen(true)}
      >
        Open modal
      </button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Default: Story = {
  render: (args) => (
    <ModalDemo
      {...args}
      title="Edit profile"
      footer={
        <>
          <button type="button" className="rounded-lg px-4 py-2 text-sm text-text-muted">
            Cancel
          </button>
          <button type="button" className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white">
            Save
          </button>
        </>
      }
    >
      <p className="text-sm text-text-muted">
        Update your account details. Press Escape or click the backdrop to close.
      </p>
    </ModalDemo>
  ),
}

export const Large: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Project overview" size="lg">
      <p className="text-sm text-text-muted">Expanded modal for richer content layouts.</p>
    </ModalDemo>
  ),
}
