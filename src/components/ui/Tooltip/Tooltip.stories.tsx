import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info } from 'lucide-react'
import { Button } from '../Button'
import { IconButton } from '../IconButton'
import { Tooltip } from './Tooltip'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('tooltip'),
  },
  args: {
    content: 'Helpful tooltip text',
    children: <Button variant="outline">Hover me</Button>,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  args: {
    side: 'top',
  },
}

export const Bottom: Story = {
  args: {
    side: 'bottom',
  },
}

export const Left: Story = {
  args: {
    side: 'left',
  },
}

export const Right: Story = {
  args: {
    side: 'right',
  },
}

export const OnIconButton: Story = {
  args: {
    content: 'More information',
    children: (
      <IconButton variant="ghost" icon={<Info />} aria-label="Information" />
    ),
  },
}

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-12">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="soft">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="soft">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="soft">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="soft">Right</Button>
      </Tooltip>
    </div>
  ),
}
