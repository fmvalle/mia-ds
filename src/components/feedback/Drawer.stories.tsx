import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ComponentProps } from 'react'
import { Drawer } from './Drawer'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('drawer'), layout: 'fullscreen' },
  args: {
    open: false,
    onClose: () => undefined,
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

function DrawerDemo(args: ComponentProps<typeof Drawer>) {
  const [open, setOpen] = useState(true)
  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white"
        onClick={() => setOpen(true)}
      >
        Open drawer
      </button>
      <Drawer {...args} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Right: Story = {
  render: (args) => (
    <DrawerDemo
      {...args}
      title="Notifications"
      footer={
        <button type="button" className="w-full rounded-lg bg-primary-500 py-2 text-sm font-medium text-white">
          Mark all read
        </button>
      }
    >
      <p className="text-sm text-text-muted">Side panel content slides in from the right.</p>
    </DrawerDemo>
  ),
}

export const Left: Story = {
  render: (args) => (
    <DrawerDemo {...args} side="left" title="Filters">
      <p className="text-sm text-text-muted">Filter options and settings panel.</p>
    </DrawerDemo>
  ),
}
